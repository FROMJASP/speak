"use client"

import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import UpgradeModal from "@/components/pricing/upgrade-modal"
import { pricingPlans, formatTokens, formatAudioTimeCompact, type PlanTier } from "@/data/pricing-plans"
import SequentialShimmerToken from "./icons/sequential-shimmer-token"
import ShimmerTokenIcon from "./icons/shimmer-token-icon"

interface TokenDisplayProps {
  tokens: number
  tier?: PlanTier
}

// Helper function to format numbers with dots as thousand separators
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export default function TokenDisplay({ tokens, tier = "Free" }: TokenDisplayProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<PlanTier | undefined>(undefined)

  // For demonstration: User is on Free plan with 25,000 tokens total and 1,250 remaining
  const currentPlan = pricingPlans.find((plan) => plan.tier === tier) || pricingPlans[0]
  const totalTokens = currentPlan.tokens
  const remainingTokens = tokens
  const usedTokens = totalTokens - remainingTokens
  const usagePercentage = (usedTokens / totalTokens) * 100

  // Show all plans, including the current one
  const allPlans = pricingPlans

  const handleUpgradeClick = (selectedTier: PlanTier) => {
    if (selectedTier === tier) return // Don't open modal for current plan
    setSelectedPlan(selectedTier)
    setIsModalOpen(true)
  }

  const openUpgradeModal = () => {
    setSelectedPlan(undefined)
    setIsModalOpen(true)
  }

  return (
    <>
      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground cursor-pointer hover:bg-secondary/80 transition-colors">
                  <ShimmerTokenIcon className="h-4 w-4" shimmerColor="rgba(148, 246, 252, 0.6)" shimmerDuration={1.5} />
                  <span className="font-medium">{formatNumber(tokens)}</span>
                </div>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Available tokens</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenuContent align="end" className="w-72">
          <div className="p-3">
            <h3 className="font-medium text-sm mb-1">Upgrade your plan</h3>

            {/* Token usage section */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Token usage</span>
                <span>
                  <span className={usagePercentage > 90 ? "text-red-500 font-medium" : ""}>
                    {formatNumber(remainingTokens)}
                  </span>
                  <span className="text-muted-foreground"> / {formatNumber(totalTokens)}</span>
                </span>
              </div>
              <Progress
                value={usagePercentage}
                className="h-2"
                indicatorClassName={usagePercentage > 90 ? "bg-red-500" : undefined}
              />
              {usagePercentage > 90 && (
                <p className="text-xs text-red-500 mt-1">You're running low on tokens. Consider upgrading your plan.</p>
              )}
            </div>

            <Button variant="dark" size="sm" className="w-full mb-3" onClick={openUpgradeModal}>
              Upgrade plan
            </Button>

            <p className="text-xs text-muted-foreground mb-3">Available plans:</p>

            {allPlans.map((plan) => {
              const isCurrentPlan = plan.tier === tier

              return (
                <div
                  key={plan.tier}
                  className={`flex items-center justify-between py-2 px-2 rounded-sm ${
                    isCurrentPlan ? "bg-secondary/70" : "cursor-pointer hover:bg-accent hover:text-accent-foreground"
                  }`}
                  onClick={() => !isCurrentPlan && handleUpgradeClick(plan.tier)}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="font-medium">{plan.tier}:</span>
                      {isCurrentPlan && (
                        <Badge variant="outline" className="ml-2 text-[10px] py-0 h-4 border-green-500 text-green-500">
                          Current
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground mt-0.5">
                      {formatAudioTimeCompact(plan.audioMinutes)}
                    </span>
                  </div>
                  <div className="flex items-center text-xs">
                    <SequentialShimmerToken className="h-3.5 w-3.5 mr-1" />
                    <span>{formatTokens(plan.tokens)}</span>
                  </div>
                </div>
              )
            })}
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
