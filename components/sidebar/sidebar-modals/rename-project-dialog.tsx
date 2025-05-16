"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

interface RenameProjectDialogProps {
  projectId: string
  currentName: string
  isOpen: boolean
  onClose: () => void
  onRename: (projectId: string, newName: string) => void
}

export default function RenameProjectDialog({
  projectId,
  currentName,
  isOpen,
  onClose,
  onRename,
}: RenameProjectDialogProps) {
  const [name, setName] = useState(currentName)
  const [error, setError] = useState("")
  const { toast } = useToast()

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      setName(currentName)
      setError("")
    }
  }, [isOpen, currentName])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate
    if (!name.trim()) {
      setError("Chat name cannot be empty")
      return
    }

    console.log(`[RenameProjectDialog] Renaming project ${projectId} to "${name.trim()}"`)

    // Submit
    onRename(projectId, name.trim())

    // Show toast notification
    toast({
      title: "Chat renamed",
      description: `Chat has been renamed to "${name.trim()}"`,
      duration: 3000,
    })

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Rename Chat</DialogTitle>
            <DialogDescription>Enter a new name for your chat.</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (e.target.value.trim()) setError("")
              }}
              placeholder="Chat name"
              className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <DialogFooter className="flex justify-between sm:justify-between">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
