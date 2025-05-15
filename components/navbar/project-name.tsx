"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import RenameChatDialog from "@/components/rename-chat-dialog"

interface ProjectNameProps {
  name: string
  projectId?: string
  onRename: (newName: string, projectId?: string) => void
}

export default function ProjectName({ name, projectId, onRename }: ProjectNameProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenDialog = () => {
    setIsDialogOpen(true)
  }

  const handleRename = (chatId: string, newName: string) => {
    console.log(`[ProjectName] Handling rename: ${chatId} to "${newName}"`)
    onRename(newName, chatId)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 px-2 text-sm font-normal hover:bg-transparent"
              onClick={handleOpenDialog}
            >
              <span className="max-w-[200px] truncate">{name}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex items-center gap-1">
              <Pencil className="h-3 w-3" />
              <span>Rename chat</span>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {projectId && (
        <RenameChatDialog
          chatId={projectId}
          currentName={name}
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onRename={handleRename}
        />
      )}
    </>
  )
}
