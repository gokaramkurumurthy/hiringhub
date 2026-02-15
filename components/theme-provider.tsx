"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export const useTheme = () => {
  const context = React.useContext(
    React.createContext<{
      theme: string | undefined
      setTheme: (theme: string) => void
    }>({
      theme: undefined,
      setTheme: () => {},
    }),
  )

  // Fallback implementation if next-themes is not available
  const [theme, setThemeState] = React.useState<string>("light")

  const setTheme = React.useCallback((newTheme: string) => {
    setThemeState(newTheme)
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  React.useEffect(() => {
    // Initialize theme based on system preference
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(isDark ? "dark" : "light")
    }
  }, [setTheme])

  return {
    theme: context.theme || theme,
    setTheme: context.setTheme || setTheme,
  }
}
