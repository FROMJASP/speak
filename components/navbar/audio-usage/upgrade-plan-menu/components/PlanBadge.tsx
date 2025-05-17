interface PlanBadgeProps {
  tier: string
  statusColor: string
}

export function PlanBadge({ tier, statusColor }: PlanBadgeProps) {
  return (
    <div className="pl-3 pr-3 py-1.5 flex items-center relative ml-0.5">
      <div className="absolute inset-0 bg-muted border border-default dark:border-default rounded-md"></div>
      <div className="relative z-10 flex items-center gap-1.5">
        <div className={`w-2 h-2 rounded-full ${statusColor} animate-pulse`}></div>
        <span className="text-xs font-medium">{tier} plan</span>
      </div>
    </div>
  )
}
