"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Info, AlertTriangle, ArrowUpRight, CheckCircle2, Calendar, AlertCircle } from "lucide-react"
import UpgradeModal from "@/components/pricing/upgrade-modal"
import PricingInfoModal from "@/components/pricing/pricing-info-modal"
import { pricingPlans, formatAudioTime, type PlanTier, formatAudioTimeExtra } from "@/data/pricing-plans"
import { getUsageColorClass, getUsageStatusMessage, getUsageTextColorClass } from "@/utils/usage-utils"
import { motion, AnimatePresence } from "framer-motion"
import { CustomDropdown } from "@/components/ui/custom-dropdown"
import { createPortal } from "react-dom"

interface PlanUpgradeMenuProps {
  usedSeconds: number
  tier?: PlanTier
  variant?: "default" | "compact"
}

// Helper function to get plan index (for comparison)
const getPlanIndex = (tier: PlanTier): number => {
  return pricingPlans.findIndex((plan) => plan.tier === tier)
}

// Helper function to format time without seconds for longer durations
const formatTimeWithoutSeconds = (seconds: number, includeLeft = true): string => {
  const minutes = Math.floor(seconds / 60)

  if (minutes < 60) {
    return `${minutes}m${includeLeft ? " left" : ""}`
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (remainingMinutes === 0) {
    return `${hours}h${includeLeft ? " left" : ""}`
  }

  return `${hours}h ${remainingMinutes}m${includeLeft ? " left" : ""}`
}

// Tooltip component that renders outside the dropdown
const BetaDealTooltip = ({ isVisible, position }: { isVisible: boolean; position: { x: number; y: number } }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  return createPortal(
    <div
      className={`fixed z-[100] w-56 px-3 py-2 bg-black border border-border rounded-md text-xs transition-opacity duration-200 ${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: "translate(-50%, 8px)",
      }}
    >
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Regular price:</span>
          <span className="line-through text-muted-foreground">€75/month</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Beta price:</span>
          <span className="text-white font-medium">€50/month</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">You save:</span>
          <span className="text-amber-500 font-medium">€25/month (33%)</span>
        </div>
        <div className="text-[10px] text-muted-foreground mt-1 border-t border-border pt-1">
          Discount applies to both monthly and annual billing during beta.
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default function PlanUpgradeMenu({ usedSeconds, tier = "Free", variant = "default" }: PlanUpgradeMenuProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPricingInfoModalOpen, setIsPricingInfoModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<PlanTier | undefined>(undefined)
  const [hoveredPlan, setHoveredPlan] = useState<PlanTier | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })
  const [hasCalculatedPosition, setHasCalculatedPosition] = useState(false)

  // State for tooltip
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const betaDealBadgeRef = useRef<HTMLDivElement>(null)

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

  // Show all plans, including the current one
  const allPlans = pricingPlans

  // Check if the hovered plan is a downgrade or upgrade
  const isDowngrade = hoveredPlan ? getPlanIndex(hoveredPlan) < getPlanIndex(tier) : false
  const isUpgrade = hoveredPlan ? getPlanIndex(hoveredPlan) > getPlanIndex(tier) : false

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

  // Get the next billing date (for demonstration purposes)
  const getNextBillingDate = (): string => {
    const today = new Date()
    const nextMonth = new Date(today)
    nextMonth.setMonth(today.getMonth() + 1)
    return nextMonth.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  }
  const nextBillingDate = getNextBillingDate()

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

  // Handle opening the pricing info modal
  const handlePricingInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Close the dropdown first
    setIsDropdownOpen(false)
    // Then open the pricing info modal with a small delay
    setTimeout(() => {
      setIsPricingInfoModalOpen(true)
    }, 50)
  }

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
        message: `You'll keep your accumulated time, but from ${nextBillingDate} you'll receive ${formatAudioTimeExtra(
          hoveredPlanData.audioMinutes,
        )}/month instead of ${formatAudioTimeExtra(currentPlan.audioMinutes)}/month.`,
        isWarning: true,
        isDowngrade: true,
        isExceeded: false,
      }
    }

    // If it's an upgrade
    return {
      message: `Upgrade to the ${hoveredPlan} plan and receive ${formatAudioTimeExtra(
        hoveredPlanData.audioMinutes,
      )} audio immediately`,
      isWarning: false,
      isDowngrade: false,
      isExceeded: false,
    }
  }

  const previewMessage = hoveredPlan ? getPreviewMessage(hoveredPlan) : null

  // Function to determine if we should show the Popular badge
  const shouldShowPopularBadge = (planTier: PlanTier) => {
    // Only show Popular badge for Creator plan if current plan is lower than Creator
    if (planTier === "Creator") {
      const currentPlanIndex = getPlanIndex(tier)
      const creatorIndex = getPlanIndex("Creator")
      return currentPlanIndex < creatorIndex
    }
    return false
  }

  // Function to determine if we should show the Beta Deal badge
  const shouldShowBetaDealBadge = (planTier: PlanTier) => {
    return planTier === "Professional" && tier !== "Professional" && tier !== "Company"
  }

  // Get button text based on hovered plan
  const getButtonText = () => {
    if (!hoveredPlan) {
      // Default text based on current plan
      return tier === "Free" ? "Upgrade plan" : "Change plan"
    }

    const currentPlanIndex = getPlanIndex(tier)
    const hoveredPlanIndex = getPlanIndex(hoveredPlan)

    if (hoveredPlanIndex === currentPlanIndex) {
      return "Current plan"
    } else if (tier === "Free") {
      return "Upgrade plan" // Keep "Upgrade plan" text when on Free plan
    } else {
      return "Change plan"
    }
  }

  // Handle beta deal badge hover
  const handleBetaDealMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (betaDealBadgeRef.current) {
      const rect = betaDealBadgeRef.current.getBoundingClientRect()
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.bottom,
      })
      setTooltipVisible(true)
    }
  }

  const handleBetaDealMouseLeave = () => {
    setTooltipVisible(false)
  }

  return (
    <>
      <div ref={triggerRef}>
        <CustomDropdown
          open={isDropdownOpen}
          onOpenChange={setIsDropdownOpen}
          align="end"
          contentClassName="w-72 p-0 bg-[#1a1a1a] border border-border"
          fixedPosition={hasCalculatedPosition ? dropdownPosition : undefined}
          trigger={
            <div className="flex items-center border border-border rounded-md overflow-hidden hover:bg-secondary/30 transition-colors cursor-pointer group relative">
              <div className="pl-3 pr-3 py-1.5 flex items-center relative ml-0.5">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-secondary/40 rounded-l-md"></div>
                <div className="relative z-10 flex items-center gap-1.5">
                  <div
                    className={`w-2 h-2 rounded-full ${getUsageColorClass(
                      usagePercentage,
                      remainingSeconds,
                    )} animate-pulse`}
                  ></div>
                  <span className="text-xs font-medium">{tier}</span>
                </div>
              </div>
              <div className="px-3 py-1.5 flex-grow">
                <div className="flex flex-col min-w-[200px]">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs text-muted-foreground">Audio usage</span>
                    <span>
                      <span
                        className={`text-xs font-medium ${getUsageTextColorClass(usagePercentage, remainingSeconds)}`}
                      >
                        {formatTimeWithoutSeconds(remainingSeconds)}
                      </span>
                      <span className="text-xs text-muted-foreground"> / {formatAudioTime(totalMinutes)}</span>
                    </span>
                  </div>
                  <Progress
                    value={usagePercentage}
                    className="h-1.5 w-full"
                    indicatorClassName={getUsageColorClass(usagePercentage, remainingSeconds)}
                  />
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
          <div className="pt-4 px-4 pb-2">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-medium">Upgrade your plan</h4>

              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={handlePricingInfoClick}>
                <Info className="h-4 w-4" />
                <span className="sr-only">Pricing information</span>
              </Button>
            </div>

            {/* Audio usage section */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Audio usage</span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={hoveredPlan || "current"}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {hoveredPlan ? (
                      <>
                        {wouldExceedMonthlyLimit ? (
                          <span className="text-amber-500 font-medium">
                            {formatAudioTime(hoveredPlanData?.audioMinutes || 0)}/month
                          </span>
                        ) : (
                          <>
                            <span className={isDowngrade ? "text-amber-500 font-medium" : "text-green-500 font-medium"}>
                              {formatTimeWithoutSeconds(previewRemainingSeconds, !isUpgrade)}
                            </span>
                            <span className="text-muted-foreground">
                              {" "}
                              / {formatAudioTime(hoveredPlanData?.audioMinutes || 0)}
                            </span>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <span className={`${getUsageTextColorClass(usagePercentage, remainingSeconds)} font-medium`}>
                          {formatTimeWithoutSeconds(remainingSeconds)}
                        </span>
                        <span className="text-muted-foreground"> / {formatAudioTime(totalMinutes)}</span>
                      </>
                    )}
                  </motion.span>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={hoveredPlan || "current"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {hoveredPlan ? (
                    <Progress
                      value={previewUsagePercentage}
                      className="h-2"
                      indicatorClassName={
                        wouldExceedMonthlyLimit ? "bg-amber-500" : isDowngrade ? "bg-amber-500" : "bg-green-500"
                      }
                    />
                  ) : (
                    <Progress
                      value={usagePercentage}
                      className="h-2"
                      indicatorClassName={getUsageColorClass(usagePercentage, remainingSeconds)}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={hoveredPlan || "current"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="min-h-[20px] mt-1" // Fixed minimum height to prevent layout shift
                >
                  {hoveredPlan && previewMessage ? (
                    <div
                      className={`text-xs flex items-start gap-1.5 ${
                        previewMessage.isExceeded
                          ? "text-amber-500"
                          : previewMessage.isDowngrade
                            ? "text-amber-500"
                            : "text-green-500"
                      }`}
                    >
                      {previewMessage.isExceeded ? (
                        <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      ) : previewMessage.isDowngrade ? (
                        <Calendar className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      ) : (
                        <CheckCircle2 className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      )}
                      <p>{previewMessage.message}</p>
                    </div>
                  ) : (
                    statusMessage && (
                      <div
                        className={`text-xs flex items-start gap-1.5 ${
                          statusMessage.isWarning
                            ? usagePercentage >= 80 || remainingSeconds < 180
                              ? "text-red-500"
                              : "text-amber-500"
                            : "text-muted-foreground"
                        }`}
                      >
                        {statusMessage.isWarning ? (
                          <AlertTriangle className="h-3 w-3 mt-0.5" />
                        ) : (
                          <ArrowUpRight className="h-3 w-3 mt-0.5" />
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
                    )
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={hoveredPlan || "current"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="outline"
                  className="w-full mb-3 bg-[#f5f5f4] text-black hover:bg-[#e7e5e4] hover:text-black"
                  onClick={openUpgradeModal}
                >
                  {getButtonText()}
                </Button>
              </motion.div>
            </AnimatePresence>

            <p className="text-xs text-muted-foreground mb-3">Available plans:</p>

            {allPlans.map((plan) => {
              const isCurrentPlan = plan.tier === tier
              const isPlanDowngrade = getPlanIndex(plan.tier) < getPlanIndex(tier)

              return (
                <div
                  key={plan.tier}
                  className={`flex items-center justify-between py-2 px-2 rounded-sm mb-1 ${
                    isCurrentPlan ? "bg-[#27272a]" : "cursor-pointer hover:bg-[#27272a] hover:text-accent-foreground"
                  }`}
                  onClick={() => !isCurrentPlan && handleUpgradeClick(plan.tier)}
                  onMouseEnter={() => !isCurrentPlan && setHoveredPlan(plan.tier)}
                  onMouseLeave={() => setHoveredPlan(null)}
                >
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium">{plan.tier}</span>
                        {isCurrentPlan && (
                          <Badge
                            variant="outline"
                            className="ml-2 text-[10px] py-0 h-4 border-green-500 text-green-500"
                          >
                            Current
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 min-w-[80px] justify-end">
                        {shouldShowPopularBadge(plan.tier) && (
                          <Badge className="bg-purple-500 hover:bg-purple-600 text-[10px]">Popular</Badge>
                        )}
                        {shouldShowBetaDealBadge(plan.tier) && (
                          <div
                            ref={betaDealBadgeRef}
                            onMouseEnter={handleBetaDealMouseEnter}
                            onMouseLeave={handleBetaDealMouseLeave}
                          >
                            <Badge className="bg-amber-500 hover:bg-amber-600 text-[10px] cursor-help flex items-center gap-1">
                              Beta Deal <Info className="h-3 w-3" />
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex text-xs mt-0.5 text-muted-foreground">
                      <div className="flex w-full whitespace-nowrap">
                        <span>+ {formatAudioTime(plan.audioMinutes)} audio time</span>
                        <span className="mx-1">•</span>
                        <span>{plan.maxVoices} voices</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CustomDropdown>
      </div>

      {/* Tooltip rendered directly to body */}
      <BetaDealTooltip isVisible={tooltipVisible} position={tooltipPosition} />

      <UpgradeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentPlan={tier}
        selectedPlan={selectedPlan}
      />

      <PricingInfoModal isOpen={isPricingInfoModalOpen} onClose={() => setIsPricingInfoModalOpen(false)} />
    </>
  )
}
