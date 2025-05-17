"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { PlanItem } from "./components/PlanItem"
import { AudioUsageBar } from "./components/AudioUsageBar"
import { RemainingTimeDisplay } from "./components/RemainingTimeDisplay"
import { StatusMessage } from "./components/StatusMessage"
import { BetaDealTooltip } from "./components/BetaDealTooltip"
import { getUsageColorClass, getUsageTextColorClass } from "@/utils/usage-utils"
import type { PlanTier } from "@/data/pricing-plans"
import { usePlan } from "@/components/navbar/user-menu-via-avatar/admin/plan-context"
import { pricingPlans } from "@/data/pricing-plans"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

interface PlanUpgradeDropdownProps {
  isOpen: boolean
  plans: Array<{
    tier: PlanTier
    audioMinutes: number
    maxVoices: number
  }>
  currentPlan: PlanTier
  usedSeconds: number
  totalSeconds: number
  usagePercentage: number
  remainingSeconds: number
  hoveredPlan: PlanTier | null
  previewTotalSeconds: number
  previewRemainingSeconds: number
  previewUsagePercentage: number
  wouldExceedMonthlyLimit: boolean
  isDowngrade: boolean
  isUpgrade: boolean
  statusMessage: { message: string; isWarning: boolean; hasLink?: boolean } | null
  previewMessage: {
    message: string
    isWarning: boolean
    isDowngrade: boolean
    isExceeded: boolean
  } | null
  tooltipVisible: boolean
  tooltipPosition: { x: number; y: number }
  nextBillingDate: string
  onPlanHover: (plan: PlanTier | null) => void
  onPlanSelect: (plan: PlanTier) => void
  onPricingInfoClick: (e: React.MouseEvent) => void
  onBetaDealMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void
  onBetaDealMouseLeave: () => void
  onUpgradeClick: () => void
}

