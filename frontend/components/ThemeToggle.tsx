"use client";

import useTheme from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-[9999] rounded-full bg-gray-900 px-5 py-3 text-white shadow-xl transition-all duration-300 hover:scale-105"
    >
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}