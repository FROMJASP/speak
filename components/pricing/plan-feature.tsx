import type React from "react"
import { Check, X } from "lucide-react"

interface PlanFeatureProps {
  label: string
  value: string | boolean | React.ReactNode
}

export default function PlanFeature({ label, value }: PlanFeatureProps) {
  return (
    <div className="flex justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="font-medium">
        {typeof value === "boolean" ? (
          value ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <X className="h-5 w-5 text-red-500" />
          )
        ) : (
          value
        )}
      </div>
    </div>
  )
}
