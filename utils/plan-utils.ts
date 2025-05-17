import { pricingPlans, type PlanTier } from "@/data/pricing-plans"

/**
 * Get plan details by tier
 */
export function getPlanDetails(tier: PlanTier) {
  return pricingPlans.find((p) => p.tier === tier) || pricingPlans[0]
}

/**
 * Calculate usage percentage
 */
export function calcUsagePercentage(usedSeconds: number, totalSeconds: number): number {
  if (!totalSeconds) return 0
  return Math.min(Math.round((usedSeconds / totalSeconds) * 100), 100)
}

/**
 * Calculate used seconds from percentage
 */
export function calcUsedSecondsFromPercentage(totalSeconds: number, percentage: number): number {
  return Math.round((totalSeconds * percentage) / 100)
}

/**
 * Detect if a plan is a downgrade
 */
export function isDowngrade(newPlan: PlanTier, currentPlan: PlanTier): boolean {
  return (
    pricingPlans.findIndex((p) => p.tier === newPlan) <
    pricingPlans.findIndex((p) => p.tier === currentPlan)
  )
}

/**
 * Get default usage percentage for a plan tier
 */
export function getDefaultUsagePercentage(plan: PlanTier): number {
  if (plan === "Free" || plan === "Starter") return 85
  if (plan === "Company") return 40
  return 70
}

/**
 * Get a date from 2 weeks ago (for demonstration/demo purposes)
 */
export function getSignupDate(): string {
  const today = new Date()
  const twoWeeksAgo = new Date(today)
  twoWeeksAgo.setDate(today.getDate() - 14)
  return twoWeeksAgo.toISOString().split("T")[0]
}

/**
 * Get the next billing date (for demonstration/demo purposes)
 */
export function getNextBillingDate(): string {
  const today = new Date()
  const nextMonth = new Date(today)
  nextMonth.setMonth(today.getMonth() + 1)
  return nextMonth.toISOString().split("T")[0]
} 