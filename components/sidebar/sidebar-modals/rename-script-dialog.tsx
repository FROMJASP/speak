"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import BaseModal from "@/components/ui/base-modal"

interface RenameScriptDialogProps {
  scriptId: string
  currentName: string
  isOpen: boolean
  onClose: () => void
  onRename: (scriptId: string, newName: string) => void
}

export default function RenameScriptDialog({ scriptId, currentName, isOpen, onClose, onRename }: RenameScriptDialogProps) {
  const [name, setName] = useState(currentName)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset name when dialog opens
  useEffect(() => {
    if (isOpen) {
      setName(currentName)
      setIsSubmitting(false)
    }
  }, [isOpen, currentName])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setIsSubmitting(true)
    onRename(scriptId, name.trim())
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Rename Script" className="max-w-sm bg-background border border-border">
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div className="space-y-2">
          <label htmlFor="script-name" className="text-sm font-medium text-foreground">
            Script Name
          </label>
          <Input
            id="script-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter script name"
            autoFocus={true}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting} className="bg-background border border-default text-foreground">
            Cancel
          </Button>
          <Button type="submit" disabled={!name.trim() || isSubmitting} className="bg-muted text-foreground">
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </BaseModal>
  )
} 