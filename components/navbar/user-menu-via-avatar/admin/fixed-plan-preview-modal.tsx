"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { pricingPlans, type PlanTier } from "@/data/pricing-plans"
import { getUsageColorClass, getUsageStatusMessage, getUsageTextColorClass } from "@/utils/usage-utils"
import { AlertTriangle, ArrowUpRight, CalendarDays, UserCheck, X } from "lucide-react"
import { usePlan } from "./plan-context"
import PlanSummaryCards from "./plan-preview/PlanSummaryCards"
import {
  formatDateForDisplay,
  formatTimeSince,
} from "@/utils/date-utils"
import {
  getSignupDate,
  getNextBillingDate,
  getDefaultUsagePercentage,
  getPlanDetails,
  calcUsagePercentage,
  calcUsedSecondsFromPercentage,
  isDowngrade,
} from "@/utils/plan-utils"
import { formatAudioTime, formatTimeCompact } from "@/utils/time-format"

interface FixedPlanPreviewModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FixedPlanPreviewModal({ isOpen, onClose }: FixedPlanPreviewModalProps) {
  const { updatePlanAndUsage, currentPlan: contextCurrentPlan } = usePlan()
  const [selectedPlan, setSelectedPlan] = useState<PlanTier>("Creator")
  const [usagePercentage, setUsagePercentage] = useState(getDefaultUsagePercentage("Creator"))
  const [accumulatedMonths, setAccumulatedMonths] = useState(1)
  const [effectiveDate, setEffectiveDate] = useState(getNextBillingDate())
  const [signupDate, setSignupDate] = useState(getSignupDate())
  const [showDowngradePreview, setShowDowngradePreview] = useState(false)
  const [actualUsedSeconds, setActualUsedSeconds] = useState(0)
  const [mounted, setMounted] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = originalStyle
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  const plan = getPlanDetails(selectedPlan)
  const monthlyMinutes = plan.audioMinutes
  const monthlySeconds = monthlyMinutes * 60
  const totalMinutes = monthlyMinutes * accumulatedMonths
  const totalSeconds = totalMinutes * 60
  const contextPlan = getPlanDetails(contextCurrentPlan)
  const remainingSeconds = totalSeconds - actualUsedSeconds

  useEffect(() => {
    const defaultPercentage = getDefaultUsagePercentage(selectedPlan)
    setUsagePercentage(defaultPercentage)
    setActualUsedSeconds(calcUsedSecondsFromPercentage(monthlySeconds, defaultPercentage))
    setShowDowngradePreview(isDowngrade(selectedPlan, contextCurrentPlan))
  }, [selectedPlan, monthlySeconds, contextCurrentPlan])

  useEffect(() => {
    if (accumulatedMonths > 0 && totalSeconds > 0) {
      setUsagePercentage(calcUsagePercentage(actualUsedSeconds, totalSeconds))
    }
  }, [accumulatedMonths, totalSeconds, actualUsedSeconds])

  const handlePlanChange = (plan: PlanTier) => {
    setSelectedPlan(plan)
    setAccumulatedMonths(1)
    const defaultPercentage = getDefaultUsagePercentage(plan)
    setUsagePercentage(defaultPercentage)
    const newPlanDetails = getPlanDetails(plan)
    const newMonthlySeconds = newPlanDetails.audioMinutes * 60
    setActualUsedSeconds(calcUsedSecondsFromPercentage(newMonthlySeconds, defaultPercentage))
    setShowDowngradePreview(isDowngrade(plan, contextCurrentPlan))
  }

  const handleUsagePercentageChange = (newPercentage: number) => {
    setUsagePercentage(newPercentage)
    setActualUsedSeconds(calcUsedSecondsFromPercentage(totalSeconds, newPercentage))
  }

