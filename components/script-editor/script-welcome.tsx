"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import ScrollableContainer from "../ui/scrollable-container"
import AiScriptSuggest from "./ai/AiScriptSuggest"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ArrowUpCircle } from "lucide-react"

interface ScriptWelcomeProps {
  onScriptCreate?: (title: string, content: string) => void
}

export default function ScriptWelcome({ onScriptCreate }: ScriptWelcomeProps) {
  const [content, setContent] = useState("")
  const [showAiSuggest, setShowAiSuggest] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [title, setTitle] = useState("Untitled script")
  const [isTitleFocused, setIsTitleFocused] = useState(false)

  const PLACEHOLDER = "Paste, write or press 'space' to generate a script, '/' for commands..."

  // Auto-resize textarea and track container width
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }

    // Set up resize observer to track container width
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width)
      }
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [content])

  // Calculate dynamic padding based on container width
  const getContentPadding = () => {
    // For very narrow containers, use minimal padding
    if (containerWidth < 400) return "px-2"
    // For narrow containers, use small padding
    if (containerWidth < 600) return "px-4"
    // For medium containers, use medium padding
    if (containerWidth < 800) return "px-8"
    // For wide containers, use larger padding
    if (containerWidth < 1000) return "px-12"
    // For very wide containers, use even larger padding
    return "px-16"
  }

  const handleCreateScript = () => {
    if (onScriptCreate && content) {
      onScriptCreate(title || "Untitled script", content)
    }
  }

  // Auto-focus the textarea on initial load
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  const handleTitleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (titleInputRef.current) {
      titleInputRef.current.focus()
      titleInputRef.current.setSelectionRange(0, 0)
    }
  }

  // Show AI suggest if content is empty and user presses space
  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Show AI suggest if content is empty and user presses space
    if (content.trim() === "" && e.key === " " && !showAiSuggest) {
      e.preventDefault()
      setShowAiSuggest(true)
      return
    }
    // On Enter, reset to placeholder and select it
    if (e.key === "Enter") {
      e.preventDefault()
      setContent(PLACEHOLDER)
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus()
          textareaRef.current.setSelectionRange(0, PLACEHOLDER.length)
        }
      }, 0)
      return
    }
    // If the content is the placeholder and user presses space, show AI suggest
    if (content === PLACEHOLDER && e.key === " ") {
      e.preventDefault()
      setShowAiSuggest(true)
      setContent("")
      return
    }
  }

  useEffect(() => {
    if (showAiSuggest && content.trim() === "") {
      textareaRef.current?.focus()
    }
  }, [showAiSuggest, content])

  return (
    <div className="flex flex-col h-full bg-background rounded-xl border border-border/20">
      <ScrollableContainer className="flex-grow" ref={containerRef}>
        <div className={`py-6 ${getContentPadding()} transition-all duration-200 relative`}>
          {/* Title input + Generate Audio button */}
          <div className="mb-4 flex items-center justify-between">
            <input
              ref={titleInputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={(e) => {
                setIsTitleFocused(true)
                // Always set cursor to start
                e.target.setSelectionRange(0, 0)
              }}
              onBlur={() => setIsTitleFocused(false)}
              onClick={e => {
                e.preventDefault()
                if (titleInputRef.current) {
                  titleInputRef.current.focus()
                  titleInputRef.current.setSelectionRange(0, 0)
                }
              }}
              className={`w-full text-3xl font-extrabold font-sans bg-transparent border-0 outline-none focus:outline-none focus:ring-0 p-0 ${title ? "text-black" : "text-gray-100 placeholder:text-gray-100"}`}
              placeholder="Untitled script"
              style={{
                caretColor: "currentColor",
              }}
            />
          </div>
          <div className="relative">
            <Textarea
              ref={textareaRef}
              placeholder={PLACEHOLDER}
              className="w-full min-h-[300px] resize-none font-sans font-normal text-2xl leading-relaxed p-0 border-0 focus-visible:ring-0 bg-transparent text-black placeholder:text-base placeholder:text-gray-300 dark:placeholder:text-gray-600"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleTextareaKeyDown}
              style={{
                caretColor: "currentColor",
                lineHeight: "1.8",
              }}
            />
            {/* Floating Generate Audio Arrow Button */}
            {content.trim().split(/\s+/).filter(Boolean).length > 0 && (
              <div className="absolute right-6 bottom-6 flex justify-end pointer-events-none w-full">
                <button
                  className="pointer-events-auto flex items-center justify-center rounded-full bg-neutral-900 hover:bg-neutral-800 transition-colors w-10 h-10 shadow-md border border-neutral-800"
                  title="Generate Audio"
                  onClick={() => {
                    console.log("Generate audio")
                  }}
                >
                  <ArrowUpCircle className="h-5 w-5 text-white" />
                </button>
              </div>
            )}
            {showAiSuggest && content.trim() === "" && (
              <div className="absolute inset-0 z-20 flex items-start justify-center bg-background/80">
                <TooltipProvider>
                  <AiScriptSuggest onSuggestion={({ title, script }) => {
                    setTitle(title)
                    setContent(script)
                    setShowAiSuggest(false)
                    setTimeout(() => {
                      textareaRef.current?.focus()
                    }, 0)
                    if (onScriptCreate) onScriptCreate(title, script)
                  }} onClose={() => {
                    setShowAiSuggest(false)
                    setTimeout(() => {
                      textareaRef.current?.focus()
                    }, 0)
                  }} />
                </TooltipProvider>
              </div>
            )}
          </div>
        </div>
      </ScrollableContainer>
    </div>
  )
}
