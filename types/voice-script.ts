/**
 * VoiceScript type used for script data, both mock and real.
 */
export interface VoiceScript {
  id: string
  title: string
  content: string
  lastEdited: string
  timestamp: Date
  wordCount: number
  duration: number // in seconds
  category?: string
} 