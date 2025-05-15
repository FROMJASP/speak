"use client"

import { Clock } from "lucide-react"
import { motion } from "framer-motion"

interface AudioTimeIconProps {
  className?: string
}

export default function AudioTimeIcon({ className = "h-4 w-4" }: AudioTimeIconProps) {
  return (
    <div className="relative inline-flex">
      <Clock className={className} />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(148, 246, 252, 0.7), transparent)",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["100% 0%", "-100% 0%"],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
}
