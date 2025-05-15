"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, Star } from "lucide-react"
import type { Chat } from "@/types/chat"
import ProjectAvatar from "./project-avatar"
import SidebarItemMenu from "./sidebar/sidebar-item-menu"

interface ProjectItemProps {
  project: Chat
  isFavorite?: boolean
  onFavoriteToggle: (project: Chat) => void
  onDropdownOpenChange?: (open: boolean) => void
  onRename?: (project: Chat) => void
  onDelete?: (project: Chat) => void
  onClick?: () => void
}

export default function ProjectItem({
  project,
  isFavorite = false,
  onFavoriteToggle,
  onDropdownOpenChange,
  onRename,
  onDelete,
  onClick,
}: ProjectItemProps) {
  const [showOptions, setShowOptions] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    // Don't trigger click if we're clicking on the dropdown
    if ((e.target as HTMLElement).closest('[data-dropdown-trigger="true"]')) {
      return
    }

    if (onClick) {
      onClick()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="p-2 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors mb-2 group relative"
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
      onClick={handleClick}
      data-project-id={project.id}
      data-project-name={project.name}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 relative">
          <ProjectAvatar name={project.name} />
          {isFavorite && (
            <div className="absolute top-0 right-0 bg-amber-500 rounded-bl-md w-4 h-4 flex items-center justify-center">
              <Star className="h-3 w-3 text-white fill-current" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate">{project.name}</h3>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <Clock className="h-3 w-3 mr-1" />
            <span>{project.lastEdited}</span>
          </div>
        </div>

        <div className={`transition-opacity ${showOptions ? "opacity-100" : "opacity-0"}`}>
          <SidebarItemMenu
            project={project}
            isFavorite={isFavorite}
            onFavoriteToggle={onFavoriteToggle}
            onRename={onRename}
            onDelete={onDelete}
          />
        </div>
      </div>
    </motion.div>
  )
}
