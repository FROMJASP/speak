"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { pricingPlans, formatAudioTime, type PlanTier } from "@/data/pricing-plans"
import { getUsageColorClass, getUsageStatusMessage, getUsageTextColorClass } from "@/utils/usage-utils"
import { formatTimeCompact } from "@/utils/time-format"
import { AlertTriangle, ArrowUpRight, Clock, Calendar, BarChart3, CalendarDays, UserCheck, X } from "lucide-react"
import { usePlan } from "./plan-context"

// Get a date from 2 weeks ago (for demonstration purposes)
const getSignupDate = (): string => {
  const today = new Date()
  const twoWeeksAgo = new Date(today)
  twoWeeksAgo.setDate(today.getDate() - 14) // Subtract 14 days
  return twoWeeksAgo.toISOString().split("T")[0] // Return in YYYY-MM-DD format
}

// Get the next billing date (for demonstration purposes)
const getNextBillingDate = (): string => {
  const today = new Date()
  const nextMonth = new Date(today)
  nextMonth.setMonth(today.getMonth() + 1)
  return nextMonth.toISOString().split("T")[0] // Return in YYYY-MM-DD format
}

interface FixedPlanPreviewModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FixedPlanPreviewModal({ isOpen, onClose }: FixedPlanPreviewModalProps) {
  const { updatePlanAndUsage, currentPlan: contextCurrentPlan } = usePlan()
  const [selectedPlan, setSelectedPlan] = useState<PlanTier>("Creator")
  const [usagePercentage, setUsagePercentage] = useState(90) // Default to 90% for Creator plan
  const [accumulatedMonths, setAccumulatedMonths] = useState(1) // Default to 1 month (no accumulation)
  const [effectiveDate, setEffectiveDate] = useState(getNextBillingDate())
  const [signupDate, setSignupDate] = useState(getSignupDate())
  const [showDowngradePreview, setShowDowngradePreview] = useState(false)
  const [actualUsedSeconds, setActualUsedSeconds] = useState(0) // Store the actual used seconds
  const [mounted, setMounted] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Mount the component
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Handle body scroll locking
  useEffect(() => {
    if (isOpen) {
      // Save the current body style
      const originalStyle = window.getComputedStyle(document.body).overflow

      // Prevent scrolling on the body
      document.body.style.overflow = "hidden"

      // Restore original style when modal closes or component unmounts
      return () => {
        document.body.style.overflow = originalStyle
      }
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  // Get plan details
  const plan = pricingPlans.find((p) => p.tier === selectedPlan) || pricingPlans[0]
  const monthlyMinutes = plan.audioMinutes
  const monthlySeconds = monthlyMinutes * 60

  // Calculate accumulated time
  const totalMinutes = monthlyMinutes * accumulatedMonths
  const totalSeconds = totalMinutes * 60

  // Initialize actualUsedSeconds when plan changes
  useEffect(() => {
    // Set a default usage percentage based on the plan tier
    let defaultPercentage = 70 // Default for most plans

    if (selectedPlan === "Free" || selectedPlan === "Starter") {
      defaultPercentage = 85 // Higher usage for free/starter plans
    } else if (selectedPlan === "Company") {
      defaultPercentage = 40 // Lower usage for company plan
    }

    setUsagePercentage(defaultPercentage)

    // Calculate initial used seconds based on the percentage and monthly seconds
    const initialUsedSeconds = Math.round((monthlySeconds * defaultPercentage) / 100)
    setActualUsedSeconds(initialUsedSeconds)
  }, [selectedPlan, monthlySeconds])

  // Recalculate usage percentage when accumulated months changes
  useEffect(() => {
    if (accumulatedMonths > 0 && totalSeconds > 0) {
      // Keep the actual used seconds the same, but recalculate the percentage
      const newPercentage = Math.min(Math.round((actualUsedSeconds / totalSeconds) * 100), 100)
      setUsagePercentage(newPercentage)
    }
  }, [accumulatedMonths, totalSeconds, actualUsedSeconds])

  // Calculate remaining seconds based on actual used seconds
  const remainingSeconds = totalSeconds - actualUsedSeconds

  // Get the current plan from context for comparison
  const contextPlan = pricingPlans.find((p) => p.tier === contextCurrentPlan) || pricingPlans[0]

  // Check if selected plan is a downgrade from the context plan
  const isDowngrade =
    pricingPlans.findIndex((p) => p.tier === selectedPlan) <
    pricingPlans.findIndex((p) => p.tier === contextCurrentPlan)

  // Handle plan change
  const handlePlanChange = (plan: PlanTier) => {
    setSelectedPlan(plan)

    // Reset accumulated months when changing plans
    setAccumulatedMonths(1)

    // Set a default usage percentage based on the plan tier
    let defaultPercentage = 70 // Default for most plans

    if (plan === "Free" || plan === "Starter") {
      defaultPercentage = 85 // Higher usage for free/starter plans
    } else if (plan === "Company") {
      defaultPercentage = 40 // Lower usage for company plan
    }

    setUsagePercentage(defaultPercentage)

    // Calculate new used seconds based on the new plan and percentage
    const newPlanDetails = pricingPlans.find((p) => p.tier === plan) || pricingPlans[0]
    const newMonthlySeconds = newPlanDetails.audioMinutes * 60
    const newUsedSeconds = Math.round((newMonthlySeconds * defaultPercentage) / 100)
    setActualUsedSeconds(newUsedSeconds)

    // Check if this is a downgrade from the context plan
    const newIsDowngrade =
      pricingPlans.findIndex((p) => p.tier === plan) < pricingPlans.findIndex((p) => p.tier === contextCurrentPlan)
    setShowDowngradePreview(newIsDowngrade)
  }

  // Handle usage percentage change
  const handleUsagePercentageChange = (newPercentage: number) => {
    setUsagePercentage(newPercentage)
    // Update actual used seconds when percentage changes
    const newUsedSeconds = Math.round((totalSeconds * newPercentage) / 100)
    setActualUsedSeconds(newUsedSeconds)
  }

  // Apply changes to the actual UI
  const applyChanges = () => {
    // Calculate the monthly usage (not accumulated)
    // We need to convert back to a monthly percentage for the global state
    const monthlyUsedPercentage = Math.min(Math.round((actualUsedSeconds / monthlySeconds) * 100), 100)
    const monthlyUsedSeconds = Math.round((monthlySeconds * monthlyUsedPercentage) / 100)

    // Update the global state with the selected plan and calculated used seconds
    updatePlanAndUsage(selectedPlan, monthlyUsedSeconds)

    console.log(
      `Applied changes: Plan=${selectedPlan}, UsedSeconds=${monthlyUsedSeconds}, AccumulatedMonths=${accumulatedMonths}`,
    )
    onClose()
  }

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Get status message
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
              {/* User Signup Date Section */}
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
                          onChange={(e) => {
                            setSignupDate(e.target.value)
                          }}
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
                      onChange={(e) =>
                        setAccumulatedMonths(Math.max(1, Math.min(12, Number.parseInt(e.target.value) || 1)))
                      }
                      className="w-20"
                    />
                    <span className="text-sm text-muted-foreground">
                      {accumulatedMonths > 1
                        ? `${accumulatedMonths} months of accumulated time`
                        : "No accumulated time"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Downgrade Preview Section */}
              {showDowngradePreview && (
                <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-md">
                  <div className="flex items-start gap-2">
                    <CalendarDays className="h-4 w-4 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-amber-500 mb-1">Plan Downgrade Preview</h4>
                      <p className="text-xs text-muted-foreground">
                        When downgrading from {contextCurrentPlan} to {selectedPlan}, you'll keep your accumulated time,
                        but from <span className="font-medium">{formatDateForDisplay(effectiveDate)}</span> you'll
                        receive <span className="font-medium">{formatAudioTime(monthlyMinutes)}/month</span> instead of{" "}
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
                          onChange={(e) => {
                            setEffectiveDate(e.target.value)
                          }}
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
          </Tabs>

          {/* Redesigned Preview Summary */}
          <div className="grid grid-cols-3 gap-3 mt-2 mb-4">
            <div className="bg-muted/30 p-3 rounded-md flex flex-col">
              <div className="flex items-center gap-1.5 mb-1.5 text-sm font-medium text-primary">
                <Clock className="h-4 w-4" />
                <span>Plan Details</span>
              </div>
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">Plan:</span>
                  <span className="font-medium">{selectedPlan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly:</span>
                  <span>{formatAudioTime(monthlyMinutes)}</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-3 rounded-md flex flex-col">
              <div className="flex items-center gap-1.5 mb-1.5 text-sm font-medium text-amber-500">
                <Calendar className="h-4 w-4" />
                <span>Accumulation</span>
              </div>
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">Months:</span>
                  <span>{accumulatedMonths}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total:</span>
                  <span>{formatAudioTime(totalMinutes)}</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-3 rounded-md flex flex-col">
              <div className="flex items-center gap-1.5 mb-1.5 text-sm font-medium text-green-500">
                <BarChart3 className="h-4 w-4" />
                <span>Usage</span>
              </div>
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">Used:</span>
                  <span>{formatTimeCompact(actualUsedSeconds)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Remaining:</span>
                  <span className={getUsageTextColorClass(usagePercentage, remainingSeconds)}>
                    {formatTimeCompact(remainingSeconds)}
                  </span>
                </div>
              </div>
            </div>
          </div>
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

// Helper function to format a date string for display
function formatDateForDisplay(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  } catch (error) {
    console.error("Error formatting date:", error)
    return dateString
  }
}

// Helper function to format time since a given date in a user-friendly way
function formatTimeSince(dateString: string): string {
  try {
    const date = new Date(dateString)
    const today = new Date()

    if (isNaN(date.getTime())) {
      return "recently"
    }

    const diffTime = Math.abs(today.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 1) {
      return "today"
    } else if (diffDays === 1) {
      return "yesterday"
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else if (diffDays < 30) {
      const diffWeeks = Math.floor(diffDays / 7)
      return `${diffWeeks} ${diffWeeks === 1 ? "week" : "weeks"} ago`
    } else {
      const monthDiff = today.getMonth() - date.getMonth() + 12 * (today.getFullYear() - date.getFullYear())
      return `${monthDiff} ${monthDiff === 1 ? "month" : "months"} ago`
    }
  } catch (error) {
    console.error("Error calculating time since:", error)
    return "recently"
  }
}
