"use client"

import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"

interface PulsingWarningProps {
  message: string
  className?: string
}

export default function PulsingWarning({ message, className = "" }: PulsingWarningProps) {
  return (
    <motion.div
      className={`flex items-center gap-2 text-red-500 ${className}`}
      initial={{ opacity: 0.8, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        opacity: { repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 1 },
        scale: { repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 1 },
      }}
    >
      <AlertTriangle className="h-4 w-4" />
      <span className="text-xs">{message}</span>
    </motion.div>
  )
}
