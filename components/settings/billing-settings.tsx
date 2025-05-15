"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, CreditCard, Download, ExternalLink } from "lucide-react"
import { usePlan } from "@/components/admin/plan-context"
import { pricingPlans, formatAudioTime } from "@/data/pricing-plans"

export default function BillingSettings() {
  const { currentPlan, usedSeconds } = usePlan()

  // Get current plan details
  const plan = pricingPlans.find((p) => p.tier === currentPlan) || pricingPlans[0]
  const totalMinutes = plan.audioMinutes
  const totalSeconds = totalMinutes * 60
  const remainingSeconds = totalSeconds - usedSeconds
  const usagePercentage = (usedSeconds / totalSeconds) * 100

  // Format time for display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`
    }
    return `${minutes}m`
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Current Plan</h2>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{currentPlan} Plan</CardTitle>
                <CardDescription>{plan.priceMonthly > 0 ? `€${plan.priceMonthly}/month` : "Free"}</CardDescription>
              </div>
              <Badge variant={currentPlan === "Free" ? "outline" : "default"}>
                {currentPlan === "Free" ? "Current" : "Active"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Audio time usage</span>
                <span>
                  {formatTime(remainingSeconds)} left of {formatAudioTime(totalMinutes)}
                </span>
              </div>
              <Progress value={usagePercentage} className="h-2" />
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Renews on June 15, 2025</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download Invoice
            </Button>
            <Button className="gap-2">Upgrade Plan</Button>
          </CardFooter>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4">Payment Method</h2>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-muted p-2 rounded">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/2026</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Change
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4">Billing History</h2>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{currentPlan} Plan - Monthly</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(2025, 4 - i, 15).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">€{plan.priceMonthly}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
