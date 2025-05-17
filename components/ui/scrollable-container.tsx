"use client"

import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface ScrollableContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  fadeTop?: boolean
  fadeBottom?: boolean
  children: React.ReactNode
}

const ScrollableContainer = forwardRef<HTMLDivElement, ScrollableContainerProps>(
  ({ className, fadeTop, fadeBottom, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-y-auto custom-scrollbar bg-background",
          {
            "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-12 after:bg-gradient-to-t after:from-transparent after:to-transparent after:pointer-events-none":
              fadeBottom,
            "before:absolute before:top-0 before:left-0 before:right-0 before:h-12 before:bg-gradient-to-b before:from-transparent before:to-transparent before:pointer-events-none":
              fadeTop,
          },
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

ScrollableContainer.displayName = "ScrollableContainer"

export default ScrollableContainer