  const applyChanges = () => {
    const monthlyUsedPercentage = calcUsagePercentage(actualUsedSeconds, monthlySeconds)
    const monthlyUsedSeconds = calcUsedSecondsFromPercentage(monthlySeconds, monthlyUsedPercentage)
    updatePlanAndUsage(selectedPlan, monthlyUsedSeconds)
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  const statusMessage = getUsageStatusMessage(usagePercentage, remainingSeconds, selectedPlan)
  if (!isOpen || !mounted) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        className="bg-background rounded-lg shadow-lg w-full max-w-[700px] max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold">Preview SPEAK's plans</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Visually preview the UI for different users on different plans by selecting a plan from one of the tabs
              and setting its usage percentage
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="overflow-y-auto flex-1 p-6">
          <Tabs
            defaultValue={selectedPlan}
            value={selectedPlan}
            onValueChange={(value) => handlePlanChange(value as PlanTier)}
          >
            <TabsList className="grid grid-cols-5 mb-4">
              {pricingPlans.map((plan) => (
                <TabsTrigger key={plan.tier} value={plan.tier}>
                  {plan.tier}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="mb-4">
              <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
                <div className="flex items-start gap-2">
                  <UserCheck className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-500 mb-1">User Account Details</h4>
                    <div className="grid grid-cols-2 gap-4">
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
                        <p className="text-xs text-muted-foreground mt-1">User joined {formatTimeSince(signupDate)}</p>
                      </div>
                      <div>
                        <Label htmlFor="current-plan" className="text-xs text-muted-foreground">
                          Current Plan:
                        </Label>
                        <div className="h-7 text-xs mt-1 flex items-center">
                          <span className="font-medium">{contextCurrentPlan}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatAudioTime(contextPlan.audioMinutes)} audio per month
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="usage-slider" className="text-sm">
                    Usage Percentage: {usagePercentage}%
                  </Label>
                  <div className="pt-2">
                    <input
                      id="usage-slider"
                      type="range"
                      min="0"
                      max="100"
                      value={usagePercentage}
                      onChange={(e) => handleUsagePercentageChange(Number.parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="accumulated-months" className="text-sm">
                    Accumulated Months
                  </Label>
                  <div className="pt-2 flex items-center gap-2">
                    <Input
                      id="accumulated-months"
                      type="number"
                      min="1"
                      max="12"
                      value={accumulatedMonths}
                      onChange={(e) => setAccumulatedMonths(Math.max(1, Math.min(12, Number.parseInt(e.target.value) || 1)))}
                      className="w-20"
                    />
                    <span className="text-sm text-muted-foreground">
                      {accumulatedMonths > 1 ? `${accumulatedMonths} months of accumulated time` : "No accumulated time"}
                    </span>
                  </div>
                </div>
              </div>
              {showDowngradePreview && (
                <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-md">
                  <div className="flex items-start gap-2">
                    <CalendarDays className="h-4 w-4 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-amber-500 mb-1">Plan Downgrade Preview</h4>
                      <p className="text-xs text-muted-foreground">
                        When downgrading from {contextCurrentPlan} to {selectedPlan}, you'll keep your accumulated time, but
                        from <span className="font-medium">{formatDateForDisplay(effectiveDate)}</span> you'll receive {" "}
                        <span className="font-medium">{formatAudioTime(monthlyMinutes)}/month</span> instead of {" "}
                        <span className="font-medium">{formatAudioTime(contextPlan.audioMinutes)}/month</span>.
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Label htmlFor="effective-date" className="text-xs">
                          Effective Date:
                        </Label>
                        <Input
                          id="effective-date"
                          type="date"
                          value={effectiveDate}
                          onChange={(e) => setEffectiveDate(e.target.value)}
                          className="h-7 text-xs w-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Audio time usage</span>
                <div>
                  <span className={getUsageTextColorClass(usagePercentage, remainingSeconds) + " font-medium"}>
                    {formatTimeCompact(remainingSeconds)} left
                  </span>
                  <span className="text-muted-foreground"> / {formatAudioTime(totalMinutes)}</span>
                  {accumulatedMonths > 1 && (
                    <span className="text-xs text-muted-foreground ml-1">
                      ({formatAudioTime(monthlyMinutes)}/month × {accumulatedMonths})
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
                  className={`text-xs mt-1 flex items-center gap-1 ${
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
                      If you need more time, please {" "}
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
          </Tabs>
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
        <div className="p-6 border-t flex justify-between">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="dark" onClick={applyChanges}>
            Apply Changes
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
