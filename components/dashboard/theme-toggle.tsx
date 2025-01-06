"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle({ className }: { className: string }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        className,
        "relative flex items-center gap-2 h-6 w-14 rounded-full bg-gray-200 p-1 ring-1 ring-gray-300 transition-colors dark:bg-gray-600 dark:ring-gray-400"
      )}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      type="button">
      <div
        className={`${
          isDark ? " bg-white" : "translate-x-8 bg-gray-950"
        } flex h-4 w-4 items-center justify-center rounded-full shadow-sm transition-transform duration-200`}></div>
      <Sun
        className={`${
          isDark ? "scale-100 translate-x-8" : "scale-0"
        } absolute h-4 w-4 rotate-0 text-yellow-500 transition-all duration-200`}
      />
      <Moon
        className={`${
          isDark ? "scale-0" : "scale-100"
        } absolute h-4 w-4 rotate-90 text-blue-500 transition-all duration-200`}
      />
    </button>
  );
}
