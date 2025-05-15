interface PlanBadgeProps {
  tier: string
  statusColor: string
}

export function PlanBadge({ tier, statusColor }: PlanBadgeProps) {
  return (
    <div className="pl-3 pr-3 py-1.5 flex items-center relative ml-0.5">
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-secondary/40 rounded-l-md"></div>
      <div className="relative z-10 flex items-center gap-1.5">
        <div className={`w-2 h-2 rounded-full ${statusColor} animate-pulse`}></div>
        <span className="text-xs font-medium">{tier}</span>
      </div>
    </div>
  )
}
