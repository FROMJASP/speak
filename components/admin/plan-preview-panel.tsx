"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowUpRight, Clock, Calendar, BarChart3, UserCheck, CalendarDays } from "lucide-react"
import AudioTimeDisplay from "../audio-time-display"
import { pricingPlans, formatTimeFromSeconds, formatAudioTime, type PlanTier } from "@/data/pricing-plans"
import { getUsageColorClass, getUsageStatusMessage, getUsageTextColorClass } from "@/utils/usage-utils"
import { usePlan } from "./plan-context"
import { Input } from "@/components/ui/input"
import FixedPlanPreviewModal from "./fixed-plan-preview-modal"

// Function to format time in a compact way (e.g., "1h 30m")
const formatTimeCompact = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  let result = ""
  if (hours > 0) {
    result += `${hours}h `
  }
  if (minutes > 0) {
    result += `${minutes}m`
  }

  return result.trim() || "0m"
}

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

export default function PlanPreviewPanel() {
  const { currentPlan, usedSeconds: contextUsedSeconds, updatePlanAndUsage } = usePlan()
  const [selectedPlan, setSelectedPlan] = useState<PlanTier>(currentPlan)
  const [usagePercentage, setUsagePercentage] = useState(() => {
    // Initialize with a default percentage based on the plan
    if (currentPlan === "Free" || currentPlan === "Starter") {
      return 85 // Higher usage for free/starter plans
    } else if (currentPlan === "Company") {
      return 40 // Lower usage for company plan
    }
    return 70 // Default for other plans
  })
  const [accumulatedMonths, setAccumulatedMonths] = useState(1) // Default to 1 month (no accumulation)
  const [signupDate, setSignupDate] = useState(getSignupDate())
  const [effectiveDate, setEffectiveDate] = useState(getNextBillingDate())
  const [showDowngradePreview, setShowDowngradePreview] = useState(false)
  const [actualUsedSeconds, setActualUsedSeconds] = useState(0) // Store the actual used seconds
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Update selected plan when context changes
  useEffect(() => {
    setSelectedPlan(currentPlan)
    // Calculate the current usage percentage based on contextUsedSeconds
    const plan = pricingPlans.find((p) => p.tier === currentPlan) || pricingPlans[0]
    const totalSecs = plan.audioMinutes * 60
    const percentage = Math.round((contextUsedSeconds / totalSecs) * 100)
    setUsagePercentage(percentage)
    setActualUsedSeconds(contextUsedSeconds)
  }, [currentPlan, contextUsedSeconds])

  // Get plan details
  const plan = pricingPlans.find((p) => p.tier === selectedPlan) || pricingPlans[0]
  const monthlyMinutes = plan.audioMinutes
  const monthlySeconds = monthlyMinutes * 60

  // Calculate accumulated time
  const totalMinutes = monthlyMinutes * accumulatedMonths
  const totalSeconds = totalMinutes * 60

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
  const contextPlan = pricingPlans.find((p) => p.tier === currentPlan) || pricingPlans[0]

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
      pricingPlans.findIndex((p) => p.tier === plan) < pricingPlans.findIndex((p) => p.tier === currentPlan)
    setShowDowngradePreview(newIsDowngrade)
  }

  // Handle usage percentage change
  const handleUsagePercentageChange = (newPercentage: number) => {
    setUsagePercentage(newPercentage)
    // Update actual used seconds when percentage changes
    const newUsedSeconds = Math.round((totalSeconds * newPercentage) / 100)
    setActualUsedSeconds(newUsedSeconds)
  }

  // Apply changes to the global state
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
  }

  // Reset to the current values from context
  const resetToDefaults = () => {
    setSelectedPlan(currentPlan)
    setAccumulatedMonths(1)
    // Calculate the current usage percentage based on contextUsedSeconds
    const plan = pricingPlans.find((p) => p.tier === currentPlan) || pricingPlans[0]
    const totalSecs = plan.audioMinutes * 60
    const percentage = Math.round((contextUsedSeconds / totalSecs) * 100)
    setUsagePercentage(percentage)
    setActualUsedSeconds(contextUsedSeconds)
  }

  // Get status message
  const statusMessage = getUsageStatusMessage(usagePercentage, remainingSeconds, selectedPlan)

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Plan Preview Panel</CardTitle>
              <CardDescription>Preview how AudioTimeDisplay looks for different plans and usage levels</CardDescription>
            </div>
            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
              Admin Only
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
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
                          <span className="font-medium">{currentPlan}</span>
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
                  <Label>Usage Percentage: {usagePercentage}%</Label>
                  <Slider
                    value={[usagePercentage]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleUsagePercentageChange(value[0])}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="accumulated-months">Accumulated Months</Label>
                  <div className="flex items-center gap-2 mt-2">
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
                        When downgrading from {currentPlan} to {selectedPlan}, you'll keep your accumulated time, but
                        from <span className="font-medium">{formatDateForDisplay(effectiveDate)}</span> you'll receive{" "}
                        <span className="font-medium">{formatAudioTime(monthlyMinutes)}/month</span> instead of{" "}
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
                <span>
                  <span className={getUsageTextColorClass(usagePercentage, remainingSeconds)}>
                    {formatTimeFromSeconds(remainingSeconds)} left
                  </span>
                  <span className="text-muted-foreground"> / {formatAudioTime(totalMinutes)}</span>
                  {accumulatedMonths > 1 && (
                    <span className="text-xs text-muted-foreground ml-1">
                      ({formatAudioTime(monthlyMinutes)}/month × {accumulatedMonths})
                    </span>
                  )}
                </span>
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

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium mb-4">Preview</h3>

              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="text-xs text-muted-foreground mb-2">AudioTimeDisplay Component:</h4>
                  <div className="flex justify-center p-4 bg-background border rounded-md">
                    <AudioTimeDisplay usedSeconds={actualUsedSeconds} tier={selectedPlan} />
                  </div>
                </div>

                <div>
                  <h4 className="text-xs text-muted-foreground mb-2">In Navbar Context:</h4>
                  <div className="flex items-center justify-between p-4 bg-background border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-md"></div>
                      <div className="text-muted-foreground">/</div>
                      <span className="font-medium">Project Name</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <AudioTimeDisplay usedSeconds={actualUsedSeconds} tier={selectedPlan} />
                      <div className="w-8 h-8 bg-secondary rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tabs>

          <div className="flex justify-between mt-4 gap-2">
            <Button variant="outline" size="sm" onClick={resetToDefaults}>
              Reset to Defaults
            </Button>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>
                Open in Modal
              </Button>
              <Button variant="dark" size="sm" onClick={applyChanges}>
                Apply Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <FixedPlanPreviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
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
