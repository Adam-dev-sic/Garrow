import { PrismaClient } from "../generated/prisma/index.js";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

const OPENROUTER_API_KEY = process.env.OPENAI_API_KEY;

/**
 * Generic function to send a prompt to OpenRouter
 */
async function generateText(prompt) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        // "HTTP-Referer": "http://localhost:5000", // 👈 your app’s backend URL or site URL
        // "X-Title": "Garrow Achievement System",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout:free", // ✅ free model
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || "";
}

export const generateAchievement = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "User ID is required." });

    // ✅ Fetch user’s data
    const doneTasks = await prisma.doneTask.findMany({ where: { userId: id } });
    const currentAchievements = await prisma.achievements.findMany({
      where: { userId: id },
    });

    const taskSummary = doneTasks
      .map(
        (task, i) =>
          `${i + 1}. Goal: ${task.goal}, Type: ${task.type}, Points: ${
            task.points
          }, times completed: ${task.timescompleted}`
      )
      .join("\n");

    // ✅ Step 1: Ask AI how many new achievements to make
    const amountPrompt = `
You are a precise achievement counter.
Given the user's existing achievements and done tasks,
decide how many new achievements they should receive (1–4 maximum).
Only respond with a single number (no words, no explanation).

User's current achievements:
${JSON.stringify(currentAchievements, null, 2)}
`;

    const aiAmountText = await generateText(amountPrompt);
    const amount = parseInt(aiAmountText.match(/\d+/)?.[0] || "1", 10);

    // ✅ Step 2: Generate new achievements
    const genPrompt = `
You are a fun and creative achievement generator.
Based on the following completed tasks and existing achievements, generate ${amount} NEW unique achievements.
Each should be specific, not generic. Avoid repeating existing themes.

Current achievements:
${JSON.stringify(currentAchievements, null, 2)}

Tasks:
${taskSummary}
Key remark about the points is that they only exist to show how difficult/important the task is, if the user setted a high amount of points in a task it means they place great value or it was of great difficulty so thats all you gotta take the points in for

Output strictly as a JSON array like:
[
  { "title": "Marathon Mindset", "description": "...", "difficulty": "easy" }
]
  keep in mind that the difficulty should have 6 options only: easy medium hard extreme challenging champion and be very brutal do not give away hard difficulties casually be very very brutal only do it when you see a big amount of tasks and very hard tasks completed that's worthy of it 
`;

    const aiText = await generateText(genPrompt);

    let achievements;
    try {
      // Extract and parse JSON array safely
      const jsonMatch = aiText.match(/\[([\s\S]*)\]/);
      achievements = JSON.parse(jsonMatch ? jsonMatch[0] : aiText);
    } catch {
      return res.status(500).json({
        error: "AI response was not valid JSON.",
        raw: aiText,
      });
    }

    // ✅ Insert them into the DB
    await prisma.achievements.createMany({
      data: achievements.map((a) => ({
        userId: id,
        title: a.title,
        description: a.description,
        difficulty: a.difficulty || "easy",
      })),
    });
    // ✅ Fetch the user's current reqAchivPoints first
    const user = await prisma.user.findUnique({
      where: { id },
      select: { reqAchivPoints: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const newReqAchivPoints = user.reqAchivPoints * 1.5;

    // ✅ Now update with the new value
    await prisma.user.update({
      where: { id },
      data: { reqAchivPoints: newReqAchivPoints },
    });

    res.json({
      success: true,
      created: achievements.length,
      achievements,
    });
  } catch (error) {
    console.error("Error generating achievement:", error);
    res.status(500).json({ error: error.message });
  }
};
