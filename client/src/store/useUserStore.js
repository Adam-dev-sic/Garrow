import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  userData: null,
  retrigger: 0,
  isLoading: true,

  fetchUserData: async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      set({ userData: data.user, isLoading: false });
    } catch (error) {
      console.error("Error fetching user:", error);
      set({ userData: null });
    }
  },

  triggerRefetch: () => set({ retrigger: get().retrigger + 1 }),
}));
