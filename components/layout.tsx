"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import Navbar from "./navbar/navbar"
import Sidebar from "./sidebar"
import ChatSection from "./script-editor/text-section"
import GUISection from "./gui-section"
import ResizableDivider from "./ui/resizable-divider"
import { Toaster } from "./ui/toaster"
import type { Chat, Message } from "@/types/chat"
import { PlanProvider } from "@/components/navbar/user-menu-via-avatar/admin/plan-context"
import { useMockData } from "@/utils/env"
import { getChats } from "@/lib/api/chat-service"

interface LayoutProps {
  sidebarInitiallyOpen?: boolean
}

const isMock = useMockData()

// Conditional imports for chats and conversations
type ChatsImport = typeof import("@/data/sample/sample-chats")
type ConversationsImport = typeof import("@/data/sample/sample-conversations")

let sampleChats: ChatsImport["sampleChats"]
let generateSampleConversation: ConversationsImport["generateSampleConversation"]

if (isMock) {
  sampleChats = require("@/data/sample/sample-chats").sampleChats
  generateSampleConversation = require("@/data/sample/sample-conversations").generateSampleConversation
} else {
  // TODO: Import real data here when backend is ready
  sampleChats = require("@/data/sample/sample-chats").sampleChats
  generateSampleConversation = require("@/data/sample/sample-conversations").generateSampleConversation
}

