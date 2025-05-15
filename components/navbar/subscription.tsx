"use client"

import { useState } from "react"
import { ArrowUpDown, Clock, AlertTriangle, ArrowUpRight, CalendarDays } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import UpgradeModal from "@/components/pricing/upgrade-modal"
import { pricingPlans, formatAudioTime, formatTimeFromSeconds, type PlanTier } from "@/data/pricing-plans"
import { getUsageColorClass, getUsageStatusMessage, getUsageTextColorClass } from "@/utils/usage-utils"

interface SubscriptionProps {
  tier: PlanTier
  usedSeconds?: number
  onUpgrade: (tier: PlanTier) => void
  nextRefreshDate?: string // Date when the user will receive more audio time
}

export default function Subscription({
  tier = "Free",
  usedSeconds = 503,
  onUpgrade,
  nextRefreshDate = getNextRefreshDate(), // Default to next month
}: SubscriptionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<PlanTier | undefined>(undefined)

  // Get current plan details
  const currentPlan = pricingPlans.find((plan) => plan.tier === tier) || pricingPlans[0]
  const totalMinutes = currentPlan.audioMinutes
  const totalSeconds = totalMinutes * 60
  const remainingSeconds = totalSeconds - usedSeconds
  const usagePercentage = (usedSeconds / totalSeconds) * 100

  // Filter out tiers that are lower or equal to current tier
  const upgradeTiers = pricingPlans.filter((plan) => plan.tier !== tier)

  const handleUpgradeClick = (selectedTier: PlanTier) => {
    setSelectedPlan(selectedTier)
    setIsModalOpen(true)
  }

  const openUpgradeModal = () => {
    setSelectedPlan(undefined)
    setIsModalOpen(true)
  }

  // Get status message
  const statusMessage = getUsageStatusMessage(usagePercentage, remainingSeconds, tier)

  // Calculate days until next refresh
  const daysUntilRefresh = calculateDaysUntilDate(nextRefreshDate)
  const formattedNextRefreshDate = formatDateForDisplay(nextRefreshDate)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 gap-1 px-2 text-sm font-normal hover:bg-transparent">
            <span>{tier}</span>
            <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-72">
          <div className="p-3">
            <h3 className="font-medium text-sm mb-1">Upgrade your plan</h3>

            {/* Audio time usage section */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Audio time usage</span>
                <span>
                  <span className={`${getUsageTextColorClass(usagePercentage, remainingSeconds)} font-medium`}>
                    {formatTimeFromSeconds(remainingSeconds)}
                  </span>
                  <span className="text-muted-foreground"> / {formatAudioTime(totalMinutes)}</span>
                </span>
              </div>
              <Progress
                value={usagePercentage}
                className="h-2"
                indicatorClassName={getUsageColorClass(usagePercentage, remainingSeconds)}
              />

              {/* Next refresh information */}
              <div className="flex items-start gap-1.5 mt-2 text-xs text-muted-foreground">
                <CalendarDays className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p>
                    You'll receive <span className="font-medium">{formatAudioTime(totalMinutes)}</span> on{" "}
                    <span className="font-medium">{formattedNextRefreshDate}</span>
                    {daysUntilRefresh > 0 && (
                      <span className="text-muted-foreground"> ({daysUntilRefresh} days from now)</span>
                    )}
                  </p>
                </div>
              </div>

              {statusMessage && (
                <div
                  className={`text-xs mt-2 flex items-center gap-1 ${
                    statusMessage.isWarning
                      ? usagePercentage >= 80 || remainingSeconds < 180
                        ? "text-red-500"
                        : "text-amber-500"
                      : "text-muted-foreground"
                  }`}
                >
                  {statusMessage.isWarning ? (
                    <AlertTriangle className="h-3 w-3" />
                  ) : (
                    <ArrowUpRight className="h-3 w-3" />
                  )}

                  {statusMessage.hasLink ? (
                    <p>
                      If you need more time, please{" "}
                      <a
                        href="mailto:talktome@daisys.ai"
                        className="text-blue-600 underline hover:text-blue-800"
                        onClick={(e) => {
                          e.preventDefault()
                          window.location.href = "mailto:talktome@daisys.ai"
                        }}
                      >
                        contact us
                      </a>
                    </p>
                  ) : (
                    <p>{statusMessage.message}</p>
                  )}
                </div>
              )}
            </div>

            <Button variant="dark" size="sm" className="w-full mb-3" onClick={openUpgradeModal}>
              Upgrade plan
            </Button>

            <p className="text-xs text-muted-foreground mb-3">Available plans:</p>

            {upgradeTiers.map((plan) => (
              <DropdownMenuItem
                key={plan.tier}
                className="flex items-center justify-between cursor-pointer py-2"
                onClick={() => handleUpgradeClick(plan.tier)}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{plan.tier}</span>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {formatAudioTime(plan.audioMinutes)} per month
                  </span>
                </div>
                <div className="flex items-center text-xs">
                  <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <span>{formatAudioTime(plan.audioMinutes)}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpgradeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentPlan={tier}
        selectedPlan={selectedPlan}
      />
    </>
  )
}

// Helper function to get the next refresh date (default to next month)
function getNextRefreshDate(): string {
  const today = new Date()
  const nextMonth = new Date(today)
  nextMonth.setMonth(today.getMonth() + 1)
  nextMonth.setDate(1) // First day of next month
  return nextMonth.toISOString().split("T")[0]
}

// Helper function to format a date for display
function formatDateForDisplay(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    })
  } catch (error) {
    console.error("Error formatting date:", error)
    return dateString
  }
}

// Helper function to calculate days until a date
function calculateDaysUntilDate(dateString: string): number {
  try {
    const targetDate = new Date(dateString)
    const today = new Date()

    // Reset time to midnight for accurate day calculation
    today.setHours(0, 0, 0, 0)
    targetDate.setHours(0, 0, 0, 0)

    const diffTime = targetDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return Math.max(0, diffDays)
  } catch (error) {
    console.error("Error calculating days:", error)
    return 0
  }
}
