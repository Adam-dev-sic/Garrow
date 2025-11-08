import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import initializePassport from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/tasksRoutes.js";
import achievementRoutes from "./routes/achievementsRoutes.js";

dotenv.config();
const app = express();

// Trust proxy (important for Render/HTTPS)
app.set("trust proxy", 1);

const inProd = process.env.NODE_ENV === "production";

// --- Middlewares ---
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS (only needed for local dev)
if (!inProd) {
  app.use(
    cors({
      origin: ["http://localhost:5173"],
      credentials: true,
    })
  );
}

// --- Sessions ---
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    proxy: inProd,
    cookie: {
      httpOnly: true,
      secure: inProd,
      sameSite: inProd ? "lax" : "lax", // now same-site since same domain
    },
  })
);

// --- Passport setup ---
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// --- API routes ---
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/achievements", achievementRoutes);

// --- Serve React frontend ---
if (inProd) {
  const __dirname = path.resolve();
  const frontendPath = path.join(__dirname, "../client", "dist"); // adjust if needed
  app.use(express.static(frontendPath));

  // All non-API routes -> React app
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Server running (development mode)");
  });
}

// --- Error handler ---
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
