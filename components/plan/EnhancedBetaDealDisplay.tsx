"use client"

import { BetaDealBadge } from "./BetaDealBadge"
import { BetaDealTooltip } from "./BetaDealTooltip"
import { useTooltip } from "@/hooks/use-tooltip"

export function EnhancedBetaDealDisplay() {
  const { targetRef, isVisible, position, showTooltip, hideTooltip } = useTooltip<HTMLDivElement>()

  return (
    <>
      <BetaDealBadge ref={targetRef} onMouseEnter={() => showTooltip()} onMouseLeave={() => hideTooltip()} />
      <BetaDealTooltip isVisible={isVisible} position={position} />
    </>
  )
}
