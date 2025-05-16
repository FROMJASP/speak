"use client"

import { PlanUpgradeContainer } from "@/components/plan/PlanUpgradeContainer"
import type { PlanTier } from "@/data/pricing-plans"

interface SubscriptionProps {
  tier: PlanTier
  usedSeconds?: number
}

export default function Subscription({
  tier = "Free",
  usedSeconds = 0,
}: SubscriptionProps) {
  return (
    <PlanUpgradeContainer tier={tier} usedSeconds={usedSeconds} variant="compact" />
  )
}
