"use client";
import { CircleCheckBig } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isSystemDark, setIsSystemDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsSystemDark(systemDark);
  }, []);

  const renderThemeOption = (
    value: string,
    label: string,
    isSystem = false
  ) => {
    const isSelected = mounted ? theme === value : value === "system";
    return (
      <div className="relative ">
        <input
          type="radio"
          id={value}
          name="theme"
          value={value}
          checked={isSelected}
          onChange={() => mounted && setTheme(value)}
          className="sr-only peer"
          disabled={!mounted}
        />
        <label
          htmlFor={value}
          className={`flex flex-col gap-2 rounded-lg border-2 p-2 sm:p-4 cursor-pointer
            ${
              isSelected
                ? "border-blue-500 ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}>
          <div className="flex items-center justify-between">
            <span className="font-medium">{label}</span>
            {isSelected && (
              <CircleCheckBig className="h-5 w-5 text-blue-500 " />
            )}
          </div>
          {isSystem ? (
            <div>
              {isSystemDark ? (
                <div className="rounded-md border border-gray-700 bg-gray-900 p-2">
                  <div className="space-y-2">
                    <div className="h-2 w-[80%] rounded bg-gray-700" />
                    <div className="h-2 w-[70%] rounded bg-gray-700" />
                    <div className="h-2 w-[60%] rounded bg-gray-700" />
                    <div className="h-2 w-[50%] rounded bg-gray-700" />
                  </div>
                </div>
              ) : (
                <div className="rounded-md border border-input bg-card p-2">
                  <div className="space-y-2">
                    <div className="h-2 w-[80%] rounded bg-gray-200" />
                    <div className="h-2 w-[70%] rounded bg-gray-200" />
                    <div className="h-2 w-[60%] rounded bg-gray-200" />
                    <div className="h-2 w-[50%] rounded bg-gray-200" />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              className={`rounded-md border p-2 ${
                value === "dark"
                  ? "border-gray-700 bg-gray-900"
                  : "border-gray-200 bg-white"
              }`}>
              <div className="space-y-2">
                <div
                  className={`h-2 w-[80%] rounded ${
                    value === "dark" ? "bg-gray-700" : "bg-gray-200"
                  }`}
                />
                <div
                  className={`h-2 w-[70%] rounded ${
                    value === "dark" ? "bg-gray-700" : "bg-gray-200"
                  }`}
                />
                <div
                  className={`h-2 w-[60%] rounded ${
                    value === "dark" ? "bg-gray-700" : "bg-gray-200"
                  }`}
                />
                <div
                  className={`h-2 w-[50%] rounded ${
                    value === "dark" ? "bg-gray-700" : "bg-gray-200"
                  }`}
                />
              </div>
            </div>
          )}
        </label>
      </div>
    );
  };

  return (
    <div className="space-y-2 py-2 p-2 sm:p-4">
      <div className="grid sm:grid-cols-2 gap-2 lg:p-4">
        <div>
          <h2 className="text-lg font-semibold">Interface theme</h2>
          <p className="text-sm text-muted-foreground">
            Select or customize your UI theme.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-4 py-2">
          {renderThemeOption("light", "Light")}
          {renderThemeOption("system", "System", true)}
          {renderThemeOption("dark", "Dark")}
        </div>
      </div>
    </div>
  );
}
