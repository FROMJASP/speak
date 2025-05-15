import { Progress } from "@/components/ui/progress"

interface AudioUsageBarProps {
  usagePercentage: number
  statusColor: string
}

export function AudioUsageBar({ usagePercentage, statusColor }: AudioUsageBarProps) {
  return <Progress value={usagePercentage} className="h-1.5 w-full" indicatorClassName={statusColor} />
}
