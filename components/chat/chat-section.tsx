"use client"

import { useState, useEffect } from "react"
import { type VoiceScript, getScriptById } from "@/data/sample-scripts"
import ScriptEditor from "./script-editor"
import ScriptWelcome from "./script-welcome"
import type { Chat } from "@/types/chat"

interface ChatSectionProps {
  activeChat?: Chat | null
  onChatStarted?: (firstMessage: string) => void
  onChatUpdated?: (chatId: string, messages: any[]) => void
  onNewChat?: () => void
}

export default function ChatSection({ activeChat, onChatStarted, onChatUpdated, onNewChat }: ChatSectionProps) {
  const [activeScript, setActiveScript] = useState<VoiceScript | null>(null)

  // Load script when activeChat changes
  useEffect(() => {
    if (activeChat) {
      const script = getScriptById(activeChat.id)
      if (script) {
        setActiveScript(script)
      } else {
        // If no matching script, create a placeholder one
        setActiveScript({
          id: activeChat.id,
          title: activeChat.name,
          content: activeChat.description || "No content available.",
          lastEdited: activeChat.lastEdited,
          timestamp: activeChat.timestamp,
          wordCount: activeChat.description ? activeChat.description.split(/\s+/).filter(Boolean).length : 0,
          duration: activeChat.description
            ? Math.round((activeChat.description.split(/\s+/).filter(Boolean).length / 150) * 60)
            : 0,
        })
      }
    } else {
      setActiveScript(null)
    }
  }, [activeChat])

  const handleScriptSave = (content: string) => {
    if (!activeScript) return

    // Calculate new metrics
    const wordCount = content.split(/\s+/).filter(Boolean).length
    const duration = Math.round((wordCount / 150) * 60)

    // Update active script
    const updatedScript = {
      ...activeScript,
      content,
      wordCount,
      duration,
      lastEdited: "Just now",
    }
    setActiveScript(updatedScript)

    // If we had a proper backend, we would save the script here
    console.log("Script saved:", updatedScript)
  }

  const handleScriptCreate = (title: string, content: string) => {
    // Calculate metrics
    const wordCount = content.split(/\s+/).filter(Boolean).length
    const duration = Math.round((wordCount / 150) * 60)

    // Create new script
    const newScript: VoiceScript = {
      id: `new-${Date.now()}`,
      title,
      content,
      lastEdited: "Just now",
      timestamp: new Date(),
      wordCount,
      duration,
    }

    setActiveScript(newScript)

    // If we had a proper backend, we would save the new script here
    console.log("New script created:", newScript)

    // Notify parent component
    if (onChatStarted) {
      onChatStarted(title)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {activeScript ? (
        <ScriptEditor script={activeScript} onSave={handleScriptSave} />
      ) : (
        <ScriptWelcome onScriptCreate={handleScriptCreate} />
      )}
    </div>
  )
}
