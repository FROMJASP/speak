"use client"

import type React from "react"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"
import { forwardRef } from "react"

interface BetaDealBadgeProps {
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave: () => void
}

export const BetaDealBadge = forwardRef<HTMLDivElement, BetaDealBadgeProps>(({ onMouseEnter, onMouseLeave }, ref) => {
  return (
    <div ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="inline-block">
      <Badge className="bg-amber-500 hover:bg-amber-600 text-[10px] cursor-help flex items-center gap-1">
        Beta Deal <Info className="h-3 w-3" />
      </Badge>
    </div>
  )
})

BetaDealBadge.displayName = "BetaDealBadge"
