"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { pricingPlans, formatAudioTime, type PlanTier } from "@/data/pricing-plans"
import { Check, Info, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import BaseModal from "@/components/ui/base-modal"

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  currentPlan: PlanTier
  selectedPlan?: PlanTier
}

export default function UpgradeModal({ isOpen, onClose, currentPlan, selectedPlan }: UpgradeModalProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual")
  const [activePlan, setActivePlan] = useState<PlanTier | undefined>(selectedPlan)

  // Reset active plan when modal opens or selectedPlan changes
  useEffect(() => {
    if (isOpen && selectedPlan) {
      setActivePlan(selectedPlan)
    }
  }, [isOpen, selectedPlan])

  // Get current plan details
  const currentPlanDetails = pricingPlans.find((p) => p.tier === currentPlan) || pricingPlans[0]

  // Get selected plan details
  const selectedPlanDetails = activePlan ? pricingPlans.find((p) => p.tier === activePlan) : undefined

  // Check if selected plan is a downgrade
  const isDowngrade =
    selectedPlanDetails &&
    pricingPlans.findIndex((p) => p.tier === selectedPlanDetails.tier) <
      pricingPlans.findIndex((p) => p.tier === currentPlan)

  // Check if selected plan is an upgrade
  const isUpgrade =
    selectedPlanDetails &&
    pricingPlans.findIndex((p) => p.tier === selectedPlanDetails.tier) >
      pricingPlans.findIndex((p) => p.tier === currentPlan)

  // Calculate annual discount percentage
  const getAnnualDiscount = (plan: (typeof pricingPlans)[0]) => {
    if (!plan.annualPrice || !plan.price) return 0
    return Math.round(((plan.price * 12 - plan.annualPrice) / (plan.price * 12)) * 100)
  }

  // Handle plan selection
  const handlePlanSelect = (plan: PlanTier) => {
    setActivePlan(plan)
  }

  // Handle upgrade/downgrade
  const handleChangePlan = () => {
    if (!activePlan) return

    // Here you would implement the actual plan change logic
    console.log(`Changing plan from ${currentPlan} to ${activePlan} with ${billingCycle} billing`)

    // Show success message and close modal
    onClose()
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={isDowngrade ? "Downgrade Plan" : isUpgrade ? "Upgrade Plan" : "Change Plan"}
      description={
        isDowngrade
          ? "Review the impact of downgrading your plan"
          : isUpgrade
            ? "Upgrade to get more audio time and voices"
            : "Select a new plan that fits your needs"
      }
      className="sm:max-w-[700px]"
    >
      <div className="p-6">
        {/* Billing Cycle Selector */}
        <div className="mb-6">
          <Tabs
            defaultValue={billingCycle}
            value={billingCycle}
            onValueChange={(value) => setBillingCycle(value as "monthly" | "annual")}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
              <TabsTrigger value="annual">
                Annual Billing
                <Badge variant="secondary" className="ml-2 bg-green-500/10 text-green-600 border-green-500/20">
                  Save 20%
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {pricingPlans.slice(1).map((plan) => (
            <div
              key={plan.tier}
              className={cn(
                "border rounded-lg p-4 cursor-pointer transition-all",
                activePlan === plan.tier
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/50 hover:bg-muted/30",
                currentPlan === plan.tier && "relative",
              )}
              onClick={() => handlePlanSelect(plan.tier)}
            >
              {currentPlan === plan.tier && <Badge className="absolute -top-2 -right-2 bg-primary">Current</Badge>}

              <h3 className="font-medium text-lg mb-1">{plan.tier}</h3>

              <div className="mb-3">
                <span className="text-2xl font-bold">
                  {billingCycle === "monthly" ? `€${plan.price}` : `€${Math.round(plan.annualPrice! / 12)}`}
                </span>
                <span className="text-muted-foreground">/month</span>

                {billingCycle === "annual" && plan.annualPrice && (
                  <div className="text-sm text-muted-foreground mt-1">
                    Billed annually (€{plan.annualPrice})
                    <span className="text-green-600 ml-1">Save {getAnnualDiscount(plan)}%</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-start">
                  <Check className="h-4 w-4 text-primary mt-1 mr-2" />
                  <span>{formatAudioTime(plan.audioMinutes)} audio/month</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-4 w-4 text-primary mt-1 mr-2" />
                  <span>Up to {plan.maxVoices} voices</span>
                </div>
                {plan.tier === "Professional" && (
                  <div className="flex items-start">
                    <Check className="h-4 w-4 text-primary mt-1 mr-2" />
                    <span>Priority support</span>
                  </div>
                )}
                {plan.tier === "Company" && (
                  <>
                    <div className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2" />
                      <span>Priority support</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2" />
                      <span>Custom voices</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Downgrade Warning */}
        {isDowngrade && (
          <div className="mb-6 p-4 border border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-amber-800 dark:text-amber-400 mb-1">Important: About Downgrading</h4>
                <p className="text-sm text-amber-800 dark:text-amber-400">
                  When downgrading from {currentPlan} to {activePlan}, you'll keep your accumulated time, but your
                  monthly allowance will be reduced. This change will take effect on your next billing date.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Upgrade Info */}
        {isUpgrade && (
          <div className="mb-6 p-4 border border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-800 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-green-800 dark:text-green-400 mb-1">Upgrade Benefits</h4>
                <p className="text-sm text-green-800 dark:text-green-400">
                  Upgrading from {currentPlan} to {activePlan} gives you{" "}
                  {formatAudioTime(selectedPlanDetails?.audioMinutes || 0)} of audio time per month (up from{" "}
                  {formatAudioTime(currentPlanDetails.audioMinutes)}), and increases your voice limit from{" "}
                  {currentPlanDetails.maxVoices} to {selectedPlanDetails?.maxVoices || 0}.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={isDowngrade ? "outline" : "default"}
            onClick={handleChangePlan}
            disabled={!activePlan || activePlan === currentPlan}
          >
            {isDowngrade
              ? `Downgrade to ${activePlan}`
              : isUpgrade
                ? `Upgrade to ${activePlan}`
                : `Change to ${activePlan}`}
          </Button>
        </div>
      </div>
    </BaseModal>
  )
}
