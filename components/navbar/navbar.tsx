"use client"
import Breadcrumb from "@/components/navbar/breadcrumb/breadcrumb"
import UserDropdown from "@/components/navbar/user-menu-via-avatar/user-dropdown"
import { usePlan } from "@/components/navbar/user-menu-via-avatar/admin/plan-context"
import { AudioUsageNavbar } from "@/components/navbar/audio-usage/audio-usage"
import { useRouter } from "next/navigation"

interface NavbarProps {
  projectName: string
  projectId?: string
  onProjectRename?: (newName: string, projectId?: string) => void
  onNewChat?: () => void
}

export default function Navbar({ projectName, projectId, onProjectRename, onNewChat }: NavbarProps) {
  const userAvatarUrl = "/user-avatar.jpeg"
  const { currentPlan, usedSeconds } = usePlan()
  const router = useRouter()

  const handleChatRename = (newName: string, id?: string) => {
    if (onProjectRename) {
      console.log(`[Navbar] Handling rename: ${id || projectId || "unknown"} to "${newName}"`)
      onProjectRename(newName, id || projectId)
    }
  }

  const handleNewChat = () => {
    if (onNewChat) {
      onNewChat()
    } else {
      // If no onNewChat function is provided, navigate to the home page
      router.push("/")
    }
  }

  return (
    <header className="h-10 px-3 flex items-center justify-between bg-background z-10 pt-2">
      <div className="flex items-center gap-3">
        <Breadcrumb
          projectName={projectName}
          projectId={projectId}
          onProjectRename={handleChatRename}
          onNewChat={handleNewChat}
          userAvatarUrl={userAvatarUrl}
          tier={currentPlan}
          usedSeconds={usedSeconds}
        />
      </div>

      <div className="flex items-center space-x-4">
        <AudioUsageNavbar />
        <UserDropdown avatarUrl={userAvatarUrl} />
      </div>
    </header>
  )
}
