import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("jigarafy-theme") || "professional-light",
  setTheme: (theme) => {
    localStorage.setItem("jigarafy-theme", theme);
    set({ theme });
  },
}));
