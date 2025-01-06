"use client"

import * as React from "react"
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.toggle("dark", isDark)
  }, [isDark])

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative h-8 w-14 rounded-full bg-gray-200 p-1 ring-1 ring-gray-300 transition-colors dark:bg-gray-800 dark:ring-gray-700"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <div
        className={`${
          isDark ? "translate-x-6 bg-gray-800" : "translate-x-0 bg-white"
        } flex h-6 w-6 items-center justify-center rounded-full shadow-sm transition-transform duration-200`}
      >
        <Sun
          className={`${
            isDark ? "scale-100" : "scale-0"
          } absolute h-4 w-4 rotate-0 text-yellow-500 transition-all duration-200`}
        />
        <Moon
          className={`${
            isDark ? "scale-0" : "scale-100"
          } absolute h-4 w-4 rotate-90 text-blue-500 transition-all duration-200`}
        />
      </div>
    </button>
  )
}

