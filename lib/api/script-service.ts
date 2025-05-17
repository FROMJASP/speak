import type { VoiceScript } from "@/types/voice-script"

/**
 * BACKEND CONTRACT:
 * GET /api/scripts -> VoiceScript[]
 * Each VoiceScript: { id, title, content, lastEdited, timestamp, wordCount, duration, category? }
 *
 * TODO: Ensure backend returns all required fields for VoiceScript type.
 */

/**
 * Fetch all scripts for the current user.
 * TODO: Replace with real API call to `/api/scripts`.
 * Expects: GET /api/scripts -> VoiceScript[]
 */
export async function getScripts(): Promise<VoiceScript[]> {
  // TODO: Replace with real API call
  const { sampleScripts } = await import("@/data/sample/sample-scripts")
  return sampleScripts
} 