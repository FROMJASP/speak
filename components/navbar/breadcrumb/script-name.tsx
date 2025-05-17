"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import RenameScriptDialog from "../../sidebar/sidebar-modals/rename-script-dialog"

interface ScriptNameProps {
  name: string
  scriptId?: string
  onRename: (newName: string, scriptId?: string) => void
}

export default function ScriptName({ name, scriptId, onRename }: ScriptNameProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenDialog = () => {
    setIsDialogOpen(true)
  }

  const handleRename = (scriptId: string, newName: string) => {
    onRename(newName, scriptId)
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
              <span className="max-w-[200px] truncate">{name || "Untitled Script"}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex items-center gap-1">
              <Pencil className="h-3 w-3" />
              <span>Rename script</span>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {scriptId && (
        <RenameScriptDialog
          scriptId={scriptId}
          currentName={name}
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onRename={handleRename}
        />
      )}
    </>
  );
} 