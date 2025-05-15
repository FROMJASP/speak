"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { pricingPlans, formatAudioTime, type PlanTier } from "@/data/pricing-plans"
import { getUsageColorClass, getUsageStatusMessage, getUsageTextColorClass } from "@/utils/usage-utils"
import { AlertTriangle, ArrowUpRight, CalendarDays, UserCheck } from "lucide-react"
import { usePlan } from "./plan-context"
import BaseModal from "@/components/ui/base-modal"
import PlanSummaryCards from "./plan-preview/PlanSummaryCards"
import {
  formatTimeSince,
} from "./utils/date-utils"
import {
  formatTimeCompact,
  getSignupDate,
  getNextBillingDate,
  getDefaultUsagePercentage,
  getPlanDetails,
  calcUsagePercentage,
  calcUsedSecondsFromPercentage,
  isDowngrade,
} from "./utils/plan-usage-utils"

// Predefined scenarios for each plan
const planScenarios = {
  Free: {
    usagePercentage: 90, // 90% used
    description: "Almost out of time (red warning)",
  },
  Starter: {
    usagePercentage: 85, // 85% used
    description: "Low on time (red warning)",
  },
  Creator: {
    usagePercentage: 90, // 90% used (1h 48m of 2h)
    description: "1h 48m used of 2h total",
  },
  Professional: {
    usagePercentage: 70, // 70% used
    description: "Medium usage (amber warning)",
  },
  Company: {
    usagePercentage: 40, // 40% used
    description: "Plenty of time left (green)",
  },
}

// Get a date from 2 weeks ago (for demonstration purposes)
const getTwoWeeksAgoDate = (): string => {
  const today = new Date()
  const twoWeeksAgo = new Date(today)
  twoWeeksAgo.setDate(today.getDate() - 14) // Subtract 14 days
  return twoWeeksAgo.toISOString().split("T")[0] // Return in YYYY-MM-DD format
}

interface PlanPreviewModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PlanPreviewModal({ isOpen, onClose }: PlanPreviewModalProps) {
  const { updatePlanAndUsage, currentPlan: contextCurrentPlan } = usePlan()
  const [selectedPlan, setSelectedPlan] = useState<PlanTier>("Creator")
  const [usagePercentage, setUsagePercentage] = useState(getDefaultUsagePercentage("Creator"))
  const [accumulatedMonths, setAccumulatedMonths] = useState(1)
  const [effectiveDate, setEffectiveDate] = useState(getNextBillingDate())
  const [signupDate, setSignupDate] = useState(getSignupDate())
  const [showDowngradePreview, setShowDowngradePreview] = useState(false)
  const [actualUsedSeconds, setActualUsedSeconds] = useState(0)
  const isInitializedRef = useRef(false)
  const isUpdatingRef = useRef(false)

  const plan = getPlanDetails(selectedPlan)
  const monthlyMinutes = plan.audioMinutes
  const monthlySeconds = monthlyMinutes * 60
  const totalMinutes = monthlyMinutes * accumulatedMonths
  const totalSeconds = totalMinutes * 60
  const contextPlan = getPlanDetails(contextCurrentPlan)
  const remainingSeconds = totalSeconds - actualUsedSeconds

  useEffect(() => {
    if (isUpdatingRef.current) return
    isUpdatingRef.current = true
    const newPercentage = getDefaultUsagePercentage(selectedPlan)
    setUsagePercentage(newPercentage)
    setActualUsedSeconds(calcUsedSecondsFromPercentage(monthlySeconds, newPercentage))
    setShowDowngradePreview(isDowngrade(selectedPlan, contextCurrentPlan))
    isUpdatingRef.current = false
  }, [selectedPlan, monthlySeconds, contextCurrentPlan])

  useEffect(() => {
    if (isUpdatingRef.current) return
    if (accumulatedMonths > 0 && totalSeconds > 0) {
      isUpdatingRef.current = true
      setUsagePercentage(calcUsagePercentage(actualUsedSeconds, totalSeconds))
      isUpdatingRef.current = false
    }
  }, [accumulatedMonths, totalSeconds, actualUsedSeconds])

  const handlePlanChange = (plan: PlanTier) => {
    setAccumulatedMonths(1)
    setSelectedPlan(plan)
  }

  const handleUsagePercentageChange = (newPercentage: number) => {
    if (isUpdatingRef.current) return
    isUpdatingRef.current = true
    setUsagePercentage(newPercentage)
    setActualUsedSeconds(calcUsedSecondsFromPercentage(totalSeconds, newPercentage))
    isUpdatingRef.current = false
  }

  const applyChanges = () => {
    const monthlyUsedPercentage = calcUsagePercentage(actualUsedSeconds, monthlySeconds)
    const monthlyUsedSeconds = calcUsedSecondsFromPercentage(monthlySeconds, monthlyUsedPercentage)
    updatePlanAndUsage(selectedPlan, monthlyUsedSeconds)
    onClose()
  }

