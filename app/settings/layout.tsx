"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import { PlanProvider } from "@/components/admin/plan-context"
import { sampleChats } from "@/data/sample-chats"
import type { Chat } from "@/types/chat"

interface SettingsLayoutProps {
  children: ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const router = useRouter()
  const [activeChats, setActiveChats] = useState<Chat[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Initialize with sample chats
  useEffect(() => {
    setActiveChats(sampleChats)
  }, [])

  // Handle chat selection - navigate to main layout
  const handleChatSelect = (chat: Chat) => {
    console.log("Selected chat:", chat.name)

    // Store the selected chat in localStorage to retrieve it on the main page
    localStorage.setItem("selectedChatId", chat.id)

    // Navigate to the main page
    router.push("/")
  }

  // Handle new chat button click - navigate to main layout with new chat flag
  const handleNewChat = () => {
    console.log("New chat button clicked in settings")

    // Set a flag in localStorage to indicate we want to start a new chat
    localStorage.setItem("startNewChat", "true")

    // Navigate to the main page
    router.push("/")
  }

  return (
    <PlanProvider>
      <div className="flex flex-col h-screen overflow-hidden bg-background">
        <Navbar
          projectName="Settings"
          onNewChat={handleNewChat} // Pass the handler to Navbar
        />

        <div className="flex flex-1 overflow-hidden relative">
          {/* Always show sidebar in settings with fixed width */}
          <div className="h-full w-64 flex-shrink-0">
            <Sidebar
              isVisible={true}
              onClose={() => {}}
              activeChats={activeChats}
              onChatSelect={handleChatSelect}
              onNewChat={handleNewChat} // Pass the handler to Sidebar
              onDropdownOpenChange={setIsDropdownOpen}
            />
          </div>

          {/* Settings content with padding to avoid being hidden behind sidebar */}
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </PlanProvider>
  )
}
