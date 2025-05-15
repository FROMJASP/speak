/**
 * Generates a title from a message by taking the first few words
 * @param message The message to generate a title from
 * @param maxLength Maximum length of the title
 * @returns A title generated from the message
 */
export function generateTitleFromMessage(message: string, maxLength = 30): string {
  // Remove extra whitespace and trim
  const cleanMessage = message.trim().replace(/\s+/g, " ")

  if (cleanMessage.length <= maxLength) {
    return cleanMessage
  }

  // Take the first few words that fit within maxLength
  const words = cleanMessage.split(" ")
  let title = ""

  for (const word of words) {
    if ((title + " " + word).length <= maxLength - 3) {
      // -3 for the ellipsis
      title += (title ? " " : "") + word
    } else {
      break
    }
  }

  return title + "..."
}

/**
 * Checks if a message is suitable for generating a title
 * @param message The message to check
 * @returns True if the message is suitable for a title
 */
export function isSuitableForTitle(message: string): boolean {
  // Message should be at least 3 characters long
  if (!message || message.trim().length < 3) {
    return false
  }

  // Message shouldn't be too short or just symbols
  const cleanMessage = message.trim().replace(/[^\w\s]/g, "")
  if (cleanMessage.length < 3) {
    return false
  }

  return true
}
