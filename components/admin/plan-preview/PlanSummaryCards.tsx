import { Clock, Calendar, BarChart3 } from "lucide-react"
import { formatAudioTime } from "@/data/pricing-plans"
import { formatTimeCompact } from "../utils/plan-usage-utils"
import { getUsageTextColorClass } from "@/utils/usage-utils"

interface PlanSummaryCardsProps {
  selectedPlan: string
  monthlyMinutes: number
  accumulatedMonths: number
  totalMinutes: number
  actualUsedSeconds: number
  remainingSeconds: number
  usagePercentage: number
}

export default function PlanSummaryCards({
  selectedPlan,
  monthlyMinutes,
  accumulatedMonths,
  totalMinutes,
  actualUsedSeconds,
  remainingSeconds,
  usagePercentage,
}: PlanSummaryCardsProps) {
  return (
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
  )
} 