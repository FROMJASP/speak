"use client"

import type React from "react"
import { useState, useRef, } from "react"
import { PlanBadge } from "./upgrade-plan-menu/components/PlanBadge"
import { AudioUsageBar } from "./upgrade-plan-menu/components/AudioUsageBar"
import {  UpgradePlanMenu } from "./upgrade-plan-menu/upgrade-plan-menu"

import { getUsageColorClass,  getUsageTextColorClass } from "@/utils/usage-utils"
import { pricingPlans, formatAudioTime, type PlanTier } from "@/data/pricing-plans"

import { CalendarDays, ChevronDown } from "lucide-react"
import { usePlan } from "@/components/admin/plan-context"

// Helper function to format time without seconds
const formatTimeWithoutSeconds = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m`

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (remainingMinutes === 0) return `${hours}h`

  return `${hours}h ${remainingMinutes}m`
}

export function AudioUsageNavbar() {
  const { currentPlan, usedSeconds } = usePlan()
  const [isUpgradeMenuOpen, setUpgradeMenuOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)

  const plan = pricingPlans.find((p) => p.tier === currentPlan) || pricingPlans[0]
  const totalSeconds = plan.audioMinutes * 60
  const remainingSeconds = totalSeconds - usedSeconds
  const usagePercentage = (usedSeconds / totalSeconds) * 100

  // Format time left and available
  const formatTime = (seconds: number) => `${Math.max(Math.floor(seconds / 60), 0)}m`
  const timeLeft = formatTime(remainingSeconds)
  const timeAvailable = formatAudioTime(plan.audioMinutes)

  return (
    <div
      ref={triggerRef}
      className="flex items-center gap-2 cursor-pointer group px-2 py-1.5 rounded-md hover:bg-secondary/30 transition-colors min-w-[320px]"
      onClick={() => setUpgradeMenuOpen(true)}
      tabIndex={0}
      role="button"
      aria-label="Open upgrade plan menu"
    >
      <PlanBadge tier={currentPlan} statusColor={getUsageColorClass(usagePercentage, remainingSeconds)} />
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center justify-between text-xs mb-0.5 w-full">
          <span className="text-muted-foreground">Audio usage</span>
          <span className="flex items-center gap-1">
            <span className={`font-medium ${getUsageTextColorClass(usagePercentage, remainingSeconds)}`}>{timeLeft} left</span>
            <span className="text-muted-foreground">/ {timeAvailable}</span>
          </span>
        </div>
        <div className="h-2 w-full min-w-[96px] flex items-center">
          <AudioUsageBar usagePercentage={usagePercentage} statusColor={getUsageColorClass(usagePercentage, remainingSeconds)} />
        </div>
      </div>
      <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity" />
      {isUpgradeMenuOpen && (
        <UpgradePlanMenu onClose={() => setUpgradeMenuOpen(false)} triggerRef={triggerRef} />
      )}
    </div>
  )
}
