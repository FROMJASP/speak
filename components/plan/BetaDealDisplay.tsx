"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { BetaDealBadge } from "./BetaDealBadge"
import { BetaDealTooltip } from "./BetaDealTooltip"

export function BetaDealDisplay() {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const badgeRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (badgeRef.current) {
      const rect = badgeRef.current.getBoundingClientRect()
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.bottom + window.scrollY,
      })
      setTooltipVisible(true)
    }
  }

  const handleMouseLeave = () => {
    setTooltipVisible(false)
  }

  // Handle repositioning on window resize
  useEffect(() => {
    const handleResize = () => {
      if (tooltipVisible && badgeRef.current) {
        const rect = badgeRef.current.getBoundingClientRect()
        setTooltipPosition({
          x: rect.left + rect.width / 2,
          y: rect.bottom + window.scrollY,
        })
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [tooltipVisible])

  return (
    <>
      <BetaDealBadge ref={badgeRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
      <BetaDealTooltip isVisible={tooltipVisible} position={tooltipPosition} />
    </>
  )
}
