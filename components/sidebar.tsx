"use client"

import { useState, useEffect, useMemo } from "react"
import { Plus, Search, X } from "lucide-react"
import { AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProjectItem from "./sidebar/project-item"
import ProjectCategory from "./sidebar/project-category"
import TimeCategory from "./sidebar/time-category"
import RenameChatDialog from "./sidebar/sidebar-modals/rename-chat-dialog"
import DeleteChatModal from "./sidebar/sidebar-modals/delete-chat-modal"
import ScrollableContainer from "./ui/scrollable-container"
import { useLanguage } from "./language/language-provider"
import type { Chat } from "@/types/chat"

interface SidebarProps {
  isVisible: boolean
  onClose: () => void
  onDropdownOpenChange?: (open: boolean) => void
  activeChats?: Chat[]
  onChatSelect?: (chat: Chat) => void
  onNewChat?: () => void
  onChatRename?: (chatId: string, newName: string) => void
}

// Helper function to format date for category headers
const formatDateCategory = (date: Date): string => {
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)

  // Check if date is today
  if (date.toDateString() === now.toDateString()) {
    return "Today"
  }

  // Check if date is yesterday
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday"
  }

  // Check if date is within last 7 days
  const sevenDaysAgo = new Date(now)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  if (date >= sevenDaysAgo) {
    return "Last 7 days"
  }

  // Check if date is within last 30 days
  const thirtyDaysAgo = new Date(now)
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  if (date >= thirtyDaysAgo) {
    return "Last 30 days"
  }

  // Otherwise, return month and year
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
}

// Interface for grouped chats
interface GroupedChats {
  [key: string]: Chat[]
}

