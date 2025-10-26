import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const addTask = async (req, res) => {
  try {
    const { id, goal, linked, linkedProgress, points, type } = req.body;
    if (!id || !goal || !points)
      res.status(400).json({
        message: "An error happend, Please fill all the informations",
      });

    const model = prisma[type]; // e.g., prisma.daily or prisma.weekly

    if (!model) {
      return res.status(400).json({ message: "Invalid model type." });
    }
    const data = {
      goal,
      points: Number(points) || 0,
      user: { connect: { id } },
    };

    if (type === "daily") {
      data.weeklyProgress = Number(linkedProgress) || 0;
      if (linked?.weekly)
        data.weekly = { connect: { id: Number(linked.weekly) } };
      if (linked?.monthly)
        data.monthly = { connect: { id: Number(linked.monthly) } };
      if (linked?.yearly)
        data.yearly = { connect: { id: Number(linked.yearly) } };
    }
    if (type === "weekly") {
      data.monthlyProgress = Number(linkedProgress) || 0;

      if (linked?.monthly)
        data.monthly = { connect: { id: Number(linked.monthly) } };
      if (linked?.yearly)
        data.yearly = { connect: { id: Number(linked.yearly) } };
    }

    if (type === "monthly") {
      data.yearlyProgress = Number(linkedProgress) || 0;

      if (linked?.yearly)
        data.yearly = { connect: { id: Number(linked.yearly) } };
    }
    const newTask = await model.create({ data });

    res.status(201).json({
      message: `${type} goal created successfully`,
      task: newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const removeTask = async (req, res) => {};

export const editTask = async (req, res) => {};
