// src/app.js
import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import initializePassport from "./config/passport.js";
import taskRoutes from "./routes/tasksRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"], // your frontend URL (update when deploying)
    credentials: true, // allow cookies across domains
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // set to true if using https
      httpOnly: true,
      sameSite: "none",
    },
  })
);

// Initialize Passport
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
app.use("", taskRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("✅ Server running and ready for authentication!");
});

// Global error handler (optional but recommended)
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
