"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import BaseModal from "@/components/ui/base-modal"

interface RenameChatDialogProps {
  chatId: string
  currentName: string
  isOpen: boolean
  onClose: () => void
  onRename: (chatId: string, newName: string) => void
}

export default function RenameChatDialog({ chatId, currentName, isOpen, onClose, onRename }: RenameChatDialogProps) {
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
    onRename(chatId, name.trim())
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Rename Script" className="max-w-sm">
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div className="space-y-2">
          <label htmlFor="script-name" className="text-sm font-medium">
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
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={!name.trim() || isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </BaseModal>
  )
}
