// /store/useTodaysPoints.js
import { create } from "zustand";
import { apiFetch } from "../utils/api";

export const useTodaysPoints = create((set, get) => ({
  setTodays: async (points) => {
    try {
      const response = await apiFetch("/api/auth/today", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ points }),
        
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Failed to update today's points");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  },
  resetTodaysPoints: () => get().setTodays("reset"),
}));

export const initMidnightReset = () => {
  const { resetTodaysPoints } = useTodaysPoints.getState();

  const now = new Date();
  const nextMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0,
    0
  );

  const msUntilMidnight = nextMidnight.getTime() - now.getTime();

  setTimeout(() => {
    resetTodaysPoints();
    setInterval(resetTodaysPoints, 24 * 60 * 60 * 1000);
  }, msUntilMidnight);
};

// existance of this file was mainly because I initially did this using
// zustand thinking i wont have to add it to the database but zustand
// local storge is not account based so i ended up going with adding it to the database
