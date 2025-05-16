"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children, defaultTheme = "dark" }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // On mount, read from localStorage if available
    const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    let htmlClass = document.documentElement.classList.contains("dark")
      ? "dark"
      : document.documentElement.classList.contains("light")
      ? "light"
      : defaultTheme;
    if (storedTheme === "dark" || storedTheme === "light" || storedTheme === "system") {
      htmlClass = storedTheme;
    }
    setTheme(htmlClass as Theme);
    setMounted(true);
  }, [defaultTheme]);

  useEffect(() => {
    if (!mounted) return;
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      localStorage.setItem('theme', 'system');
      return;
    }
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme);
      // localStorage is updated in the effect above
    },
  };

  if (!mounted) return null;

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
