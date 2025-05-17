import type { Chat } from "@/types/chat"

/**
 * BACKEND CONTRACT:
 * GET /api/chats -> Chat[]
 * Each Chat: { id, name, lastEdited, timestamp, description }
 *
 * TODO: Ensure backend returns all required fields for Chat type.
 */

/**
 * Fetch all chats for the current user.
 * TODO: Replace with real API call to `/api/chats`.
 * Expects: GET /api/chats -> Chat[]
 */
export async function getChats(): Promise<Chat[]> {
  // TODO: Replace with real API call
  const { sampleChats } = await import("@/data/sample/sample-chats")
  return sampleChats
} 