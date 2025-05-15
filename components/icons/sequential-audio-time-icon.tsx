"use client"

import { motion } from "framer-motion"

interface SequentialAudioTimeIconProps {
  className?: string
  percentage?: number
}

export default function SequentialAudioTimeIcon({
  className = "h-4 w-4",
  percentage = 100,
}: SequentialAudioTimeIconProps) {
  // Calculate the fill percentage for the wave path
  const wavePercentage = Math.max(0, Math.min(100, percentage)) / 100

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Gradient for the microphone */}
        <linearGradient id="micGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#326BF5" />
          <stop offset="100%" stopColor="#57BBF9" />
        </linearGradient>

        {/* Gradient for the sound waves */}
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94F6FC" />
          <stop offset="100%" stopColor="#57BBF9" />
        </linearGradient>

        {/* Subtle glow filter */}
        <filter id="audioTimeFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -6" result="glow" />
          <feBlend in="SourceGraphic" in2="glow" mode="normal" />
        </filter>

        {/* Clip path for the wave animation */}
        <clipPath id="waveClip">
          <rect x="0" y="0" width={24 * wavePercentage} height="24" />
        </clipPath>
      </defs>

      <g filter="url(#audioTimeFilter)">
        {/* Microphone base */}
        <path
          d="M12 14C13.66 14 15 12.66 15 11V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14Z"
          fill="url(#micGradient)"
        />

        {/* Sound waves - clipped based on percentage */}
        <g clipPath="url(#waveClip)">
          <motion.path
            d="M17 11C17 14.53 14.39 17.44 11 17.93V21H13C13.55 21 14 21.45 14 22C14 22.55 13.55 23 13 23H11H7C6.45 23 6 22.55 6 22C6 21.45 6.45 21 7 21H9V17.93C5.61 17.44 3 14.53 3 11H5C5 13.76 7.24 16 10 16H12H14C16.76 16 19 13.76 19 11H21C21 11.34 20.97 11.67 20.92 12"
            fill="url(#waveGradient)"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </g>

        {/* Sound waves background (empty/unfilled portion) */}
        <path
          d="M17 11C17 14.53 14.39 17.44 11 17.93V21H13C13.55 21 14 21.45 14 22C14 22.55 13.55 23 13 23H11H7C6.45 23 6 22.55 6 22C6 21.45 6.45 21 7 21H9V17.93C5.61 17.44 3 14.53 3 11H5C5 13.76 7.24 16 10 16H12H14C16.76 16 19 13.76 19 11H21C21 11.34 20.97 11.67 20.92 12"
          fill="#2A2A2A"
          opacity="0.3"
        />
      </g>
    </svg>
  )
}
