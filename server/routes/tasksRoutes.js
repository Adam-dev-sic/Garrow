// src/routes/authRoutes.js

import express from "express";
import passport from "passport";
import { registerUser, loginUser } from "../controllers/authController.js";
import { PrismaClient } from "../generated/prisma/index.js";
import {
  addTask,
  deleteTasks,
  removeDoneTasks,
} from "../controllers/tasksController.js";
import { checkGoal } from "../controllers/tasksController.js";
import { editTasks } from "../controllers/tasksController.js";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/add", addTask);
router.post("/goals/:type/check", checkGoal);
router.post("/done/:type", removeDoneTasks);
router.put("/edit/:type", editTasks);
router.delete("/delete/:type", deleteTasks);

router.get("/hello", (req, res) => {
  res.status(500).json("hello");
});

export default router;
