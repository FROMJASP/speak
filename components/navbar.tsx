"use client"
import Breadcrumb from "@/components/navbar/breadcrumb"
import UserDropdown from "./user-dropdown"
import { usePlan } from "./admin/plan-context"
import { PlanUpgradeContainer } from "./plan/PlanUpgradeContainer"
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
    <header className="h-16 px-4 flex items-center justify-between bg-background z-10">
      <div className="flex items-center gap-3">
        <Logo onNewChat={handleNewChat} />
        <div className="text-muted-foreground">/</div>
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
        <PlanUpgradeContainer usedSeconds={usedSeconds} tier={currentPlan} />
        <UserDropdown avatarUrl={userAvatarUrl} />
      </div>
    </header>
  )
}

interface LogoProps {
  onNewChat?: () => void
}

function Logo({ onNewChat }: LogoProps) {
  return (
    <button
      onClick={onNewChat}
      className="flex items-center hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded-md"
      aria-label="New Chat"
    >
      <img src="/speak-logo.svg" alt="SPEAK Logo" className="h-8" />
    </button>
  )
}
