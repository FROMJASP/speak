"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ResizableDividerProps {
  onResize: (newPosition: number) => void
  initialPosition: number
  minLeftWidth?: number
  minRightWidth?: number
  orientation?: "vertical" | "horizontal"
}

export default function ResizableDivider({
  onResize,
  initialPosition,
  minLeftWidth = 10,
  minRightWidth = 10,
  orientation = "vertical",
}: ResizableDividerProps) {
  const [isDragging, setIsDragging] = useState(false)
  const dividerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const container = dividerRef.current?.parentElement
      if (!container) return

      if (orientation === "vertical") {
        const containerRect = container.getBoundingClientRect()
        const containerWidth = containerRect.width
        const mouseX = e.clientX - containerRect.left

        // Calculate percentage position
        let newPosition = (mouseX / containerWidth) * 100

        // Apply constraints
        newPosition = Math.max(minLeftWidth, Math.min(100 - minRightWidth, newPosition))

        onResize(newPosition)
      } else {
        const containerRect = container.getBoundingClientRect()
        const containerHeight = containerRect.height
        const mouseY = e.clientY - containerRect.top

        // Calculate percentage position
        let newPosition = (mouseY / containerHeight) * 100

        // Apply constraints
        newPosition = Math.max(minLeftWidth, Math.min(100 - minRightWidth, newPosition))

        onResize(newPosition)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, minLeftWidth, minRightWidth, onResize, orientation])

  return (
    <div
      ref={dividerRef}
      className={cn(
        "flex items-center justify-center bg-border/10 hover:bg-border/20 transition-colors",
        isDragging ? "bg-border/30" : "",
        orientation === "vertical" ? "w-1 h-full cursor-col-resize" : "h-1 w-full cursor-row-resize",
      )}
      onMouseDown={handleMouseDown}
    >
      <div className={cn("bg-border/40", orientation === "vertical" ? "h-8 w-[2px]" : "w-8 h-[2px]")} />
    </div>
  )
}