export default function Sidebar({
  isVisible,
  onClose,
  onDropdownOpenChange,
  activeChats = [],
  onChatSelect,
  onNewChat,
  onChatRename,
}: SidebarProps) {
  const { t } = useLanguage()
  // State for favorites
  const [favorites, setFavorites] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  // State for category expansion
  const [favoritesExpanded, setFavoritesExpanded] = useState(false)

  // State for rename dialog
  const [renameDialogOpen, setRenameDialogOpen] = useState(false)
  const [chatToRename, setChatToRename] = useState<Chat | null>(null)

  // State for delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [chatToDelete, setChatToDelete] = useState<Chat | null>(null)

  // Use sample scripts to enhance chat data
  useEffect(() => {
    if (activeChats && activeChats.length > 0) {
      // This would be where we'd enhance the chat data with script content
      // For now, we're just using the sample data as is
      console.log("[Sidebar] Received chats:", activeChats.map((c) => `${c.id}: "${c.name}"`).join(", "))
    }
  }, [activeChats])

  // Filter chats based on search query
  const filteredChats = useMemo(() => {
    if (!searchQuery.trim()) return activeChats

    const query = searchQuery.toLowerCase().trim()
    return activeChats.filter(
      (chat) => chat.name.toLowerCase().includes(query) || chat.description.toLowerCase().includes(query),
    )
  }, [activeChats, searchQuery])

  // Group chats by time periods
  const groupedChats = useMemo(() => {
    const sorted = [...filteredChats].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

    return sorted.reduce((groups: GroupedChats, chat) => {
      const category = formatDateCategory(chat.timestamp)

      if (!groups[category]) {
        groups[category] = []
      }

      groups[category].push(chat)
      return groups
    }, {})
  }, [filteredChats])

  // Filter favorite chats based on search query
  const filteredFavoriteChats = useMemo(() => {
    const favoriteChats = activeChats.filter((chat) => favorites.includes(chat.id))

    if (!searchQuery.trim()) return favoriteChats

    const query = searchQuery.toLowerCase().trim()
    return favoriteChats.filter(
      (chat) => chat.name.toLowerCase().includes(query) || chat.description.toLowerCase().includes(query),
    )
  }, [activeChats, favorites, searchQuery])

  const toggleFavorite = (chat: Chat) => {
    setFavorites((current) => {
      // Check if we're adding a new favorite
      const isAdding = !current.includes(chat.id)

      // If adding a new favorite, expand the favorites category
      if (isAdding) {
        setFavoritesExpanded(true)
      }

      // Update favorites list
      if (isAdding) {
        return [...current, chat.id]
      } else {
        return current.filter((id) => id !== chat.id)
      }
    })
  }

  // Handle chat rename
  const handleRenameClick = (chat: Chat) => {
    console.log(`[Sidebar] Opening rename dialog for chat: ${chat.id}, "${chat.name}"`)
    setChatToRename(chat)
    setRenameDialogOpen(true)
  }

  const handleRename = (chatId: string, newName: string) => {
    console.log(`[Sidebar] Handling rename: ${chatId} to "${newName}"`)

    // If we have a dedicated rename handler, use it
    if (onChatRename) {
      onChatRename(chatId, newName)
    }

    // Close the dialog
    setRenameDialogOpen(false)
  }

  // Handle chat delete
  const handleDeleteClick = (chat: Chat) => {
    setChatToDelete(chat)
    setDeleteDialogOpen(true)
  }

  const handleDelete = (chatId: string) => {
    // Remove from favorites if present
    if (favorites.includes(chatId)) {
      setFavorites((current) => current.filter((id) => id !== chatId))
    }
  }

  // Handle chat selection
  const handleNewSessionClick = () => {
    if (onNewChat) {
      onNewChat()
    }
  }

  // Handle chat selection
  const handleSessionClick = (chat: Chat) => {
    if (onChatSelect) {
      onChatSelect(chat)
    }
  }

  // Clear search query
  const clearSearch = () => {
    setSearchQuery("")
  }

  // Automatically expand favorites when there are items
  useEffect(() => {
    if (favorites.length > 0 && !favoritesExpanded) {
      setFavoritesExpanded(true)
    }
  }, [favorites, favoritesExpanded])

  // Get time categories in a specific order
  const timeCategories = useMemo(() => {
    const categories = Object.keys(groupedChats)

    // Define the order of categories
    const categoryOrder = ["Today", "Yesterday", "Last 7 days", "Last 30 days"]

    // Sort categories by predefined order first, then alphabetically for months
    return categories.sort((a, b) => {
      const indexA = categoryOrder.indexOf(a)
      const indexB = categoryOrder.indexOf(b)

      // If both are in the predefined list, sort by that order
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB
      }

      // If only a is in the list, it comes first
      if (indexA !== -1) return -1

      // If only b is in the list, it comes first
      if (indexB !== -1) return 1

      // Otherwise sort by date (newest first)
      // This assumes the category is a month name + year
      const dateA = new Date(a)
      const dateB = new Date(b)
      return dateB.getTime() - dateA.getTime()
    })
  }, [groupedChats])

  // Check if we have any search results
  const hasSearchResults = filteredFavoriteChats.length > 0 || Object.keys(groupedChats).length > 0

  // Check if search is active
  const isSearching = searchQuery.trim().length > 0

  return (
    <div
      className={`absolute top-0 left-0 h-full w-64 bg-[#FCFBF7] dark:bg-[#1C1C1C] border-r border-border z-20 transform transition-transform duration-300 flex flex-col rounded-md ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      }`}
      data-sidebar-visible={isVisible}
    >
      <div className="p-3 pt-4 shrink-0">
        <Button
          variant="outline"
          className="w-full justify-center gap-2 text-sm h-9 px-4 mb-3"
          onClick={handleNewSessionClick}
        >
          <Plus className="h-4 w-4" />
          New Script
        </Button>

        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t("Search scripts")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={t("clearSearch")}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">{t("clearSearch")}</span>
            </button>
          )}
        </div>
      </div>

      <ScrollableContainer className="px-1 sidebar-scrollbar">
        {isSearching && !hasSearchResults ? (
          <div className="flex flex-col items-center justify-center h-32 text-center px-4">
            <p className="text-muted-foreground text-sm mb-1">{t("noResults")}</p>
            <p className="text-xs text-muted-foreground">{t("tryDifferentSearch")}</p>
          </div>
        ) : (
          <div className="pb-4">
            {/* Only show favorites if there are any matching the search */}
            {filteredFavoriteChats.length > 0 && (
              <ProjectCategory
                title={t("favorites")}
                count={filteredFavoriteChats.length}
                isExpanded={favoritesExpanded || isSearching}
                onExpandedChange={setFavoritesExpanded}
              >
                <AnimatePresence>
                  {filteredFavoriteChats.map((chat) => (
                    <ProjectItem
                      key={`fav-${chat.id}`}
                      project={chat}
                      isFavorite={true}
                      onFavoriteToggle={toggleFavorite}
                      onDropdownOpenChange={onDropdownOpenChange}
                      onRename={handleRenameClick}
                      onDelete={handleDeleteClick}
                      onClick={() => handleSessionClick(chat)}
                    />
                  ))}
                </AnimatePresence>
              </ProjectCategory>
            )}

            {/* Time-based categories */}
            {timeCategories.map((category) => (
              <TimeCategory key={category} title={category} count={groupedChats[category].length}>
                {groupedChats[category].map((chat) => (
                  <ProjectItem
                    key={`${category}-${chat.id}`}
                    project={chat}
                    isFavorite={favorites.includes(chat.id)}
                    onFavoriteToggle={toggleFavorite}
                    onDropdownOpenChange={onDropdownOpenChange}
                    onRename={handleRenameClick}
                    onDelete={handleDeleteClick}
                    onClick={() => handleSessionClick(chat)}
                  />
                ))}
              </TimeCategory>
            ))}
          </div>
        )}
      </ScrollableContainer>

      {chatToRename && (
        <RenameChatDialog
          chatId={chatToRename.id}
          currentName={chatToRename.name}
          isOpen={renameDialogOpen}
          onClose={() => setRenameDialogOpen(false)}
          onRename={handleRename}
        />
      )}

      {chatToDelete && (
        <DeleteChatModal
          chatId={chatToDelete.id}
          chatName={chatToDelete.name}
          isFavorite={favorites.includes(chatToDelete.id)}
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
