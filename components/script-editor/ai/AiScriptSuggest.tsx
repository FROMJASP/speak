import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ArrowUpCircle, Building2, User, Film, GraduationCap, FileText, ChevronDown, AtSign, Sparkles, Paperclip } from "lucide-react"
import { Tooltip } from "@/components/ui/tooltip"

const SUGGESTIONS = [
  {
    title: "Company Commercial",
    label: "A commercial about my company",
    emoji: "💼",
    script: `Are you ready to take your business to the next level? At {username} Solutions, we believe in making your vision a reality. Our team of experts is dedicated to providing innovative solutions tailored to your needs. Whether you're a startup or an established business, we have the tools and experience to help you succeed. Join us today and experience innovation like never before. {username} Solutions—where your success is our mission!`,
  },
  {
    title: "Angry Grandma",
    label: "An angry old grandma from a cartoon show",
    emoji: "👵",
    script: `Oh, you youngsters these days! Back in my day, we didn't have all these fancy gadgets and gizmos. We had to walk ten miles in the snow just to get a loaf of bread! Now you're all glued to your screens, tapping and swiping like it's going out of style. Hmph! If you want to hear a real story, come sit by me—just don't you dare touch my knitting! Now get off my lawn before I call the cartoon police!`,
  },
  {
    title: "Foxes Documentary Trailer",
    label: "A trailer for a new documentary about foxes",
    emoji: "🦊",
    script: `In the heart of the wild, a mysterious creature roams—clever, elusive, and endlessly fascinating. Join us on an unforgettable journey as we uncover the secret life of foxes. From bustling forests to quiet meadows, witness their daily adventures, family bonds, and survival instincts. 'Foxes: The Secret Life'—a breathtaking new documentary, coming soon to your screen. Discover the world through the eyes of nature's most enchanting trickster.`,
  },
  {
    title: "How to Learn a New Skill",
    label: "An educational video explaining how to learn a new skill",
    emoji: "🎓",
    script: `Learning something new can be challenging, but with patience and practice, anyone can master a skill. Start by breaking the skill down into small, manageable steps. Set realistic goals, celebrate your progress, and don't be afraid to make mistakes—they're part of the journey! Stay curious, seek feedback, and remember: every expert was once a beginner. With dedication and the right mindset, you can achieve anything you set your mind to!`,
  }
]

export default function AiScriptSuggest({ onSuggestion, username, onClose }: { onSuggestion: (data: { title: string, script: string }) => void, username?: string, onClose?: () => void }) {
  const [inputValue, setInputValue] = useState("")
  const [messageShown, setMessageShown] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-focus and select input on mount
  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  // Track if the message has ever been shown
  useEffect(() => {
    if (inputValue.length > 0 && !messageShown) setMessageShown(true)
  }, [inputValue, messageShown])

  // Close on outside click (use capture phase for reliability)
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        onClose?.()
      }
    }
    document.addEventListener("mousedown", handleClick, true)
    return () => document.removeEventListener("mousedown", handleClick, true)
  }, [onClose])

  // Build recommendations, prepending 'I'll write my own' if messageShown
  const recommendations = messageShown
    ? [
        {
          title: "Write My Own",
          label: "I'll write my own",
          emoji: "✍️",
          isCustom: true,
        },
        ...SUGGESTIONS,
      ]
    : SUGGESTIONS

  return (
    <div ref={overlayRef} className="relative flex flex-col items-center">
      {/* Input row styled like the screenshot */}
      <div className="flex items-center gap-3 px-2 py-2 w-[700px] bg-white dark:bg-background border border-border rounded-md shadow-md z-20 relative" style={{minHeight: 56}}>
        <div className="rounded-full bg-muted flex items-center justify-center w-10 h-10 ml-1">
          <Image src="/favicon.svg" alt="AI" width={22} height={22} />
        </div>
        <input
          ref={inputRef}
          type="text"
          className="flex-1 bg-transparent outline-none border-none text-base text-foreground placeholder:text-muted-foreground px-3 py-2"
          placeholder="What should our script be about?"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          style={{minWidth: 0}}
        />
        <div className="flex items-center gap-2 mr-2">
          <Tooltip label="Enhance">
            <button className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-accent/30 transition-colors">
              <Sparkles className="h-5 w-5 text-muted-foreground" />
            </button>
          </Tooltip>
          <Tooltip label="Upload file">
            <button className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-accent/30 transition-colors">
              <Paperclip className="h-5 w-5 text-muted-foreground" />
            </button>
          </Tooltip>
          <Tooltip label="Send">
            <button className="flex items-center justify-center w-9 h-9 rounded-md bg-muted hover:bg-accent transition-colors shadow-sm">
              <ArrowUpCircle className="h-6 w-6 text-muted-foreground" />
            </button>
          </Tooltip>
        </div>
      </div>
      {/* Suggestions menu */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[70px] w-[700px] bg-white dark:bg-background border border-border rounded-2xl shadow-2xl p-0 flex flex-col items-stretch overflow-hidden z-10 animate-fadeIn" style={{marginTop: 8}}>
        <div className="relative min-h-[220px] flex flex-col items-stretch justify-center">
          <div
            className={cn(
              "transition-all duration-300",
              inputValue.length > 0 ? "opacity-60 blur-sm pointer-events-none" : "opacity-100 blur-0"
            )}
          >
            {recommendations.map((s, i) => (
              <button
                key={s.label}
                className={cn(
                  "w-full flex items-center gap-5 px-6 py-5 text-left group transition-all duration-150",
                  "hover:bg-accent/20 active:bg-accent/40 focus-visible:bg-accent/30",
                  i !== recommendations.length - 1 && "border-b border-border"
                )}
                style={{
                  borderRadius: i === 0 ? "16px 16px 0 0" : i === recommendations.length - 1 ? "0 0 16px 16px" : undefined
                }}
                onClick={() => {
                  if (s.isCustom && onClose) {
                    onClose()
                    return
                  }
                  const script = s.script?.replace?.('{username}', username || 'Your')
                  onSuggestion({ title: s.title, script })
                }}
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-muted/70 text-3xl group-hover:scale-110 transition-transform">
                  {s.emoji}
                </span>
                <span className="text-base font-sans font-medium text-foreground group-hover:text-primary leading-snug">
                  {s.label}
                </span>
              </button>
            ))}
          </div>
          {inputValue.length > 0 && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-white/90 dark:bg-background/90 rounded-xl shadow-lg px-8 py-6 flex flex-col items-center animate-fadeIn2 border border-border">
                <span className="text-lg font-sans font-semibold text-foreground text-center">
                  Prompt a script will come soon to <span className="text-primary font-bold">SPEAK</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.18s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn2 {
          animation: fadeIn2 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn2 {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
} 