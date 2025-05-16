"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

interface BetaDealTooltipProps {
  isVisible: boolean
  position: { x: number; y: number }
}

export function BetaDealTooltip({ isVisible, position }: BetaDealTooltipProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  return createPortal(
    <div
      className={`fixed z-[100] w-56 px-3 py-2 bg-popover dark:bg-black border border-border rounded-md text-xs transition-opacity duration-200 ${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: "translate(-50%, 8px)",
        maxWidth: "90vw",
      }}
    >
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Regular price:</span>
          <span className="line-through text-muted-foreground">€75/month</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Beta price:</span>
          <span className="text-foreground font-medium">€50/month</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">You save:</span>
          <span className="text-amber-500 font-medium">€25/month (33%)</span>
        </div>
        <div className="text-[10px] text-muted-foreground mt-1 border-t border-border pt-1">
          Discount applies to both monthly and annual billing during beta.
        </div>
      </div>
    </div>,
    document.body,
  )
}
