"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { PlanProvider } from "@/components/admin/plan-context"
import { UserProvider } from "@/contexts/user-context"
import { Toaster } from "@/components/ui/toaster"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <LanguageProvider>
        <PlanProvider>
          <UserProvider>
            {children}
            <Toaster />
          </UserProvider>
        </PlanProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
