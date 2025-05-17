"use client"

import { useState } from "react"
import { usePlan } from "@/components/navbar/user-menu-via-avatar/admin/plan-context"
import { pricingPlans, type PricingPlan } from "@/data/pricing-plans"
import { formatAudioTime } from "@/utils/time-format"
import PricingToggle from "@/components/pricing/pricing-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Info, Users, AlertTriangle, Download, MessageSquare, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function PricingPage() {
  const { currentPlan } = usePlan()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly")
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("plans")

  // Calculate usage percentage
  const currentPlanData = pricingPlans.find((plan) => plan.tier === currentPlan) || pricingPlans[0]
  const totalMinutes = currentPlanData.audioMinutes
  const usedMinutes = Math.round(totalMinutes * 0.9) // Simulating 90% usage
  const remainingMinutes = totalMinutes - usedMinutes
  const usagePercentage = (usedMinutes / totalMinutes) * 100

  // Get progress color based on usage
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-red-500"
    if (percentage >= 50) return "bg-amber-500"
    return "bg-emerald-500"
  }

  // Get simulated usage for hovered plan
  const getSimulatedUsage = (plan: PricingPlan) => {
    if (!plan) return { percentage: 0, color: "bg-emerald-500" }

    const simulatedPercentage = (usedMinutes / plan.audioMinutes) * 100
    const cappedPercentage = Math.min(simulatedPercentage, 100)

    return {
      percentage: cappedPercentage,
      color: getProgressColor(cappedPercentage),
      remaining: plan.audioMinutes - usedMinutes,
    }
  }

  // Current plan usage
  const currentUsage = {
    percentage: usagePercentage,
    color: getProgressColor(usagePercentage),
    remaining: remainingMinutes,
  }

  // Get usage for displayed plan (either hovered or current)
  const getDisplayedUsage = (plan: PricingPlan) => {
    if (hoveredPlan === plan.tier) {
      return getSimulatedUsage(plan)
    }
    if (plan.tier === currentPlan) {
      return currentUsage
    }
    return { percentage: 0, color: "bg-emerald-500", remaining: plan.audioMinutes }
  }

  return (
    <div className="container py-8 max-w-6xl">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Pricing</h1>
          <p className="text-muted-foreground">
            Choose the plan that best fits your needs. All plans include access to our core features.
          </p>
        </div>

        <Tabs defaultValue="plans" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="plans" className="text-base py-3">
              Plans & Pricing
            </TabsTrigger>
            <TabsTrigger value="info" className="text-base py-3">
              How Our Pricing Works
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="space-y-8">
            {/* Current Plan Summary */}
            <div className="bg-secondary/30 rounded-lg p-6 border border-border">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Your Current Plan</h2>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-medium">
                      {currentPlan}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {billingCycle === "monthly" ? "Monthly billing" : "Annual billing"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 min-w-[200px]">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Audio usage</span>
                    <span className={usagePercentage > 80 ? "text-red-500 font-medium" : ""}>
                      {formatAudioTime(remainingMinutes)} left / {formatAudioTime(totalMinutes)}
                    </span>
                  </div>
                  <Progress
                    value={usagePercentage}
                    className="h-2"
                    indicatorClassName={getProgressColor(usagePercentage)}
                  />
                </div>
              </div>
            </div>

            {/* Billing Toggle */}
            <div className="flex justify-center">
              <PricingToggle value={billingCycle} onChange={setBillingCycle} />
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {pricingPlans.map((plan) => {
                const isCurrentPlan = plan.tier === currentPlan
                const isHovered = hoveredPlan === plan.tier
                const displayedUsage = getDisplayedUsage(plan)
                const price = billingCycle === "monthly" ? plan.priceMonthly : plan.priceAnnually

                return (
                  <div
                    key={plan.tier}
                    className={cn(
                      "border rounded-lg overflow-hidden transition-all duration-200",
                      isCurrentPlan ? "border-primary ring-1 ring-primary" : "border-border",
                      isHovered ? "shadow-md" : "",
                    )}
                    onMouseEnter={() => setHoveredPlan(plan.tier)}
                    onMouseLeave={() => setHoveredPlan(null)}
                  >
                    <div className="p-5 flex flex-col h-full">
                      {/* Plan Header */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-lg">{plan.tier}</h3>
                          {plan.popular && <Badge className="bg-primary text-white border-none">Popular</Badge>}
                          {plan.betaDiscount && (
                            <Badge className="bg-amber-500 text-white border-none">Beta Deal</Badge>
                          )}
                          {isCurrentPlan && (
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                              Current
                            </Badge>
                          )}
                        </div>
                        <div className="text-2xl font-bold">€{price}</div>
                        <div className="text-sm text-muted-foreground">
                          {billingCycle === "annually" && plan.priceAnnually > 0
                            ? `€${Math.round(plan.priceAnnually / 12)} per month, billed annually`
                            : "per month"}
                        </div>
                      </div>

                      {/* Audio Usage */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Audio usage</span>
                          <span className={displayedUsage.percentage > 80 ? "text-red-500 font-medium" : ""}>
                            {formatAudioTime(displayedUsage.remaining)} left / {formatAudioTime(plan.audioMinutes)}
                          </span>
                        </div>
                        <Progress
                          value={displayedUsage.percentage}
                          className="h-2"
                          indicatorClassName={displayedUsage.color}
                        />
                        {isHovered && !isCurrentPlan && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {displayedUsage.percentage > 100
                              ? "Your current usage exceeds this plan's limit"
                              : "Simulated usage based on your current consumption"}
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      <div className="space-y-3 flex-grow">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Up to <strong>{plan.maxVoices} voices</strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-emerald-500" />
                          <span className="text-sm">{plan.usage} usage</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-emerald-500" />
                          <span className="text-sm">{plan.downloadQuality} quality</span>
                        </div>
                        {plan.apiAccess && (
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-emerald-500" />
                            <span className="text-sm">API access</span>
                          </div>
                        )}
                        {plan.experimental && (
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-amber-500" />
                            <span className="text-sm">Experimental models</span>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <div className="mt-5">
                        <Button
                          className="w-full"
                          variant={isCurrentPlan ? "outline" : "default"}
                          disabled={isCurrentPlan}
                        >
                          {isCurrentPlan ? "Current Plan" : "Upgrade"}
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="info" className="space-y-8">
            {/* How Our Pricing Works Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Audio Calculation Section */}
              <div className="lg:col-span-1 space-y-6">
                <div className="border-l-4 border-primary pl-4 py-1">
                  <h3 className="text-xl font-semibold mb-3">How we calculate your audio usage</h3>
                </div>

                <p className="text-muted-foreground text-base leading-relaxed">
                  To make things fair and encourage exploration, we charge gently for audio generation:
                </p>

                <ul className="space-y-3 list-disc pl-6 mt-4">
                  <li className="text-base leading-relaxed">A human typically speaks around 150 words per minute.</li>
                  <li className="text-base leading-relaxed">
                    <span className="font-medium text-primary">
                      But we only charge based on 300 words per minute—meaning you get twice as much output per minute.
                    </span>
                  </li>
                </ul>

                <div className="bg-muted/30 p-5 rounded-lg mt-5 border border-muted">
                  <div className="flex items-center mb-3">
                    <Info className="h-5 w-5 mr-2 text-primary" />
                    <h4 className="font-semibold text-lg">Examples:</h4>
                  </div>
                  <ul className="space-y-2 ml-7">
                    <li className="text-base">
                      <span className="font-medium">150-word script:</span> Only counts as 30 seconds of usage
                    </li>
                    <li className="text-base">
                      <span className="font-medium">300-word script:</span> Counts as 1 minute
                    </li>
                    <li className="text-base">
                      <span className="font-medium">600-word script:</span> Counts as 2 minutes
                    </li>
                  </ul>
                  <p className="mt-4 text-sm text-muted-foreground italic">
                    This way, you get more value from your plan, especially if you're tweaking and testing different
                    scripts.
                  </p>
                </div>

                <div className="my-6 border-t border-border"></div>

                <div className="border-l-4 border-primary pl-4 py-1">
                  <h3 className="text-xl font-semibold mb-3">Regeneration & Edits</h3>
                </div>

                <p className="text-muted-foreground text-base leading-relaxed">
                  When you want to regenerate part of your script—say a sentence or a word—we currently regenerate the
                  full script due to technical limitations. However, we will soon release a feature called 'infilling'
                  which allows you to only regenerate a specific word or sentence. In the mean time:
                </p>

                <div className="mt-4">
                  <ul className="space-y-3 list-disc pl-6">
                    <li className="text-base leading-relaxed flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>We only charge for the words you selected to regenerate, not the full script.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Voice Designer Section */}
              <div className="lg:col-span-1 space-y-6">
                {/* Voice Creation Introduction */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
                  <div className="flex items-start">
                    <Sparkles className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Designing Voices</h3>
                      <p className="text-base leading-relaxed">
                        Designing voices is a core part of your experience — and good news: At least till the beta ends
                        we don't charge you for designing voices. Whether you're experimenting with different tones,
                        accents, or styles, you're free to design and refine your voices without it affecting your audio
                        usage.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Voice Limits Table */}
                <div className="space-y-5">
                  <div className="border-l-4 border-primary pl-4 py-1">
                    <h3 className="text-xl font-semibold mb-3">Voice Limits</h3>
                  </div>

                  <p className="text-muted-foreground text-base leading-relaxed mb-6">
                    Each subscription plan comes with a set number of voices you can create and save:
                  </p>

                  <div className="rounded-lg border overflow-hidden shadow-sm">
                    <div className="grid grid-cols-2 bg-muted/70 p-4 text-sm font-semibold">
                      <div>Plan</div>
                      <div>Max Voices</div>
                    </div>
                    <div className="divide-y">
                      {pricingPlans.map((plan) => (
                        <div
                          key={plan.tier}
                          className={cn(
                            "grid grid-cols-2 p-4 text-base hover:bg-muted/20 transition-colors",
                            plan.tier === currentPlan ? "bg-primary/5" : "",
                          )}
                        >
                          <div className="font-medium">{plan.tier}</div>
                          <div className="flex items-center">
                            <span className="font-medium">{plan.maxVoices}</span>
                            <span className="ml-1">voices</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Voice Deletion Warning */}
                <div className="space-y-5">
                  <div className="border-l-4 border-amber-500 pl-4 py-1">
                    <h3 className="text-xl font-semibold mb-3">Deleting Voices</h3>
                  </div>

                  <p className="text-base leading-relaxed">
                    Once you've hit the limit for your plan, you'll need to delete an existing voice before creating a
                    new one.
                  </p>

                  <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-5 mt-4">
                    <div className="flex items-start">
                      <AlertTriangle className="h-6 w-6 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-amber-800 dark:text-amber-400 mb-2">Important</h4>
                        <p className="text-amber-800 dark:text-amber-400 text-base">
                          When you delete a voice, we also delete all past sessions and audio history that were made
                          with that voice.
                        </p>
                        <div className="flex items-center mt-3 text-amber-700 dark:text-amber-300">
                          <Download className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">Make sure to download anything important first!</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Extra Time & Upgrades Section */}
              <div className="lg:col-span-1 space-y-6">
                <div className="border-l-4 border-primary pl-4 py-1">
                  <h3 className="text-xl font-semibold mb-3">Buying Extra Audio Time</h3>
                </div>

                <p className="text-muted-foreground text-base leading-relaxed mb-5">
                  Paid users can buy extra audio time without upgrading to a higher plan:
                </p>

                <div className="grid grid-cols-1 gap-4 mt-4">
                  <div className="bg-muted/20 p-5 rounded-lg border border-muted hover:bg-muted/30 transition-colors">
                    <h4 className="font-medium text-lg mb-3">Starter & Creator Plans</h4>
                    <p className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>30-minute chunks for €5</span>
                    </p>
                  </div>

                  <div className="bg-muted/20 p-5 rounded-lg border border-muted hover:bg-muted/30 transition-colors">
                    <h4 className="font-medium text-lg mb-3">Professional & Company Plans</h4>
                    <div className="space-y-2">
                      <p className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>30-minute chunks for €4</span>
                      </p>
                      <p className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>1-hour chunks for €7</span>
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-base leading-relaxed">
                  Buying extra time is slightly more expensive for Starter and Creator users, making it more appealing
                  to upgrade instead.
                </p>

                <div className="my-6 border-t border-border"></div>

                <div className="border-l-4 border-primary pl-4 py-1">
                  <h3 className="text-xl font-semibold mb-3">Upgrading Mid-Subscription</h3>
                </div>

                <p className="text-muted-foreground text-base leading-relaxed mb-5">
                  If you're on an annual plan and want to upgrade mid-year (e.g., from Creator to Professional):
                </p>

                <ul className="space-y-4 mt-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-base leading-relaxed">
                      You'll pay a pro-rated fee based on your remaining time.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-base leading-relaxed">
                      Your new audio quota and voice limit apply immediately.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-base leading-relaxed">
                      Unused time from the previous plan doesn't carry over—you start fresh with the new plan's limits.
                    </span>
                  </li>
                </ul>

                {/* Coming Soon */}
                <div className="bg-muted/20 p-5 rounded-lg border border-muted mt-6">
                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-lg mb-2">Coming Soon</h4>
                      <p className="text-base text-muted-foreground">
                        We're exploring the option to let users buy additional voice slots in the future without
                        upgrading their entire plan. If that's something you'd like, let us know — we're listening!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
