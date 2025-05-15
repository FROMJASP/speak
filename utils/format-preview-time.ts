/**
 * Format time for preview display when hovering over plans
 * For times > 1 hour, only shows hours and minutes (no seconds)
 * @param seconds Number of seconds
 * @returns Formatted time string
 */
export function formatPreviewTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  if (minutes < 60) {
    // Less than an hour, show minutes and seconds
    return `${minutes}m ${remainingSeconds}s`
  }

  // More than an hour, only show hours and minutes
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (remainingMinutes === 0) {
    return `${hours}hr`
  }

  return `${hours}hr ${remainingMinutes}min`
}
