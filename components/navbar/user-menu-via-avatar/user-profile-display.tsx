"use client"

import { useUser } from "@/contexts/user-context"
import UserAvatar from "./user-avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export default function UserProfileDisplay() {
  const { user, isLoading } = useUser()

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-3 w-[100px]" />
        </div>
      </div>
    )
  }

  if (!user) {
    return <div>No user data available</div>
  }

  return (
    <div className="flex items-start gap-3">
      <UserAvatar src={user.avatarUrl} size="lg" />
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-foreground">
            {user.firstName} {user.lastName}
          </h3>
          <Badge variant="outline" className="text-xs bg-muted text-foreground">
            {user.plan}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">{user.email}</p>
        {user.bio && <p className="text-sm mt-1 text-foreground">{user.bio}</p>}
      </div>
    </div>
  )
}
