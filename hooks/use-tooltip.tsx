"use client"

import { useState, useRef, useEffect } from "react"

interface TooltipPosition {
  x: number
  y: number
}

interface UseTooltipOptions {
  offset?: { x: number; y: number }
}

export function useTooltip<T extends HTMLElement>(options: UseTooltipOptions = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState<TooltipPosition>({ x: 0, y: 0 })
  const targetRef = useRef<T>(null)

  const { offset = { x: 0, y: 8 } } = options

  const updatePosition = () => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect()
      setPosition({
        x: rect.left + rect.width / 2 + offset.x,
        y: rect.bottom + window.scrollY + offset.y,
      })
    }
  }

  const showTooltip = () => {
    updatePosition()
    setIsVisible(true)
  }

  const hideTooltip = () => {
    setIsVisible(false)
  }

  useEffect(() => {
    const handleResize = () => {
      if (isVisible) {
        updatePosition()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [isVisible])

  return {
    targetRef,
    isVisible,
    position,
    showTooltip,
    hideTooltip,
  }
}
