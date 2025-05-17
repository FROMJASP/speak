"use client"

import { useState } from "react"
import { Play, Pause, Download, Mic, ChevronUp, ChevronDown, Check, ChevronRight, ChevronDown as ChevronDownIcon, RotateCcw, ArrowUp, Plus, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import ResizableDivider from "./ui/resizable-divider"

interface AudioFile {
  id: string
  name: string
  duration: string
  date: string
}

interface GUISectionProps {
  audioFiles: AudioFile[]
  addAudioFile: (name: string) => void
}

export default function GUISection({ audioFiles, addAudioFile }: GUISectionProps) {
  const [audioSectionHeight, setAudioSectionHeight] = useState(70) // 70% default height for audio section
  const [isPlaying, setIsPlaying] = useState<string | null>(null)
  const [expandedSection, setExpandedSection] = useState<"audio" | "voice" | null>(null)
  const [expandedAudio, setExpandedAudio] = useState<string | null>(null)
  const [audioProgress, setAudioProgress] = useState<{ [id: string]: number }>({})
  const [input, setInput] = useState("")
  const [responses, setResponses] = useState<AudioFile[]>([])

  const handleResize = (newHeight: number) => {
    setAudioSectionHeight(newHeight)
  }

  const togglePlay = (id: string) => {
    if (isPlaying === id) {
      setIsPlaying(null)
    } else {
      setIsPlaying(id)
    }
  }

  const toggleExpand = (section: "audio" | "voice") => {
    if (expandedSection === section) {
      setExpandedSection(null)
      setAudioSectionHeight(70) // Reset to default
    } else {
      setExpandedSection(section)
      setAudioSectionHeight(section === "audio" ? 90 : 10) // Expand audio or minimize it
    }
  }

  const handleGenerate = () => {
    if (!input.trim()) return
    // Simulate audio file creation as a response
    const now = new Date()
    const newAudio: AudioFile = {
      id: `${Date.now()}`,
      name: input,
      duration: "0:00",
      date: `Today, ${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`,
    }
    setResponses([newAudio, ...responses])
    if (addAudioFile) addAudioFile(input)
    setInput("")
  }

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Responses Section */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {responses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-12">
            <div className="text-4xl mb-4">🔊</div>
            <div className="text-lg font-semibold mb-2">No responses yet</div>
            <div className="text-base">Ask SPEAK something or generate audio to see responses here.</div>
          </div>
        ) : (
          responses.map((file, idx) => (
            <div
              key={file.id}
              className="flex items-center px-4 py-3 rounded-lg bg-card shadow-sm gap-4"
            >
              <span className="font-semibold text-base min-w-[90px]">{`Version ${responses.length - idx}`}</span>
              <span className="text-foreground font-medium truncate flex-1">{file.name}</span>
              <span className="ml-2 text-xs text-muted-foreground min-w-[48px] text-right">{file.duration}</span>
              {/* Download Button */}
              <button
                className="h-8 w-8 p-0 ml-2 text-muted-foreground hover:text-foreground"
                aria-label="Download"
                disabled
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
              </button>
            </div>
          ))
        )}
      </div>
      {/* Input Section */}
      <form
        className="relative flex items-end gap-2 p-4 bg-accent rounded-lg shadow-xl mx-4 mb-4 border border-border"
        onSubmit={e => { e.preventDefault(); handleGenerate(); }}
        style={{ minHeight: 72 }}
      >
        {/* Attach button */}
        <button
          type="button"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-background hover:bg-accent text-muted-foreground mr-2 transition-colors"
          tabIndex={-1}
          aria-label="Attach"
        >
          <Plus className="w-5 h-5" />
        </button>
        {/* Multiline input */}
        <textarea
          rows={1}
          className="flex-1 resize-none rounded-lg border-0 bg-transparent px-3 pt-2 pb-2 text-base focus:outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground min-h-[44px] max-h-40 sidebar-scrollbar placeholder:align-top placeholder:text-left"
          placeholder="Ask SPEAK..."
          value={input}
          onChange={e => {
            setInput(e.target.value)
            // Auto-grow logic
            const target = e.target as HTMLTextAreaElement
            target.style.height = '44px'
            target.style.height = Math.min(target.scrollHeight, 160) + 'px'
          }}
          style={{ boxShadow: 'none', background: 'transparent', overflowY: 'auto' }}
        />
        {/* Chat button */}
        <button
          type="submit"
          className={cn(
            "flex items-center justify-center rounded-full text-white font-semibold w-5 h-5 shadow transition-colors ml-1",
            input.trim()
              ? "bg-primary hover:bg-primary/90"
              : "bg-accent text-muted-foreground cursor-not-allowed"
          )}
          title="Chat"
          disabled={!input.trim()}
          aria-label="Chat"
        >
          <ArrowUp className="w-3 h-3" />
        </button>
      </form>
    </div>
  )
}
