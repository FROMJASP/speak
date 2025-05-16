"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import ScrollableContainer from "../ui/scrollable-container"
import AiScriptSuggest from "./ai/AiScriptSuggest"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ArrowUpCircle } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { ChevronDown } from "lucide-react"

interface ScriptWelcomeProps {
  onScriptCreate?: (title: string, content: string) => void
  addAudioFile?: (name: string) => void
}

export default function ScriptWelcome({ onScriptCreate, addAudioFile }: ScriptWelcomeProps) {
  const [content, setContent] = useState("")
  const [showAiSuggest, setShowAiSuggest] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [title, setTitle] = useState("Untitled script")
  const [isTitleFocused, setIsTitleFocused] = useState(false)
  const [selectedModal, setSelectedModal] = useState("broad")

  const PLACEHOLDER = "Paste, write or press 'space' to generate a script, '/' for commands..."

  const modalOptions = [
    { value: "broad", label: "Broad Modal", description: "Best for general scripts and wide audiences." },
    { value: "conversation", label: "Conversation Modal", description: "Great for dialogues and interactive content." },
    { value: "news", label: "News Modal", description: "Perfect for news-style or informational scripts." },
  ]
  const selectedModalObj = modalOptions.find(opt => opt.value === selectedModal)

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
    if (addAudioFile) addAudioFile(title)
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
              className={`w-full text-3xl font-extrabold font-sans bg-transparent border-0 outline-none focus:outline-none focus:ring-0 p-0 text-foreground dark:text-foreground ${title ? "text-black dark:text-foreground" : "text-gray-100 dark:text-gray-400 placeholder:text-gray-100 dark:placeholder:text-gray-400"}`}
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
              className="w-full min-h-[300px] resize-none font-sans font-normal text-xl leading-relaxed p-0 border-0 focus-visible:ring-0 bg-transparent text-black dark:text-foreground placeholder:text-base placeholder:text-gray-300 dark:placeholder:text-gray-400"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleTextareaKeyDown}
              style={{
                caretColor: "currentColor",
                lineHeight: "1.8",
                fontSize: "1.25rem",
              }}
            />
            {/* Modal selection info with popover */}
            <div className="flex flex-row gap-2 justify-end items-end mt-1">
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-background text-foreground font-medium text-base hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    type="button"
                    aria-label="Select modal"
                  >
                    Selected modal: <span className="font-semibold ml-1">{selectedModalObj?.label}</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80 p-2">
                  <div className="flex flex-col gap-1">
                    {modalOptions.map(opt => (
                      <button
                        key={opt.value}
                        className={`w-full text-left px-3 py-2 rounded-md hover:bg-accent transition-colors ${selectedModal === opt.value ? 'bg-accent/50 font-semibold' : ''}`}
                        onClick={() => { setSelectedModal(opt.value); (document.activeElement as HTMLElement)?.blur(); }}
                      >
                        <div className="font-medium text-base">{opt.label}</div>
                        <div className="text-xs text-muted-foreground pt-1 whitespace-normal">{opt.description}</div>
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <button
                className="flex items-center gap-2 rounded-full bg-neutral-900 hover:bg-neutral-800 transition-colors px-5 py-2 h-10 text-white font-semibold shadow-md border border-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Generate Audio"
                onClick={handleCreateScript}
                disabled={content.trim().split(/\s+/).filter(Boolean).length < 1}
                aria-disabled={content.trim().split(/\s+/).filter(Boolean).length < 1}
              >
                <span>Generate</span>
              </button>
            </div>
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
