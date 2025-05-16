"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectCategoryProps {
  title: string
  defaultExpanded?: boolean
  isExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  children: React.ReactNode
  count?: number
}

export default function ProjectCategory({
  title,
  defaultExpanded = false,
  isExpanded: controlledExpanded,
  onExpandedChange,
  children,
  count,
}: ProjectCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  // Handle controlled state
  const expanded = controlledExpanded !== undefined ? controlledExpanded : isExpanded

  // Update internal state when controlled prop changes
  useEffect(() => {
    if (controlledExpanded !== undefined) {
      setIsExpanded(controlledExpanded)
    }
  }, [controlledExpanded])

  const toggleExpanded = () => {
    const newExpanded = !expanded
    setIsExpanded(newExpanded)
    if (onExpandedChange) {
      onExpandedChange(newExpanded)
    }
  }

  return (
    <div className="mb-2">
      <button
        onClick={toggleExpanded}
        className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <div className="flex items-center">
          <ChevronRight className={cn("h-3 w-3 mr-1 transition-transform", expanded ? "rotate-90" : "")} />
          <span>{title}</span>
        </div>
        {count !== undefined && (
          <span className="bg-secondary text-secondary-foreground text-xs rounded-full px-2 py-0.5 min-w-[1.5rem] text-center">
            {count}
          </span>
        )}
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
