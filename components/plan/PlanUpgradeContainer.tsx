"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { PlanBadge } from "./PlanBadge"
import { AudioUsageBar } from "./AudioUsageBar"
import { PlanUpgradeDropdown } from "./PlanUpgradeDropdown"
import { CustomDropdown } from "@/components/ui/custom-dropdown"
import { getUsageColorClass, getUsageStatusMessage, getUsageTextColorClass } from "@/utils/usage-utils"
import { pricingPlans, formatAudioTime, type PlanTier } from "@/data/pricing-plans"
import UpgradeModal from "@/components/pricing/upgrade-modal"
import PricingInfoModal from "@/components/pricing/pricing-info-modal"
import { BetaDealTooltip } from "@/components/tooltips/beta-deal-tooltip"
import { CalendarDays } from "lucide-react"

// Helper function to format time without seconds
const formatTimeWithoutSeconds = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m`

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (remainingMinutes === 0) return `${hours}h`

  return `${hours}h ${remainingMinutes}m`
}

interface PlanUpgradeContainerProps {
  usedSeconds: number
  tier?: PlanTier
  variant?: "default" | "compact"
}

export function PlanUpgradeContainer({ usedSeconds, tier = "Free", variant = "default" }: PlanUpgradeContainerProps) {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPricingInfoModalOpen, setIsPricingInfoModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<PlanTier | undefined>(undefined)
  const [hoveredPlan, setHoveredPlan] = useState<PlanTier | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })
  const [hasCalculatedPosition, setHasCalculatedPosition] = useState(false)
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  // Refs
  const triggerRef = useRef<HTMLDivElement>(null)
  const betaDealBadgeRef = useRef<HTMLDivElement>(null)

  // Helper function to get plan index (for comparison)
  const getPlanIndex = (planTier: PlanTier): number => {
    return pricingPlans.findIndex((plan) => plan.tier === planTier)
  }

  // Get current plan details
  const currentPlan = pricingPlans.find((plan) => plan.tier === tier) || pricingPlans[0]
  const totalMinutes = currentPlan.audioMinutes
  const totalSeconds = totalMinutes * 60
  const remainingSeconds = totalSeconds - usedSeconds
  const usagePercentage = (usedSeconds / totalSeconds) * 100

  // Calculate preview values when hovering over a plan
  const hoveredPlanData = hoveredPlan ? pricingPlans.find((plan) => plan.tier === hoveredPlan) : null
  const previewTotalSeconds = hoveredPlanData ? hoveredPlanData.audioMinutes * 60 : totalSeconds
  const previewRemainingSeconds = previewTotalSeconds - usedSeconds
  const wouldExceedMonthlyLimit = previewRemainingSeconds < 0
  const previewUsagePercentage = Math.min((usedSeconds / previewTotalSeconds) * 100, 100)

  // Check if the hovered plan is a downgrade or upgrade
  const isDowngrade = hoveredPlan ? getPlanIndex(hoveredPlan) < getPlanIndex(tier) : false
  const isUpgrade = hoveredPlan ? getPlanIndex(hoveredPlan) > getPlanIndex(tier) : false

  // Get the next billing date (for demonstration purposes)
  const getNextBillingDate = (): string => {
    const today = new Date()
    const nextMonth = new Date(today)
    nextMonth.setMonth(today.getMonth() + 1)
    return nextMonth.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  }

  // Calculate next refresh date based on signup date
  const calculateNextRefreshDate = (): string => {
    // In a real app, you would get this from user data
    // For demo purposes, we'll use a simulated signup date
    const simulatedSignupDate = new Date()
    simulatedSignupDate.setMonth(simulatedSignupDate.getMonth() - 1) // Signed up a month ago

    const today = new Date()
    const nextRefresh = new Date(simulatedSignupDate)

    // Set to this month's anniversary
    nextRefresh.setMonth(today.getMonth())

    // If today is past this month's anniversary, move to next month
    if (today > nextRefresh) {
      nextRefresh.setMonth(today.getMonth() + 1)
    }

    return nextRefresh.toISOString().split("T")[0] // YYYY-MM-DD format
  }

  // Format date for display
  const formatDateForDisplay = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    } catch (error) {
      console.error("Error formatting date:", error)
      return dateString
    }
  }

  // Calculate days until next refresh
  const calculateDaysUntilRefresh = (dateString: string): string => {
    try {
      const targetDate = new Date(dateString)
      const today = new Date()

      // Reset time to midnight for accurate day calculation
      today.setHours(0, 0, 0, 0)
      targetDate.setHours(0, 0, 0, 0)

      const diffTime = targetDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 0) return "today"
      if (diffDays === 1) return "tomorrow"
      return `in ${diffDays} days`
    } catch (error) {
      console.error("Error calculating days:", error)
      return ""
    }
  }

  const nextRefreshDate = calculateNextRefreshDate()
  const formattedRefreshDate = formatDateForDisplay(nextRefreshDate)
  const daysUntilRefresh = calculateDaysUntilRefresh(nextRefreshDate)

  const nextBillingDate = getNextBillingDate()

  // Get status message
  const statusMessage = getUsageStatusMessage(usagePercentage, remainingSeconds, tier)

  // Get preview message for hover state
  const getPreviewMessage = (hoveredPlan: PlanTier) => {
    const hoveredPlanData = pricingPlans.find((p) => p.tier === hoveredPlan)
    if (!hoveredPlanData) return null

    const currentPlanIndex = getPlanIndex(tier)
    const hoveredPlanIndex = getPlanIndex(hoveredPlan)

    // Calculate how many months it would take to accumulate enough time
    const calculateMonthsToAccumulate = (requiredSeconds: number, monthlySeconds: number): number => {
      return Math.ceil(requiredSeconds / monthlySeconds)
    }

    // If it's a downgrade and would exceed monthly limits
    if (hoveredPlanIndex < currentPlanIndex && wouldExceedMonthlyLimit) {
      const monthsToAccumulate = calculateMonthsToAccumulate(usedSeconds, previewTotalSeconds)
      return {
        message: `Your current usage exceeds the monthly limit. You would need to accumulate ${monthsToAccumulate} months of time on the ${hoveredPlan} plan.`,
        isWarning: true,
        isDowngrade: true,
        isExceeded: true,
      }
    }

    // If it's a downgrade but within limits
    if (hoveredPlanIndex < currentPlanIndex) {
      return {
        message: `You'll keep your accumulated time, but from ${nextBillingDate} you'll receive ${formatAudioTime(
          hoveredPlanData.audioMinutes,
        )}/month instead of ${formatAudioTime(currentPlan.audioMinutes)}/month.`,
        isWarning: true,
        isDowngrade: true,
        isExceeded: false,
      }
    }

    // If it's an upgrade
    return {
      message: `Upgrade to the ${hoveredPlan} plan and receive ${formatAudioTime(
        hoveredPlanData.audioMinutes,
      )} audio immediately`,
      isWarning: false,
      isDowngrade: false,
      isExceeded: false,
    }
  }

  const previewMessage = hoveredPlan ? getPreviewMessage(hoveredPlan) : null

  // Calculate dropdown position when it opens
  useEffect(() => {
    if (isDropdownOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.right - 288, // 288px = 72rem (dropdown width)
      })
      setHasCalculatedPosition(true)
    }
  }, [isDropdownOpen])

  // Event handlers
  const handleUpgradeClick = (selectedTier: PlanTier) => {
    if (selectedTier === tier) return // Don't open modal for current plan
    setSelectedPlan(selectedTier)
    setIsModalOpen(true)
    setIsDropdownOpen(false)
  }

  const openUpgradeModal = () => {
    setSelectedPlan(undefined)
    setIsModalOpen(true)
    setIsDropdownOpen(false)
  }

  const handlePricingInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Close the dropdown first
    setIsDropdownOpen(false)
    // Then open the pricing info modal with a small delay
    setTimeout(() => {
      setIsPricingInfoModalOpen(true)
    }, 50)
  }

  const handleBetaDealMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    if (target) {
      const rect = target.getBoundingClientRect()
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.bottom + window.scrollY,
      })
      setTooltipVisible(true)
    }
  }

  const handleBetaDealMouseLeave = () => {
    setTooltipVisible(false)
  }

  useEffect(() => {
    const handleResize = () => {
      if (tooltipVisible && betaDealBadgeRef.current) {
        const rect = betaDealBadgeRef.current.getBoundingClientRect()
        setTooltipPosition({
          x: rect.left + rect.width / 2,
          y: rect.bottom + window.scrollY,
        })
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [tooltipVisible])

  return (
    <>
      <div ref={triggerRef}>
        <CustomDropdown
          open={isDropdownOpen}
          onOpenChange={setIsDropdownOpen}
          align="end"
          contentClassName="w-72 p-0 bg-popover border border-border"
          fixedPosition={hasCalculatedPosition ? dropdownPosition : undefined}
          trigger={
            <div className="flex items-center rounded-md overflow-hidden hover:bg-secondary/30 transition-colors cursor-pointer group relative">
              <PlanBadge tier={tier} statusColor={getUsageColorClass(usagePercentage, remainingSeconds)} />
              <div className="px-3 py-1.5 flex-grow">
                <div className="flex flex-col min-w-[220px]">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-xs text-muted-foreground">Audio usage</span>
                    <div className="flex items-center gap-1 text-xs">
                      <span className={`font-medium ${getUsageTextColorClass(usagePercentage, remainingSeconds)}`}>
                        {formatTimeWithoutSeconds(remainingSeconds)} left
                      </span>
                      <span className="text-muted-foreground">/ {formatAudioTime(totalMinutes)}</span>
                    </div>
                  </div>
                  <AudioUsageBar
                    usagePercentage={usagePercentage}
                    statusColor={getUsageColorClass(usagePercentage, remainingSeconds)}
                  />
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1 w-full">
                      <CalendarDays className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">
                        +{formatAudioTime(totalMinutes)} on{" "}
                        <span className="font-medium text-foreground">{formattedRefreshDate}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <div className="pr-3 pl-1 flex items-center text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-60 group-hover:opacity-100 transition-opacity"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          }
        >
          <PlanUpgradeDropdown
            isOpen={isDropdownOpen}
            plans={pricingPlans}
            currentPlan={tier}
            usedSeconds={usedSeconds}
            totalSeconds={totalSeconds}
            usagePercentage={usagePercentage}
            remainingSeconds={remainingSeconds}
            hoveredPlan={hoveredPlan}
            previewTotalSeconds={previewTotalSeconds}
            previewRemainingSeconds={previewRemainingSeconds}
            previewUsagePercentage={previewUsagePercentage}
            wouldExceedMonthlyLimit={wouldExceedMonthlyLimit}
            isDowngrade={isDowngrade}
            isUpgrade={isUpgrade}
            statusMessage={statusMessage}
            previewMessage={previewMessage}
            tooltipVisible={tooltipVisible}
            tooltipPosition={tooltipPosition}
            nextBillingDate={nextBillingDate}
            onPlanHover={setHoveredPlan}
            onPlanSelect={handleUpgradeClick}
            onPricingInfoClick={handlePricingInfoClick}
            onBetaDealMouseEnter={handleBetaDealMouseEnter}
            onBetaDealMouseLeave={handleBetaDealMouseLeave}
            onUpgradeClick={openUpgradeModal}
          />
        </CustomDropdown>
      </div>

      <UpgradeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentPlan={tier}
        selectedPlan={selectedPlan}
      />

      <PricingInfoModal isOpen={isPricingInfoModalOpen} onClose={() => setIsPricingInfoModalOpen(false)} />
      <BetaDealTooltip isVisible={tooltipVisible} position={tooltipPosition} />
    </>
  )
}
