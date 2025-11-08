// src/routes/authRoutes.js

import express from "express";
import passport from "passport";
import {
  registerUser,
  loginUser,
  todayPoints,
} from "../controllers/authController.js";
import { PrismaClient } from "../generated/prisma/index.js";

const router = express.Router();
const prisma = new PrismaClient();
/**
 * Register
 * - Validates + Kickbox check handled inside controller
 * - Creates user and returns minimal user data
 */
router.post("/register", registerUser);

router.post("/today", todayPoints);
/**
 * Login
 * - Uses Passport Local strategy to authenticate
 * - On success, passport attaches user to req.user and calls next -> loginUser
 * - On failure, returns 401 with message
 */

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: info?.message || "Login failed" });
    }

    // ✅ Explicitly log in the user to create a session
    req.logIn(user, (err) => {
      if (err) return next(err);

      res.json({
        message: "Login successful.",
        user: { id: user.id, email: user.email, name: user.name },
      });
    });
  })(req, res, next);
});

/**
 * Logout
 * - Ends session and clears req.user
 */
router.post("/logout", (req, res, next) => {
  // passport 0.6+ uses a callback for logout
  req.logout((err) => {
    if (err) return next(err);
    // destroy session server-side (optional but recommended)
    if (req.session) {
      req.session.destroy((destroyErr) => {
        if (destroyErr) return next(destroyErr);
        res.clearCookie?.("connect.sid"); // best-effort cookie clear
        return res.json({ message: "Logged out" });
      });
    } else {
      return res.json({ message: "Logged out" });
    }
  });
});

/**
 * Current user
 * - Simple route to fetch the currently authenticated user
 * - You can replace this with a middleware that enforces auth if needed
 */
router.get("/me", async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        dailies: true,
        weeklies: {
          include: {
            dailies: true,
          },
        },
        monthlies: {
          include: {
            dailies: true,
            weeklies: true,
          },
        },
        yearlies: {
          include: {
            dailies: true,
            weeklies: true,
            monthlies: true,
          },
        },
        tasksdone: { include: true },
        savedtaskslist: { include: { savedtasks: true } },
        userAchievements: { include: true },
      },
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (error) {
    console.error("Error fetching user with relations:", error); // 👈
    res.status(500).json({ message: "Server error fetching user data." });
  }
});

export default router;
