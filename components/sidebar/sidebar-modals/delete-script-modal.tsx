"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import BaseModal from "@/components/ui/base-modal"

interface DeleteScriptModalProps {
  scriptId: string
  scriptName: string
  isFavorite?: boolean
  isOpen: boolean
  onClose: () => void
  onDelete: (scriptId: string) => void
}

export default function DeleteScriptModal({
  scriptId,
  scriptName,
  isFavorite = false,
  isOpen,
  onClose,
  onDelete,
}: DeleteScriptModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    onDelete(scriptId)
    onClose()
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Delete Script" className="max-w-sm bg-muted border border-border">
      <div className="p-4 space-y-4">
        <p className="text-sm text-foreground">
          Are you sure you want to delete <strong>{scriptName}</strong>?
          {isFavorite && " This script is in your favorites."}
        </p>
        <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={isDeleting} className="bg-background border border-default text-foreground">
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting} className="bg-destructive text-destructive-foreground">
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </BaseModal>
  )
} 