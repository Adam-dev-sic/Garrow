import { PrismaClient } from "../generated/prisma/index.js";

import { hashPassword } from "../utils/hash.js";
import Kickbox from "kickbox";

const prisma = new PrismaClient();

// Initialize Kickbox client
const kickbox = Kickbox.client(process.env.KICKBOX_API_KEY).kickbox();

export const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required." });

    // Kickbox email verification
    kickbox.verify(email, async (err, response) => {
      if (err) return res.status(500).json({ message: "Kickbox error." });

      const result = response?.body?.result; // <-- real result is here
      console.log("Kickbox verification result:", result);
      const validResults = ["deliverable", "risky", "unknown"];
      if (!validResults.includes(result)) {
        return res.status(400).json({
          message: "Please use a valid or deliverable email address.",
        });
      }
      // Check if user exists
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing)
        return res.status(400).json({ message: "Email already registered." });

      // Hash and save
      const hashed = await hashPassword(password);
      const user = await prisma.user.create({
        data: { email, password: hashed, name },
      });

      res.status(201).json({
        message: "User registered successfully.",
        user: { id: user.id, email: user.email, name: user.name },
      });
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
};

// Login handled by Passport middleware, this runs after successful auth
export const loginUser = (req, res) => {
  res.json({
    message: "Login successful.",
    user: { id: req.user.id, email: req.user.email, name: req.user.name },
  });
};
