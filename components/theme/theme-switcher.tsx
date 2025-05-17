"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTheme } from "./theme-provider"
import { useLanguage } from "../language/language-provider"
import { cn } from "@/lib/utils"

interface ThemeSwitcherProps {
  size?: "sm" | "md"
}

export default function ThemeSwitcher({ size = "md" }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme()
  const { t } = useLanguage()

  const iconSize = size === "sm" ? "h-3 w-3" : "h-4 w-4"
  const buttonSize = size === "sm" ? "w-6 h-6" : "w-8 h-8"
  const containerPadding = size === "sm" ? "p-0.5" : "p-1"

  const getButtonClass = (active: boolean, themeType: string) => {
    if (active) {
      if (themeType === "system") return "bg-muted border border-primary text-primary shadow-sm"
      if (themeType === "light") return "bg-muted border border-primary text-primary"
      if (themeType === "dark") return "bg-primary border border-primary text-background"
    }
    return "text-muted-foreground hover:text-primary"
  }

  return (
    <TooltipProvider>
      <div className={`bg-muted dark:bg-[#232323] rounded-full ${containerPadding} flex items-center`}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setTheme("system")}
              className={cn(
                `${buttonSize} rounded-full flex items-center justify-center transition-colors`,
                getButtonClass(theme === "system", "system"),
              )}
              aria-label="System theme"
            >
              <Monitor className={iconSize} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{t("system")}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setTheme("light")}
              className={cn(
                `${buttonSize} rounded-full flex items-center justify-center transition-colors`,
                getButtonClass(theme === "light", "light"),
              )}
              aria-label="Light theme"
            >
              <Sun className={iconSize} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{t("light")}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setTheme("dark")}
              className={cn(
                `${buttonSize} rounded-full flex items-center justify-center transition-colors`,
                getButtonClass(theme === "dark", "dark"),
              )}
              aria-label="Dark theme"
            >
              <Moon className={iconSize} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{t("dark")}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
