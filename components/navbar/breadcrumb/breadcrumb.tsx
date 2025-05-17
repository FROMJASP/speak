"use client"

import { PlusCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { PlanTier } from "@/data/pricing-plans"
import ScriptName from "./script-name"

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
    <div className="flex items-center space-x-2 ml-4">
      <button
        onClick={onNewChat}
        className="flex items-center hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded-md"
        aria-label="New Chat"
      >
        <img src="/favicon.svg" alt="SPEAK Logo" className="h-5 w-5" />
      </button>
      <div className="text-[#E5DED3] dark:text-[#313131] text-lg rotate-12">/</div>
      <div className="flex items-center gap-2">
        <ScriptName name={projectName} chatId={projectId} onRename={onProjectRename} />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={onNewChat}>
                <PlusCircle className="h-4 w-4" />
                <span className="sr-only">New script</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>New script</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
