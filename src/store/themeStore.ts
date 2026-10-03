import { create } from "zustand";

interface ThemeState {
  mode: "light" | "dark";
  toggleTheme: () => void;
}

const getInitialTheme = (): "light" | "dark" => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    return "dark";
  }
  return "light";
};

//یک Store بساز، اسمش را useThemeStore
//ساختارش طبق ThemeState
//ابزار set را هم به من بده
//تا بتوانم اطلاعات Store را تغییر بدهم
const useThemeStore = create<ThemeState>((set) => ({
  mode: getInitialTheme(),

  toggleTheme: () => {
    set((state) => {
      const newMode =
        state.mode === "light"
          ? "dark"
          : "light";

      //تم جدید را در حافظه مرورگر ذخیره کن
      localStorage.setItem(
        "theme",
        newMode
      );

      //<html>
      if (newMode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return {
        mode: newMode,
      };
    });
  },
}));

export default useThemeStore;