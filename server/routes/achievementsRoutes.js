// src/routes/authRoutes.js

import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";
import { generateAchievement } from "../controllers/achievementsController.js";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/add", generateAchievement);

export default router;
