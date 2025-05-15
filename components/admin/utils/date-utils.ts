// Date formatting and time-since helpers for plan preview components

export function formatDateForDisplay(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  } catch (error) {
    console.error("Error formatting date:", error)
    return dateString
  }
}

export function formatTimeSince(dateString: string): string {
  try {
    const date = new Date(dateString)
    const today = new Date()
    if (isNaN(date.getTime())) return "recently"
    const diffTime = Math.abs(today.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays < 1) return "today"
    if (diffDays === 1) return "yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) {
      const diffWeeks = Math.floor(diffDays / 7)
      return `${diffWeeks} ${diffWeeks === 1 ? "week" : "weeks"} ago`
    }
    const monthDiff = today.getMonth() - date.getMonth() + 12 * (today.getFullYear() - date.getFullYear())
    return `${monthDiff} ${monthDiff === 1 ? "month" : "months"} ago`
  } catch (error) {
    console.error("Error calculating time since:", error)
    return "recently"
  }
}

export function calculateMonthsSince(dateString: string): number {
  try {
    const date = new Date(dateString)
    const today = new Date()
    if (isNaN(date.getTime())) return 0
    const monthDiff = today.getMonth() - date.getMonth() + 12 * (today.getFullYear() - date.getFullYear())
    return monthDiff
  } catch (error) {
    console.error("Error calculating months:", error)
    return 0
  }
} 