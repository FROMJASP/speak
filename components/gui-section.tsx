"use client"

import { useState } from "react"
import { Play, Pause, Download, Mic, ChevronUp, ChevronDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import ResizableDivider from "@/components/resizable-divider"

export default function GUISection() {
  const [audioSectionHeight, setAudioSectionHeight] = useState(70) // 70% default height for audio section
  const [isPlaying, setIsPlaying] = useState<number | null>(null)
  const [expandedSection, setExpandedSection] = useState<"audio" | "voice" | null>(null)

  // Sample audio files data
  const audioFiles = [
    { id: 1, name: "Audio 1", duration: "0:32", date: "Today, 12:05 PM" },
    { id: 2, name: "Audio 2", duration: "1:15", date: "Today, 11:58 AM" },
    { id: 3, name: "Audio 3", duration: "0:45", date: "Today, 11:45 AM" },
    { id: 4, name: "Audio 4", duration: "2:03", date: "Today, 11:30 AM" },
    { id: 5, name: "Audio 5", duration: "0:58", date: "Today, 11:22 AM" },
    { id: 6, name: "Audio 6", duration: "1:47", date: "Today, 11:15 AM" },
    { id: 7, name: "Audio 7", duration: "0:36", date: "Today, 11:08 AM" },
    { id: 8, name: "Audio 8", duration: "1:24", date: "Today, 11:01 AM" },
    { id: 9, name: "Audio 9", duration: "0:52", date: "Today, 10:55 AM" },
  ]

  const handleResize = (newHeight: number) => {
    setAudioSectionHeight(newHeight)
  }

  const togglePlay = (id: number) => {
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

  return (
    <div className="h-full flex flex-col bg-[#111] rounded-xl border border-border/20 overflow-hidden">
      {/* Audio Generation Display */}
      <div
        className={cn(
          "flex flex-col transition-all duration-300 ease-in-out overflow-hidden",
          expandedSection === "voice"
            ? "h-[10%]"
            : expandedSection === "audio"
              ? "h-[90%]"
              : `h-[${audioSectionHeight}%]`,
        )}
        style={{
          height: `${expandedSection === "voice" ? 10 : expandedSection === "audio" ? 90 : audioSectionHeight}%`,
        }}
      >
        <div className="flex items-center justify-between px-6 py-3 border-b border-border/10">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-lg text-white">Audio Generation</h2>
            <span className="text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-400">9 files</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-gray-400 hover:text-white"
            onClick={() => toggleExpand("audio")}
          >
            {expandedSection === "audio" ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {audioFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center px-4 py-3 rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-colors bg-[#1a1a1a]"
              >
                <div className="flex-shrink-0 mr-3">
                  <div className="h-6 w-6 rounded-full bg-gray-800 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex items-center">
                    <span className="text-gray-300 font-medium truncate">{file.name}</span>
                    <span className="ml-2 text-xs text-gray-500">{file.duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-auto">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                    onClick={() => togglePlay(file.id)}
                  >
                    {isPlaying === file.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>

                  <span className="text-xs text-gray-500">{file.date}</span>

                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resizable Divider */}
      <ResizableDivider
        onResize={handleResize}
        initialPosition={audioSectionHeight}
        minLeftWidth={10}
        minRightWidth={10}
        orientation="horizontal"
      />

      {/* Voice Creator */}
      <div
        className={cn(
          "flex flex-col transition-all duration-300 ease-in-out overflow-hidden",
          expandedSection === "audio"
            ? "h-[10%]"
            : expandedSection === "voice"
              ? "h-[90%]"
              : `h-[${100 - audioSectionHeight}%]`,
        )}
        style={{
          height: `${expandedSection === "audio" ? 10 : expandedSection === "voice" ? 90 : 100 - audioSectionHeight}%`,
        }}
      >
        <div className="flex items-center justify-between px-6 py-3 border-b border-border/10">
          <h2 className="font-semibold text-lg text-white">Voice Creator</h2>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-gray-400 hover:text-white"
            onClick={() => toggleExpand("voice")}
          >
            {expandedSection === "voice" ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center">
                <Mic className="h-6 w-6 text-gray-300" />
              </div>
              <div>
                <h3 className="font-medium text-white">Default Voice</h3>
                <p className="text-sm text-gray-400">Natural sounding voice with neutral accent</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Pitch</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="50"
                  className="w-full h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-300"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-1">Speed</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="50"
                  className="w-full h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-300"
                />
              </div>

              <div className="pt-2">
                <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white">Generate Audio</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
