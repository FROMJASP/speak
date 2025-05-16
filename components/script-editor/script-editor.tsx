"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import type { VoiceScript } from "@/data/sample-scripts"
import ScrollableContainer from "../ui/scrollable-container"

interface ScriptEditorProps {
  script: VoiceScript
  onSave?: (content: string) => void
}

export default function ScriptEditor({ script, onSave }: ScriptEditorProps) {
  const [content, setContent] = useState(script.content)
  const [title, setTitle] = useState(script.title || "Untitled script")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [isTitleFocused, setIsTitleFocused] = useState(false)

  // Auto-resize textarea and track container width
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`

      // Auto-focus the textarea on initial load
      textareaRef.current.focus()
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
  }, [])

  // Re-adjust height when content changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
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

  const handleSave = () => {
    if (onSave) {
      // If we had a backend, we would also save the title here
      onSave(content)
    }
  }

  const handleTitleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (titleInputRef.current) {
      titleInputRef.current.focus()
      titleInputRef.current.setSelectionRange(0, 0)
    }
  }

  return (
    <div className="flex flex-col h-full bg-background rounded-xl">
      <ScrollableContainer className="flex-grow" ref={containerRef}>
        <div className={`py-6 ${getContentPadding()} transition-all duration-200`}>
          {/* Title input */}
          <div className="mb-4">
            <input
              ref={titleInputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={(e) => {
                setIsTitleFocused(true)
                e.target.setSelectionRange(0, 0)
              }}
              onBlur={() => setIsTitleFocused(false)}
              onClick={handleTitleClick}
              className="w-full text-2xl font-bold bg-transparent border-0 outline-none focus:outline-none focus:ring-0 p-0 placeholder:text-gray-400 dark:placeholder:text-gray-600"
              placeholder="Untitled script"
              style={{
                caretColor: "currentColor",
              }}
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <Textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[300px] resize-none font-medium leading-relaxed p-0 border-0 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none bg-transparent text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-600 script-editor-textarea"
              placeholder="Paste, write or press 'space' to generate a script, '/' for commands..."
              style={{
                caretColor: "currentColor",
                lineHeight: "1.8",
                fontSize: "1.125rem",
                fontFamily: "system-ui, -apple-system, sans-serif",
                resize: "none",
                outline: "none",
              }}
              autoFocus
            />
          </div>
        </div>
      </ScrollableContainer>
    </div>
  )
}
