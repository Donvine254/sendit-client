"use client";

import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";
export function ThemeToggle({ className }: { className: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <button
        className={cn(
          className,
          "relative flex items-center gap-2 h-6 w-14 rounded-full bg-gray-200 p-1 ring-1 ring-gray-300 transition-colors duration-300 dark:bg-gray-600 dark:ring-gray-400"
        )}
        aria-label="Toggle Theme"
        title="Toggle theme"
        type="button"
        suppressHydrationWarning>
        <div
          className="translate-x-8 bg-gray-950
          flex h-4 w-4 items-center justify-center rounded-full shadow-sm transition-transform duration-200"></div>
        <Sun
          className="scale-100 translate-x-0
        absolute h-4 w-4 text-yellow-500 transition-all duration-200"
        />
      </button>
    );
  }
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        className,
        "relative flex items-center gap-2 h-6 w-14 rounded-full bg-gray-200 p-1 ring-1 ring-gray-300 transition-colors duration-300 dark:bg-gray-600 dark:ring-gray-400"
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
        } absolute h-4 w-4 text-yellow-500 transition-all duration-200`}
      />
      <Moon
        className={`${
          isDark ? "scale-0" : "scale-100"
        } absolute h-4 w-4 text-blue-500 transition-all duration-200`}
      />
    </button>
  );
}

export const MobileThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <div className="sm:hidden flex items-center  justify-center gap-8  border rounded-lg w-fit mx-auto p-1">
        <button
          className="p-1 rounded-full transition-colors duration-300   dark:bg-gray-600"
          type="button"
          title="light theme">
          {" "}
          <Sun className="h-4 w-4  transition-all " />
        </button>
        <button
          className="p-1 rounded-full transition-colors duration-300   dark:bg-gray-600"
          type="button"
          title="system default">
          <Monitor className="h-4 w-4" />
        </button>
        <button
          className="p-1 rounded-full transition-colors duration-300   dark:bg-gray-600"
          type="button"
          title="dark mode">
          <Moon className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="sm:hidden flex items-center  justify-center gap-8  border rounded-lg w-fit mx-auto p-1">
      <button
        className={` p-1 rounded-full transition-colors duration-300  ${
          theme === "light" ? "bg-gray-200 dark:bg-gray-600 " : ""
        }`}
        type="button"
        title="light theme"
        onClick={() => setTheme("light")}>
        {" "}
        <Sun className="h-4 w-4  transition-all " />
      </button>
      <button
        className={` p-1 rounded-full transition-colors duration-300  ${
          theme === "system" ? "bg-gray-200 dark:bg-gray-600 " : ""
        }`}
        type="button"
        title="system default"
        onClick={() => setTheme("system")}>
        {" "}
        <Monitor className="h-4 w-4" />
      </button>
      <button
        className={` p-1 rounded-full transition-colors duration-300  ${
          theme === "dark" ? "bg-gray-200 dark:bg-gray-600 " : ""
        }`}
        type="button"
        title="dark mode"
        onClick={() => setTheme("dark")}>
        <Moon className="h-4 w-4" />
      </button>
    </div>
  );
};
