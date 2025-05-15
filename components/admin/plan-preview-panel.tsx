"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowUpRight, UserCheck, CalendarDays } from "lucide-react"
import AudioTimeDisplay from "../audio-time-display"
import { pricingPlans, formatTimeFromSeconds, formatAudioTime, type PlanTier } from "@/data/pricing-plans"
import { getUsageColorClass, getUsageStatusMessage, getUsageTextColorClass } from "@/utils/usage-utils"
import { usePlan } from "./plan-context"
import { Input } from "@/components/ui/input"
import FixedPlanPreviewModal from "./fixed-plan-preview-modal"
import PlanSummaryCards from "./plan-preview/PlanSummaryCards"
import {
  formatDateForDisplay,
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

export default function PlanPreviewPanel() {
  const { currentPlan, usedSeconds: contextUsedSeconds, updatePlanAndUsage } = usePlan()
  const [selectedPlan, setSelectedPlan] = useState<PlanTier>(currentPlan)
  const [usagePercentage, setUsagePercentage] = useState(() => getDefaultUsagePercentage(currentPlan))
  const [accumulatedMonths, setAccumulatedMonths] = useState(1)
  const [signupDate, setSignupDate] = useState(getSignupDate())
  const [effectiveDate, setEffectiveDate] = useState(getNextBillingDate())
  const [showDowngradePreview, setShowDowngradePreview] = useState(false)
  const [actualUsedSeconds, setActualUsedSeconds] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Update selected plan and usage when context changes
  useEffect(() => {
    setSelectedPlan(currentPlan)
    const plan = getPlanDetails(currentPlan)
    const totalSecs = plan.audioMinutes * 60
    setUsagePercentage(calcUsagePercentage(contextUsedSeconds, totalSecs))
    setActualUsedSeconds(contextUsedSeconds)
  }, [currentPlan, contextUsedSeconds])

  // Plan details
  const plan = getPlanDetails(selectedPlan)
  const monthlyMinutes = plan.audioMinutes
  const monthlySeconds = monthlyMinutes * 60
  const totalMinutes = monthlyMinutes * accumulatedMonths
  const totalSeconds = totalMinutes * 60

  // Recalculate usage percentage when accumulated months changes
  useEffect(() => {
    if (accumulatedMonths > 0 && totalSeconds > 0) {
      setUsagePercentage(calcUsagePercentage(actualUsedSeconds, totalSeconds))
    }
  }, [accumulatedMonths, totalSeconds, actualUsedSeconds])

  // Calculate remaining seconds
  const remainingSeconds = totalSeconds - actualUsedSeconds
  const contextPlan = getPlanDetails(currentPlan)

  // Handle plan change
  const handlePlanChange = (plan: PlanTier) => {
    setSelectedPlan(plan)
    setAccumulatedMonths(1)
    const defaultPercentage = getDefaultUsagePercentage(plan)
    setUsagePercentage(defaultPercentage)
    const newPlanDetails = getPlanDetails(plan)
    const newMonthlySeconds = newPlanDetails.audioMinutes * 60
    setActualUsedSeconds(calcUsedSecondsFromPercentage(newMonthlySeconds, defaultPercentage))
    setShowDowngradePreview(isDowngrade(plan, currentPlan))
  }

  // Handle usage percentage change
  const handleUsagePercentageChange = (newPercentage: number) => {
    setUsagePercentage(newPercentage)
    setActualUsedSeconds(calcUsedSecondsFromPercentage(totalSeconds, newPercentage))
  }

  // Apply changes to the global state
  const applyChanges = () => {
    const monthlyUsedPercentage = calcUsagePercentage(actualUsedSeconds, monthlySeconds)
    const monthlyUsedSeconds = calcUsedSecondsFromPercentage(monthlySeconds, monthlyUsedPercentage)
    updatePlanAndUsage(selectedPlan, monthlyUsedSeconds)
    // Optionally show toast here
  }

  // Reset to the current values from context
  const resetToDefaults = () => {
    setSelectedPlan(currentPlan)
    setAccumulatedMonths(1)
    const plan = getPlanDetails(currentPlan)
    const totalSecs = plan.audioMinutes * 60
    setUsagePercentage(calcUsagePercentage(contextUsedSeconds, totalSecs))
    setActualUsedSeconds(contextUsedSeconds)
  }

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
                      onChange={(e) => setAccumulatedMonths(Math.max(1, Math.min(12, Number.parseInt(e.target.value) || 1)))}
                      className="w-20"
                    />
                    <span className="text-sm text-muted-foreground">
                      {accumulatedMonths > 1 ? `${accumulatedMonths} months of accumulated time` : "No accumulated time"}
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

            {/* Summary Cards (refactored) */}
            <PlanSummaryCards
              selectedPlan={selectedPlan}
              monthlyMinutes={monthlyMinutes}
              accumulatedMonths={accumulatedMonths}
              totalMinutes={totalMinutes}
              actualUsedSeconds={actualUsedSeconds}
              remainingSeconds={remainingSeconds}
              usagePercentage={usagePercentage}
            />

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
