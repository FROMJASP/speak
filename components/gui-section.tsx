"use client"

import { useState } from "react"
import { Play, Pause, Download, Mic, ChevronUp, ChevronDown, Check, ChevronRight, ChevronDown as ChevronDownIcon, RotateCcw } from "lucide-react"
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

  return (
    <div className="h-full flex flex-col bg-background rounded-xl border border-border overflow-hidden">
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
            <h2 className="font-semibold text-lg text-foreground">Audio Generation</h2>
            <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">{audioFiles.length} {audioFiles.length === 1 ? 'file' : 'files'}</span>
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
          {audioFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-12">
              <div className="text-4xl mb-4">🔊</div>
              <div className="text-lg font-semibold mb-2">No audio files yet</div>
              <div className="text-base">Once you have a script, click <span className='font-bold'>Generate</span> in the script editor and your audio files will show up here.</div>
            </div>
          ) : (
            <div className="space-y-2">
              {audioFiles.map((file, idx) => {
                const isExpanded = expandedAudio === file.id
                const isFilePlaying = isPlaying === file.id
                const versionNumber = `Version ${audioFiles.length - idx}`
                return (
                  <div
                    key={file.id}
                    className="flex flex-col px-4 py-3 rounded-lg border border-border hover:border-accent transition-colors bg-card"
                  >
                    <div className="flex items-center w-full">
                      {/* Expand/Collapse Arrow */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0 mr-2 text-muted-foreground hover:text-foreground"
                        onClick={() => setExpandedAudio(isExpanded ? null : file.id)}
                        aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                      >
                        {isExpanded ? <ChevronDownIcon className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                      </Button>
                      {/* Version Number */}
                      <span className="font-semibold text-base mr-4 min-w-[90px]">{versionNumber}</span>
                      {/* File Name & Duration */}
                      <span className="text-foreground font-medium truncate flex-1">{file.name}</span>
                      <span className="ml-2 text-xs text-muted-foreground min-w-[48px] text-right">{file.duration}</span>
                      {/* Restore Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-4 px-3 py-1 h-8 text-xs font-medium border-border"
                        disabled
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />Restore
                      </Button>
                      {/* Play Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0 ml-2 text-muted-foreground hover:text-foreground"
                        onClick={() => togglePlay(file.id)}
                        aria-label={isFilePlaying ? 'Pause' : 'Play'}
                      >
                        {isFilePlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>
                      {/* Download Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0 ml-2 text-muted-foreground hover:text-foreground"
                        aria-label="Download"
                      >
                        <Download className="h-5 w-5" />
                      </Button>
                    </div>
                    {/* Audio Slider (when playing) */}
                    {isFilePlaying && (
                      <div className="w-full flex items-center mt-2 mb-1 px-2">
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={audioProgress[file.id] || 0}
                          onChange={e => setAudioProgress({ ...audioProgress, [file.id]: Number(e.target.value) })}
                          className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground"
                        />
                        <span className="ml-2 text-xs text-muted-foreground">{audioProgress[file.id] || 0}%</span>
                      </div>
                    )}
                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-2 mb-1 px-2">
                        <div className="text-xs font-semibold mb-1 text-muted-foreground">Generation steps:</div>
                        <ul className="list-disc pl-5 text-sm text-foreground space-y-1">
                          <li>emphasize 'the great grandmother'</li>
                          <li>longer break after first sentence</li>
                        </ul>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
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
          <h2 className="font-semibold text-lg text-foreground">Voice Creator</h2>
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
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-12">
            <div className="text-4xl mb-2">🗣️</div>
            <div className="text-lg font-semibold mb-1">No voices created yet</div>
            <div className="text-base mb-2">Use the chat below to describe the voice you want to create.</div>
            {/* Chat UI placeholder, only show when expanded */}
            {expandedSection === "voice" && (
              <div className="mt-8 w-full max-w-md mx-auto border-t border-border pt-4">
                <div className="mb-2 text-sm text-muted-foreground font-medium">Describe the voice you want to create:</div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. Deep, warm, British accent..."
                    disabled
                  />
                  <Button className="bg-primary text-white" disabled>Send</Button>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">(Chat coming soon!)</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
