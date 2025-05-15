import { User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
  src?: string
  size?: "sm" | "md" | "lg"
}

export default function UserAvatar({ src, size = "md" }: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-7 w-7",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }

  return (
    <Avatar
      className={`${sizeClasses[size]} cursor-pointer hover:opacity-80 transition-opacity border border-border overflow-hidden`}
    >
      <AvatarImage src={src || "/placeholder.svg"} alt="User" />
      <AvatarFallback>
        <User className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
      </AvatarFallback>
    </Avatar>
  )
}
