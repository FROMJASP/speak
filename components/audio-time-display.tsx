"use client"
import { Clock } from "lucide-react"
import { pricingPlans, type PlanTier } from "@/data/pricing-plans"
import { formatTimeFromSeconds } from "@/utils/time-format"

interface AudioTimeDisplayProps {
  usedSeconds: number
  tier?: PlanTier
  variant?: "default" | "compact"
}

export default function AudioTimeDisplay({ usedSeconds, tier = "Free", variant = "default" }: AudioTimeDisplayProps) {
  // Get current plan details
  const currentPlan = pricingPlans.find((plan) => plan.tier === tier) || pricingPlans[0]
  const totalMinutes = currentPlan.audioMinutes
  const totalSeconds = totalMinutes * 60
  const remainingSeconds = totalSeconds - usedSeconds

  // Format the remaining time
  const formattedTime = formatTimeFromSeconds(remainingSeconds)

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary/50 border border-border">
      <Clock className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm font-medium">{formattedTime}</span>
    </div>
  )
}
