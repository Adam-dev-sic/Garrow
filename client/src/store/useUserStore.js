import { create } from "zustand";
import { apiFetch } from "../utils/api";

export const useUserStore = create((set, get) => ({
  userData: null,
  retrigger: 0,
  isLoading: true,

  fetchUserData: async () => {
    try {
      const data = await apiFetch("/api/auth/me", {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch user");
      const sortedUser = {
        ...data.user,
        dailies: [...(data.user.dailies || [])].sort(
          (a, b) => a.id - b.id // or (a.createdAt > b.createdAt ? 1 : -1)
        ),
        weeklies: [...(data.user.weeklies || [])].sort((a, b) => a.id - b.id),
        monthlies: [...(data.user.monthlies || [])].sort((a, b) => a.id - b.id),
        yearlies: [...(data.user.yearlies || [])].sort((a, b) => a.id - b.id),
      };

      set({ userData: sortedUser, isLoading: false });
    } catch (error) {
      console.error("Error fetching user:", error);
      set({ userData: null });
    }
  },

  triggerRefetch: () => set({ retrigger: get().retrigger + 1 }),
}));