  const statusMessage = getUsageStatusMessage(usagePercentage, remainingSeconds, selectedPlan)

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Preview SPEAK's plans"
      description="Visually preview the UI for different users on different plans"
      className="sm:max-w-[680px]"
    >
      <div className="p-5">
        <Tabs
          defaultValue={selectedPlan}
          value={selectedPlan}
          onValueChange={(value) => handlePlanChange(value as PlanTier)}
        >
          <TabsList className="grid grid-cols-5 mb-4">
            {pricingPlans.map((plan) => (
              <TabsTrigger key={plan.tier} value={plan.tier} className="text-sm py-1.5">
                {plan.tier}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-md p-3">
                <div className="flex items-start gap-2">
                  <UserCheck className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="w-full">
                    <h4 className="text-sm font-medium text-blue-500 mb-1.5">User Account</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="signup-date" className="text-xs text-muted-foreground">
                          Signup Date:
                        </Label>
                        <Input
                          id="signup-date"
                          type="date"
                          value={signupDate}
                          onChange={(e) => setSignupDate(e.target.value)}
                          className="h-7 text-xs mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="current-plan" className="text-xs text-muted-foreground">
                          Current Plan:
                        </Label>
                        <div className="h-7 text-xs mt-1 flex items-center">
                          <span className="font-medium">{contextCurrentPlan}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5">
                      Joined {formatTimeSince(signupDate)} • {formatAudioTime(contextPlan.audioMinutes)} /month
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="usage-slider" className="text-sm flex justify-between mb-1.5">
                    <span>Usage Percentage:</span>
                    <span>{usagePercentage}%</span>
                  </Label>
                  <input
                    id="usage-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={usagePercentage}
                    onChange={(e) => handleUsagePercentageChange(Number.parseInt(e.target.value))}
                    className="w-full h-7"
                  />
                </div>
                <div>
                  <Label htmlFor="accumulated-months" className="text-sm flex justify-between mb-1.5">
                    <span>Accumulated Months:</span>
                    <span>{accumulatedMonths}</span>
                  </Label>
                  <input
                    id="accumulated-months-slider"
                    type="range"
                    min="1"
                    max="12"
                    value={accumulatedMonths}
                    onChange={(e) => setAccumulatedMonths(Number.parseInt(e.target.value))}
                    className="w-full h-7"
                  />
                </div>
              </div>
            </div>
            {showDowngradePreview && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-md p-3">
                <div className="flex items-start gap-2">
                  <CalendarDays className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-amber-500">Plan Downgrade</h4>
                      <div className="flex items-center gap-1.5">
                        <Label htmlFor="effective-date" className="text-xs text-muted-foreground">
                          Effective:
                        </Label>
                        <Input
                          id="effective-date"
                          type="date"
                          value={effectiveDate}
                          onChange={(e) => setEffectiveDate(e.target.value)}
                          className="h-7 text-xs w-32"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Downgrading from {contextCurrentPlan} ({formatAudioTime(contextPlan.audioMinutes)}/mo) to {selectedPlan} ({formatAudioTime(monthlyMinutes)}/mo)
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Audio time usage</span>
                <div>
                  <span className={getUsageTextColorClass(usagePercentage, remainingSeconds) + " font-medium"}>
                    {formatTimeCompact(remainingSeconds)} left
                  </span>
                  <span className="text-muted-foreground"> / {formatAudioTime(totalMinutes)}</span>
                  {accumulatedMonths > 1 && (
                    <span className="text-xs text-muted-foreground ml-1">
                      ({formatAudioTime(monthlyMinutes)} × {accumulatedMonths})
                    </span>
                  )}
                </div>
              </div>
              <Progress
                value={usagePercentage}
                className="h-2"
                indicatorClassName={getUsageColorClass(usagePercentage, remainingSeconds)}
              />
              {statusMessage && (
                <div
                  className={`text-xs mt-1.5 flex items-center gap-1.5 ${
                    statusMessage.isWarning
                      ? usagePercentage >= 80 || remainingSeconds < 180
                        ? "text-red-500"
                        : "text-amber-500"
                      : "text-muted-foreground"
                  }`}
                >
                  {statusMessage.isWarning ? (
                    <AlertTriangle className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  )}
                  <p>{statusMessage.hasLink ? "If you need more time, please contact us" : statusMessage.message}</p>
                </div>
              )}
            </div>
            <PlanSummaryCards
              selectedPlan={selectedPlan}
              monthlyMinutes={monthlyMinutes}
              accumulatedMonths={accumulatedMonths}
              totalMinutes={totalMinutes}
              actualUsedSeconds={actualUsedSeconds}
              remainingSeconds={remainingSeconds}
              usagePercentage={usagePercentage}
            />
          </div>
        </Tabs>
      </div>
      <div className="p-4 border-t flex justify-between">
        <Button type="button" variant="outline" onClick={onClose} size="sm" className="text-sm h-9">
          Cancel
        </Button>
        <Button type="button" variant="dark" onClick={applyChanges} size="sm" className="text-sm h-9">
          Apply Changes
        </Button>
      </div>
    </BaseModal>
  )
}
