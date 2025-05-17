import { formatAudioTime } from "@/utils/time-format"

interface RemainingTimeDisplayProps {
  remainingSeconds: number
  totalMinutes: number
  statusTextColor: string
}

export function RemainingTimeDisplay({ remainingSeconds, totalMinutes, statusTextColor }: RemainingTimeDisplayProps) {
  const formatTimeWithoutSeconds = (seconds: number, includeLeft = true): string => {
    const minutes = Math.floor(seconds / 60)

    if (minutes < 60) {
      return `${minutes}m${includeLeft ? " left" : ""}`
    }

    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    if (remainingMinutes === 0) {
      return `${hours}h${includeLeft ? " left" : ""}`
    }

    return `${hours}h ${remainingMinutes}m${includeLeft ? " left" : ""}`
  }

  return (
    <div className="flex justify-between gap-2 mb-1">
      <span className="text-xs text-muted-foreground">Audio usage</span>
      <span>
        <span className={`text-xs font-medium ${statusTextColor}`}>{formatTimeWithoutSeconds(remainingSeconds)}</span>
        <span className="text-xs text-muted-foreground"> / {formatAudioTime(totalMinutes)}</span>
      </span>
    </div>
  )
}
