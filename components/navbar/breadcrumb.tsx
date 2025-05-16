"use client"

import { PlusCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import ChatName from "./rename-script"

type PlanTier = "free" | "pro" | "enterprise"

interface BreadcrumbProps {
  projectName: string
  projectId?: string
  onProjectRename: (newName: string, projectId?: string) => void
  onNewChat?: () => void
  userAvatarUrl?: string
  tier?: PlanTier
  usedSeconds?: number
}

export default function Breadcrumb({ projectName, projectId, onProjectRename, onNewChat }: BreadcrumbProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center gap-2">
        <ChatName name={projectName} chatId={projectId} onRename={onProjectRename} />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={onNewChat}>
                <PlusCircle className="h-4 w-4" />
                <span className="sr-only">New session</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>New session</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
