"use client"
import { AlertTriangle, ArrowUpRight, CheckCircle2, Calendar, AlertCircle } from "lucide-react"

interface StatusMessageProps {
  message: string
  type: "warning" | "info" | "success" | "calendar" | "alert"
  className?: string
  hasLink?: boolean
  linkText?: string
  onLinkClick?: () => void
}

export function StatusMessage({
  message,
  type,
  className = "",
  hasLink = false,
  linkText = "contact us",
  onLinkClick,
}: StatusMessageProps) {
  const getIcon = () => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
      case "info":
        return <ArrowUpRight className="h-3 w-3 mt-0.5 flex-shrink-0" />
      case "success":
        return <CheckCircle2 className="h-3 w-3 mt-0.5 flex-shrink-0" />
      case "calendar":
        return <Calendar className="h-3 w-3 mt-0.5 flex-shrink-0" />
      case "alert":
        return <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
    }
  }

  const getColorClass = () => {
    switch (type) {
      case "warning":
        return "text-amber-500"
      case "info":
        return "text-muted-foreground"
      case "success":
        return "text-green-500"
      case "calendar":
        return "text-amber-500"
      case "alert":
        return "text-red-500"
    }
  }

  return (
    <div className={`text-xs flex items-start gap-1.5 ${getColorClass()} ${className}`}>
      {getIcon()}
      <p>
        {hasLink ? (
          <>
            {message}{" "}
            <a
              href="#"
              className="text-blue-600 underline hover:text-blue-800"
              onClick={(e) => {
                e.preventDefault()
                if (onLinkClick) onLinkClick()
              }}
            >
              {linkText}
            </a>
          </>
        ) : (
          message
        )}
      </p>
    </div>
  )
}