export function PlanUpgradeDropdown({
  isOpen,
  plans,
  currentPlan,
  usedSeconds,
  totalSeconds,
  usagePercentage,
  remainingSeconds,
  hoveredPlan,
  previewTotalSeconds,
  previewRemainingSeconds,
  previewUsagePercentage,
  wouldExceedMonthlyLimit,
  isDowngrade,
  isUpgrade,
  statusMessage,
  previewMessage,
  tooltipVisible,
  tooltipPosition,
  nextBillingDate,
  onPlanHover,
  onPlanSelect,
  onPricingInfoClick,
  onBetaDealMouseEnter,
  onBetaDealMouseLeave,
  onUpgradeClick,
}: PlanUpgradeDropdownProps) {
  // Helper functions
  const getPlanIndex = (tier: PlanTier): number => {
    return plans.findIndex((plan) => plan.tier === tier)
  }

  const shouldShowPopularBadge = (planTier: PlanTier) => {
    if (planTier === "Creator") {
      const currentPlanIndex = getPlanIndex(currentPlan)
      const creatorIndex = getPlanIndex("Creator")
      return currentPlanIndex < creatorIndex
    }
    return false
  }

  const shouldShowBetaDealBadge = (planTier: PlanTier) => {
    return planTier === "Professional" && currentPlan !== "Professional" && currentPlan !== "Company"
  }

  // Get button text based on hovered plan
  const getButtonText = () => {
    if (!hoveredPlan) {
      return currentPlan === "Free" ? "Upgrade plan" : "Change plan"
    }

    const currentPlanIndex = getPlanIndex(currentPlan)
    const hoveredPlanIndex = getPlanIndex(hoveredPlan)

    if (hoveredPlanIndex === currentPlanIndex) {
      return "Current plan"
    } else if (currentPlan === "Free") {
      return "Upgrade plan"
    } else {
      return "Change plan"
    }
  }

  if (!isOpen) return null

  return (
    <div className="pt-4 px-4 pb-2 z-[9999] relative">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-base font-medium">Upgrade your plan</h4>

        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full bg-muted border border-default hover:bg-[#D7D6CF] dark:hover:bg-muted" onClick={onPricingInfoClick}>
          <Info className="h-4 w-4" />
          <span className="sr-only">Pricing information</span>
        </Button>
      </div>

      {/* Audio usage section */}
      <div className="mb-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={hoveredPlan || "current"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {hoveredPlan ? (
              <>
                <RemainingTimeDisplay
                  remainingSeconds={wouldExceedMonthlyLimit ? 0 : previewRemainingSeconds}
                  totalMinutes={previewTotalSeconds / 60}
                  statusTextColor={
                    wouldExceedMonthlyLimit ? "text-amber-500" : isDowngrade ? "text-amber-500" : "text-green-500"
                  }
                />
                <AudioUsageBar
                  usagePercentage={previewUsagePercentage}
                  statusColor={wouldExceedMonthlyLimit ? "bg-amber-500" : isDowngrade ? "bg-amber-500" : "bg-green-500"}
                />
              </>
            ) : (
              <>
                <RemainingTimeDisplay
                  remainingSeconds={remainingSeconds}
                  totalMinutes={totalSeconds / 60}
                  statusTextColor={getUsageTextColorClass(usagePercentage, remainingSeconds)}
                />
                <AudioUsageBar
                  usagePercentage={usagePercentage}
                  statusColor={getUsageColorClass(usagePercentage, remainingSeconds)}
                />
              </>
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
            className="min-h-[20px] mt-1"
          >
            {hoveredPlan && previewMessage ? (
              <StatusMessage
                message={previewMessage.message}
                type={previewMessage.isExceeded ? "alert" : previewMessage.isDowngrade ? "calendar" : "success"}
              />
            ) : (
              statusMessage && (
                <StatusMessage
                  message={statusMessage.message}
                  type={
                    statusMessage.isWarning
                      ? usagePercentage >= 80 || remainingSeconds < 180
                        ? "alert"
                        : "warning"
                      : "info"
                  }
                  hasLink={statusMessage.hasLink}
                  linkText="contact us"
                  onLinkClick={() => {
                    window.location.href = "mailto:talktome@daisys.ai"
                  }}
                />
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
            className="w-full mb-3 bg-background text-foreground hover:bg-[#D7D6CF] dark:hover:bg-muted hover:text-foreground"
            onClick={onUpgradeClick}
          >
            {getButtonText()}
          </Button>
        </motion.div>
      </AnimatePresence>

      <p className="text-xs text-muted-foreground mb-3">Available plans:</p>

      {plans.map((plan) => {
        const isCurrentPlan = plan.tier === currentPlan

        return (
          <PlanItem
            key={plan.tier}
            plan={plan}
            isCurrentPlan={isCurrentPlan}
            isPopular={shouldShowPopularBadge(plan.tier)}
            hasBetaDeal={shouldShowBetaDealBadge(plan.tier)}
            onClick={() => onPlanSelect(plan.tier)}
            onMouseEnter={() => !isCurrentPlan && onPlanHover(plan.tier)}
            onMouseLeave={() => onPlanHover(null)}
            onBetaDealMouseEnter={onBetaDealMouseEnter}
            onBetaDealMouseLeave={onBetaDealMouseLeave}
          />
        )
      })}

      {/* Tooltip for beta deal */}
      <BetaDealTooltip isVisible={tooltipVisible} position={tooltipPosition} />
    </div>
  )
}

export function UpgradePlanMenu({ onClose, triggerRef }: { onClose: () => void, triggerRef: React.RefObject<HTMLElement | null> }) {
  const { currentPlan, usedSeconds } = usePlan()
  const plan = pricingPlans.find((p) => p.tier === currentPlan) || pricingPlans[0]
  const totalSeconds = plan.audioMinutes * 60
  const remainingSeconds = totalSeconds - usedSeconds
  const usagePercentage = (usedSeconds / totalSeconds) * 100

  const menuRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const [mounted, setMounted] = useState(false)

  // Calculate position below trigger
  useEffect(() => {
    setMounted(true)
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPosition({
        top: rect.bottom + window.scrollY + 6, // 6px gap
        left: rect.left + window.scrollX,
      })
    }
    return () => setMounted(false)
  }, [triggerRef])

  // Click outside to close
  useEffect(() => {
    if (!mounted) return
    const handleClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClick, true)
    return () => document.removeEventListener("mousedown", handleClick, true)
  }, [mounted, onClose, triggerRef])

  // Escape key to close
  useEffect(() => {
    if (!mounted) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [mounted, onClose])

  if (!mounted) return null

  return createPortal(
    <div
      ref={menuRef}
      className="fixed z-[9999] w-[370px] max-w-[95vw] overflow-hidden rounded-xl border border-border bg-background text-foreground shadow-xl animate-in fade-in-0 zoom-in-95"
      style={{ top: position.top, left: position.left }}
      role="dialog"
      aria-modal="true"
    >
      <PlanUpgradeDropdown
        isOpen={true}
        plans={pricingPlans}
        currentPlan={currentPlan}
        usedSeconds={usedSeconds}
        totalSeconds={totalSeconds}
        usagePercentage={usagePercentage}
        remainingSeconds={remainingSeconds}
        hoveredPlan={null}
        previewTotalSeconds={totalSeconds}
        previewRemainingSeconds={remainingSeconds}
        previewUsagePercentage={usagePercentage}
        wouldExceedMonthlyLimit={false}
        isDowngrade={false}
        isUpgrade={false}
        statusMessage={null}
        previewMessage={null}
        tooltipVisible={false}
        tooltipPosition={{ x: 0, y: 0 }}
        nextBillingDate={""}
        onPlanHover={() => {}}
        onPlanSelect={() => {}}
        onPricingInfoClick={() => {}}
        onBetaDealMouseEnter={() => {}}
        onBetaDealMouseLeave={() => {}}
        onUpgradeClick={() => {}}
      />
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-primary bg-muted border border-default hover:bg-[#D7D6CF] dark:hover:bg-muted"
        aria-label="Close upgrade plan menu"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="4" x2="16" y2="16"/><line x1="16" y1="4" x2="4" y2="16"/></svg>
      </button>
    </div>,
    document.body
  )
}
