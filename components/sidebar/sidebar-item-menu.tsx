"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { MoreHorizontal, Pencil, Star, Trash } from "lucide-react"
import type { Chat } from "@/types/chat"

interface SidebarItemMenuProps {
  project: Chat
  isFavorite: boolean
  onFavoriteToggle: (project: Chat) => void
  onRename?: (project: Chat) => void
  onDelete?: (project: Chat) => void
}

export default function SidebarItemMenu({
  project,
  isFavorite,
  onFavoriteToggle,
  onRename,
  onDelete,
}: SidebarItemMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  // Handle mounting
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    // Use capture phase to ensure we get the event before other handlers
    document.addEventListener("mousedown", handleClickOutside, true)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true)
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  // Calculate position when menu opens
  const updatePosition = () => {
    if (!triggerRef.current) return

    const rect = triggerRef.current.getBoundingClientRect()
    setPosition({
      top: rect.bottom + window.scrollY,
      left: rect.right + window.scrollX - 10, // Open more to the right
    })
  }

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    updatePosition()
    setIsOpen(!isOpen)
  }

  const handleMenuItemClick = (callback?: (project: Chat) => void) => {
    return (e: React.MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()

      if (callback) {
        callback(project)
      }

      setIsOpen(false)
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        data-dropdown-trigger="true"
        className="h-8 w-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary bg-background border border-default shadow-sm hover:bg-muted transition-colors z-10 relative"
        onClick={handleTriggerClick}
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>

      {mounted &&
        isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-50 bg-background rounded-md shadow-md border border-border min-w-[210px] py-1 overflow-hidden"
            style={{ top: `${position.top}px`, left: `${position.left}px` }}
            role="menu"
          >
            <button
              className="w-full text-left px-3 py-2 text-sm flex items-center text-foreground hover:bg-muted hover:text-primary rounded-sm mx-1 whitespace-nowrap"
              onClick={handleMenuItemClick(onRename)}
              role="menuitem"
            >
              {/*
                BACKEND INTEGRATION: When connected to the backend, implement the rename script API call here.
                The 'onRename' callback should trigger a modal or inline edit, then call the backend to update the script name.
              */}
              <Pencil className="h-4 w-4 mr-2 text-foreground group-hover:text-primary" />
              <span>Rename</span>
            </button>

            <button
              className="w-full text-left px-3 py-2 text-sm flex items-center text-foreground hover:bg-muted hover:text-primary rounded-sm mx-1 whitespace-nowrap"
              onClick={handleMenuItemClick(onFavoriteToggle)}
              role="menuitem"
            >
              <Star className={`h-4 w-4 mr-2 ${isFavorite ? "fill-amber-500 text-amber-500" : "text-foreground group-hover:text-primary"}`} />
              <span>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</span>
            </button>

            <div className="h-px bg-border my-1 mx-2" />

            <button
              className="w-full text-left px-3 py-2 text-sm flex items-center text-red-500 hover:bg-muted hover:text-red-600 rounded-sm mx-1 whitespace-nowrap"
              onClick={handleMenuItemClick(onDelete)}
              role="menuitem"
            >
              {/*
                BACKEND INTEGRATION: When connected to the backend, implement the delete script API call here.
                The 'onDelete' callback should show a confirmation, then call the backend to delete the script.
              */}
              <Trash className="h-4 w-4 mr-2 text-red-500 group-hover:text-red-600" />
              <span>Delete</span>
            </button>
          </div>,
          document.body,
        )}
    </>
  )
}
