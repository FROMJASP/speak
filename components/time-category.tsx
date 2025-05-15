"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TimeCategoryProps {
  title: string
  count?: number
  children: React.ReactNode
}

export default function TimeCategory({ title, count, children }: TimeCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="mb-2">
      <div className="w-full px-3 py-1.5 text-xs font-medium text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>{title}</span>
          {count !== undefined && <span className="text-xs text-muted-foreground">{count}</span>}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
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