export default function Layout({ sidebarInitiallyOpen = false }: LayoutProps) {
  const [showSidebar, setShowSidebar] = useState(sidebarInitiallyOpen)
  const [chatWidth, setChatWidth] = useState(65) // 65% default width for script section (GUI is 35%)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [currentChatName, setCurrentChatName] = useState("Untitled Script")
  const [activeChats, setActiveChats] = useState<Chat[]>([])
  const [sampleChats, setSampleChats] = useState<Chat[]>([])
  const [activeChat, setActiveChat] = useState<Chat | null>(null)
  const [shouldResetChat, setShouldResetChat] = useState(false)
  const [userRenamedChat, setUserRenamedChat] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Add a flag to temporarily disable sidebar auto-show
  const [disableSidebarAutoShow, setDisableSidebarAutoShow] = useState(false)

  // For debugging - track state changes
  const [stateVersion, setStateVersion] = useState(0)

  // Audio files state for demo
  const [audioFiles, setAudioFiles] = useState<{ id: string; name: string; duration: string; date: string }[]>([])

  const addAudioFile = (name: string) => {
    const now = new Date()
    setAudioFiles(prev => [
      {
        id: uuidv4(),
        name,
        duration: "0:00",
        date: `Today, ${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`,
      },
      ...prev,
    ])
  }

  // Initialize sample chats
  useEffect(() => {
    console.log("[Layout] Initializing sample chats")
    getChats().then(setSampleChats)

    // Check if there's a selected chat from settings page
    const selectedChatId = localStorage.getItem("selectedChatId")
    if (selectedChatId) {
      console.log("[Layout] Found selected chat ID from settings:", selectedChatId)

      // Find the chat in sample chats
      const selectedChat = [] as Chat[]
      if (selectedChat.length > 0) {
        console.log("[Layout] Found selected chat:", selectedChat[0].name)
        // Set as active chat
        setActiveChat(selectedChat[0])
        setCurrentChatName(selectedChat[0].name)

        // Move to active chats if it's a sample chat
        setActiveChats((prev) => [...prev, { ...selectedChat[0], lastEdited: "Just now", timestamp: new Date() }])
        setSampleChats((prev) => prev.filter((chat) => chat.id !== selectedChatId))

        // Show sidebar initially but disable auto-show for a short period
        setShowSidebar(false) // Don't show sidebar initially
        setDisableSidebarAutoShow(true) // Disable auto-show

        // Re-enable auto-show after a delay
        setTimeout(() => {
          setDisableSidebarAutoShow(false)
        }, 1000) // 1 second delay
      }

      // Clear the selected chat from localStorage
      localStorage.removeItem("selectedChatId")
    }

    // Check if we should start a new chat (coming from settings page)
    const startNewChat = localStorage.getItem("startNewChat")
    if (startNewChat === "true") {
      console.log("[Layout] Starting new chat from settings page")

      // Reset state for new script
      setCurrentChatName("Untitled Script")
      setActiveChat(null)
      setUserRenamedChat(false)
      setShouldResetChat((prev) => !prev) // Toggle to trigger useEffect in ChatSection

      // Disable sidebar auto-show temporarily
      setShowSidebar(false)
      setDisableSidebarAutoShow(true)

      // Re-enable auto-show after a delay
      setTimeout(() => {
        setDisableSidebarAutoShow(false)
      }, 1000)

      // Clear the flag from localStorage
      localStorage.removeItem("startNewChat")
    }
  }, [])

  // Handle mouse movement to show sidebar
  const handleMouseMove = (e: React.MouseEvent) => {
    // Only show sidebar if auto-show is not disabled
    if (e.clientX < 20 && !disableSidebarAutoShow) {
      setShowSidebar(true)
    }
  }

  // Handle mouse leaving the sidebar area
  const handleMouseLeave = () => {
    // Only hide the sidebar if no dropdown is open
    if (!isDropdownOpen) {
      setShowSidebar(false)
    }
  }

  // Handle resize between chat and GUI sections
  const handleResize = (newChatWidth: number) => {
    setChatWidth(newChatWidth)
  }

  // CENTRALIZED CHAT RENAME FUNCTION
  // This is the single source of truth for all renames
  const handleChatRename = (chatId: string, newName: string) => {
    console.log(`[Layout] Renaming chat ${chatId} to "${newName}"`)

    // Check if the chat is in activeChats
    const isActiveChat = activeChats.some((chat) => chat.id === chatId)

    // Check if the chat is in sampleChats
    const isSampleChat = sampleChats.some((chat) => chat.id === chatId)

    if (isActiveChat) {
      // 1. Update activeChats (for sidebar)
      setActiveChats((prevChats) => {
        return prevChats.map((chat) => {
          if (chat.id === chatId) {
            console.log(`[Layout] Found active chat to rename: ${chat.id} from "${chat.name}" to "${newName}"`)
            return { ...chat, name: newName }
          }
          return chat
        })
      })
    } else if (isSampleChat) {
      // If it's a sample chat, move it to activeChats with the new name
      setSampleChats((prevChats) => {
        const chatToMove = prevChats.find((chat) => chat.id === chatId)
        if (chatToMove) {
          console.log(`[Layout] Moving sample chat to active: ${chatId} with name "${newName}"`)

          // Add to activeChats with new name
          setActiveChats((prev) => [
            ...prev,
            { ...chatToMove, name: newName, lastEdited: "Just now", timestamp: new Date() },
          ])

          // Remove from sampleChats
          return prevChats.filter((chat) => chat.id !== chatId)
        }
        return prevChats
      })
    }

    // 2. Update activeChat (for current selection)
    if (activeChat && activeChat.id === chatId) {
      console.log(`[Layout] Updating activeChat name from "${activeChat.name}" to "${newName}"`)
      setActiveChat((prev) => {
        if (!prev) return null
        return { ...prev, name: newName }
      })

      // 3. Update currentChatName (for navbar)
      setCurrentChatName(newName)
      setUserRenamedChat(true)
    }

    // 4. Increment state version to force re-renders
    setStateVersion((v) => v + 1)
  }

  // Handle chat rename from navbar
  const handleNavbarRename = (newName: string, projectId?: string) => {
    console.log(`[Layout] Navbar rename triggered: ${projectId || "unknown"} to "${newName}"`)

    if (projectId) {
      // If we have a project ID, use the centralized rename function
      handleChatRename(projectId, newName)
    } else if (activeChat) {
      // If no project ID but we have an active chat, use its ID
      handleChatRename(activeChat.id, newName)
    } else {
      // If no active chat yet (e.g., a new unsaved chat), just update the current name
      setCurrentChatName(newName)
      setUserRenamedChat(true)
    }
  }

  // Handle new chat creation
  const handleNewChat = () => {
    // Save current chat if it exists and has messages
    saveCurrentChatIfNeeded()

    // Reset state for new script
    setCurrentChatName("Untitled Script")
    setActiveChat(null)
    setUserRenamedChat(false)
    setShouldResetChat((prev) => !prev) // Toggle to trigger useEffect in ChatSection
  }

  // Save the current chat if it has messages
  const saveCurrentChatIfNeeded = () => {
    if (activeChat && activeChat.messages && activeChat.messages.length > 1) {
      // Chat already exists in activeChats, no need to add it again
      return
    }

    // If we have a current chat name that's not the default and it's not already saved
    if (currentChatName !== "Untitled Script" && !activeChat) {
      const newChat: Chat = {
        id: uuidv4(),
        name: currentChatName,
        lastEdited: "Just now",
        timestamp: new Date(),
        description: currentChatName,
        messages: generateSampleConversation(currentChatName),
      }

      setActiveChats((prev) => [newChat, ...prev])
    }
  }

  // Handle first message in chat
  const handleChatStarted = (firstMessage: string) => {
    // Only use the generated title if the user hasn't renamed the chat
    const chatName = userRenamedChat ? currentChatName : firstMessage

    // Create a new chat with the title derived from the first message
    const newChat: Chat = {
      id: uuidv4(),
      name: chatName,
      lastEdited: "Just now",
      timestamp: new Date(),
      description: firstMessage,
      messages: [
        {
          id: "1",
          content: "Hello! How can I help you today?",
          sender: "bot",
          timestamp: new Date(Date.now() - 60000 * 5), // 5 minutes ago
        },
        {
          id: "user-1",
          content: firstMessage,
          sender: "user",
          timestamp: new Date(),
        },
      ],
    }

    // Add to active chats
    setActiveChats((prev) => [newChat, ...prev])

    // Set as active chat
    setActiveChat(newChat)

    // Update current chat name if user hasn't renamed it
    if (!userRenamedChat) {
      setCurrentChatName(chatName)
    }
  }

  // Handle chat selection from sidebar
  const handleChatSelect = (chat: Chat) => {
    console.log(`[Layout] Chat selected: ${chat.id}, "${chat.name}"`)

    // Save current chat if needed
    saveCurrentChatIfNeeded()

    // Check if the selected chat is from sample chats
    const isSampleChat = sampleChats.some((sampleChat) => sampleChat.id === chat.id)

    if (isSampleChat) {
      // Move from sample to active chats
      const chatToMove = sampleChats.find((sampleChat) => sampleChat.id === chat.id)
      if (chatToMove) {
        console.log(`[Layout] Moving sample chat to active: ${chat.id}`)

        // Add to activeChats
        setActiveChats((prev) => [...prev, { ...chatToMove, lastEdited: "Just now", timestamp: new Date() }])

        // Remove from sampleChats
        setSampleChats((prev) => prev.filter((sampleChat) => sampleChat.id !== chat.id))
      }
    }

    // Set the selected chat as active
    setActiveChat(chat)
    setCurrentChatName(chat.name)
    setUserRenamedChat(false) // Reset the rename flag for the new chat
  }

  // Handle chat update (when messages are added)
  const handleChatUpdated = (chatId: string, messages: Message[]) => {
    // Update the chat in the activeChats array
    setActiveChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === chatId) {
          return { ...chat, messages, lastEdited: "Just now" }
        }
        return chat
      }),
    )

    // Update activeChat if it's the current one
    if (activeChat && activeChat.id === chatId) {
      setActiveChat((prev) => (prev ? { ...prev, messages, lastEdited: "Just now" } : null))
    }
  }

  // Reset the shouldResetChat flag after it's been consumed
  useEffect(() => {
    if (shouldResetChat) {
      const timer = setTimeout(() => {
        setShouldResetChat(false)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [shouldResetChat])

  // Debug: Log state changes
  useEffect(() => {
    console.log("[Layout] activeChat updated:", activeChat?.id, activeChat?.name)
  }, [activeChat])

  useEffect(() => {
    console.log("[Layout] activeChats updated, count:", activeChats.length)
    if (activeChats.length > 0) {
      console.log("[Layout] First chat:", activeChats[0].id, activeChats[0].name)
    }
  }, [activeChats])

  useEffect(() => {
    console.log("[Layout] sampleChats updated, count:", sampleChats.length)
  }, [sampleChats])

  // Combine active and sample chats for the sidebar
  const allChats = [...activeChats, ...sampleChats]

  return (
    <PlanProvider>
      <div className="flex flex-col h-screen overflow-hidden bg-background" onMouseMove={handleMouseMove}>
        <Navbar
          projectName={currentChatName}
          projectId={activeChat?.id}
          onProjectRename={handleNavbarRename}
          onNewChat={handleNewChat}
        />

        <div className="flex flex-1 overflow-hidden relative">
          <div ref={sidebarRef} onMouseLeave={handleMouseLeave} className="h-full">
            <Sidebar
              key={`sidebar-${stateVersion}`} // Force re-render when state changes
              isVisible={showSidebar}
              onClose={() => setShowSidebar(false)}
              onDropdownOpenChange={setIsDropdownOpen}
              activeChats={allChats}
              onChatSelect={handleChatSelect}
              onNewChat={handleNewChat}
              onChatRename={handleChatRename}
            />
          </div>

          <div className="flex flex-1 overflow-hidden p-3 gap-3">
            <div
              className="overflow-hidden transition-width duration-100 ease-out"
              style={{ width: `${100 - chatWidth}%` }}
            >
              <GUISection audioFiles={audioFiles} addAudioFile={addAudioFile} />
            </div>

            <ResizableDivider
              onResize={handleResize}
              initialPosition={chatWidth}
              minLeftWidth={25}
              minRightWidth={25}
            />

            <div className="overflow-hidden transition-width duration-100 ease-out" style={{ width: `${chatWidth}%` }}>
              <ChatSection
                activeChat={activeChat}
                onChatStarted={handleChatStarted}
                onChatUpdated={handleChatUpdated}
                onNewChat={shouldResetChat ? handleNewChat : undefined}
                onTitleChange={setCurrentChatName}
                addAudioFile={addAudioFile}
              />
            </div>
          </div>
        </div>

        <Toaster />
      </div>
    </PlanProvider>
  )
}
