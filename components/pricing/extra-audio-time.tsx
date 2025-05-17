import { PlusCircle } from "lucide-react"
import { formatAudioTimeExtra } from "@/utils/time-format"

interface ExtraAudioTimeProps {
  minutes: number
  className?: string
  iconClassName?: string
  textClassName?: string
}

export default function ExtraAudioTime({
  minutes,
  className = "",
  iconClassName = "",
  textClassName = "",
}: ExtraAudioTimeProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <PlusCircle className={`h-3.5 w-3.5 text-primary ${iconClassName}`} />
      <span className={`${textClassName}`}>{formatAudioTimeExtra(minutes)} audio per month</span>
    </div>
  )
}
