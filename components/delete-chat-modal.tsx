"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import BaseModal from "@/components/ui/base-modal"

interface DeleteChatModalProps {
  chatId: string
  chatName: string
  isFavorite?: boolean
  isOpen: boolean
  onClose: () => void
  onDelete: (chatId: string) => void
}

export default function DeleteChatModal({
  chatId,
  chatName,
  isFavorite = false,
  isOpen,
  onClose,
  onDelete,
}: DeleteChatModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    onDelete(chatId)
    onClose()
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Delete Session" className="max-w-sm">
      <div className="p-4 space-y-4">
        <p className="text-sm">
          Are you sure you want to delete <strong>{chatName}</strong>?
          {isFavorite && " This session is in your favorites."}
        </p>
        <p className="text-sm text-muted-foreground">This action cannot be undone.</p>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </BaseModal>
  )
}
