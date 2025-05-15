"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { PlanTier } from "@/data/pricing-plans"

interface PlanContextType {
  currentPlan: PlanTier
  usedSeconds: number
  setCurrentPlan: (plan: PlanTier) => void
  setUsedSeconds: (seconds: number) => void
  updatePlanAndUsage: (plan: PlanTier, usedSeconds: number) => void
}

const PlanContext = createContext<PlanContextType | undefined>(undefined)

export function PlanProvider({
  children,
  initialPlan = "Free",
  initialUsedSeconds = 503,
}: {
  children: ReactNode
  initialPlan?: PlanTier
  initialUsedSeconds?: number
}) {
  const [currentPlan, setCurrentPlan] = useState<PlanTier>(initialPlan)
  const [usedSeconds, setUsedSeconds] = useState(initialUsedSeconds)

  // Add a function to update both plan and usage at once
  const updatePlanAndUsage = (plan: PlanTier, seconds: number) => {
    setCurrentPlan(plan)
    setUsedSeconds(seconds)
  }

  return (
    <PlanContext.Provider
      value={{
        currentPlan,
        usedSeconds,
        setCurrentPlan,
        setUsedSeconds,
        updatePlanAndUsage,
      }}
    >
      {children}
    </PlanContext.Provider>
  )
}

export function usePlan() {
  const context = useContext(PlanContext)
  if (context === undefined) {
    throw new Error("usePlan must be used within a PlanProvider")
  }
  return context
}
