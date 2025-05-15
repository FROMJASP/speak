"use client"

import type React from "react"
import { Badge } from "@/components/ui/badge"
import { formatAudioTime } from "@/data/pricing-plans"
import { BetaDealBadge } from "./BetaDealBadge"
import type { PlanTier } from "@/data/pricing-plans"
import { useRef } from "react"

interface PlanItemProps {
  plan: {
    tier: PlanTier
    audioMinutes: number
    maxVoices: number
  }
  isCurrentPlan: boolean
  isPopular: boolean
  hasBetaDeal: boolean
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  onBetaDealMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void
  onBetaDealMouseLeave: () => void
}

export function PlanItem({
  plan,
  isCurrentPlan,
  isPopular,
  hasBetaDeal,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onBetaDealMouseEnter,
  onBetaDealMouseLeave,
}: PlanItemProps) {
  const betaDealBadgeRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className={`flex items-center justify-between py-2 px-2 rounded-sm mb-1 ${
        isCurrentPlan ? "bg-[#27272a]" : "cursor-pointer hover:bg-[#27272a] hover:text-accent-foreground"
      }`}
      onClick={isCurrentPlan ? undefined : onClick}
      onMouseEnter={isCurrentPlan ? undefined : onMouseEnter}
      onMouseLeave={isCurrentPlan ? undefined : onMouseLeave}
    >
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-medium">{plan.tier}</span>
            {isCurrentPlan && (
              <Badge variant="outline" className="ml-2 text-[10px] py-0 h-4 border-green-500 text-green-500">
                Current
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1 min-w-[80px] justify-end">
            {isPopular && <Badge className="bg-purple-500 hover:bg-purple-600 text-[10px]">Popular</Badge>}
            {hasBetaDeal && (
              <BetaDealBadge
                ref={betaDealBadgeRef}
                onMouseEnter={onBetaDealMouseEnter}
                onMouseLeave={onBetaDealMouseLeave}
              />
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
}
