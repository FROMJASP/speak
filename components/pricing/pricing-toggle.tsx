"use client"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface PricingToggleProps {
  value: "monthly" | "annually"
  onChange: (value: "monthly" | "annually") => void
}

export default function PricingToggle({ value, onChange }: PricingToggleProps) {
  const isAnnual = value === "annually"

  return (
    <div className="flex items-center justify-center space-x-2 mb-6">
      <Label htmlFor="billing-toggle" className={`text-sm ${!isAnnual ? "font-medium" : ""}`}>
        Monthly
      </Label>
      <Switch
        id="billing-toggle"
        checked={isAnnual}
        onCheckedChange={(checked) => onChange(checked ? "annually" : "monthly")}
      />
      <div className="flex items-center">
        <Label htmlFor="billing-toggle" className={`text-sm ${isAnnual ? "font-medium" : ""}`}>
          Annually
        </Label>
        <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-600 border-green-500/20">
          Save 16%
        </Badge>
      </div>
    </div>
  )
}
