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

dotenv.config();
const app = express();

// Trust proxy (needed on platforms like Render, Vercel, etc)
app.set("trust proxy", 1);

// Use exact origin from env
const FRONTEND_URL = process.env.CLIENT_URL || "https://garrow-1.onrender.com";
const allowedOrigins = [
  "http://localhost:5173",
  "https://garrow-1.onrender.com",
];
// CORS - allow only frontend origin and allow credentials
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const inProd = process.env.NODE_ENV === "production";

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    proxy: inProd, // important when behind proxy
    cookie: {
      httpOnly: true,
      secure: inProd, // true in production (HTTPS), false for local dev
      sameSite: inProd ? "none" : "lax", // none for cross-site in prod
      // you can set domain if necessary: domain: ".onrender.com"
    },
  })
);

// passport init
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/api/auth", authRoutes);
app.use("", taskRoutes);

// root
app.get("/", (req, res) => res.send("Server running"));

// error handler
app.use((err, req, res, next) => {
  console.error("Error", err);
  res.status(500).json({ error: "internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
