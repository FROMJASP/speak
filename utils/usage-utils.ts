/**
 * Get color class based on usage percentage and absolute time remaining
 * @param usagePercentage Percentage of usage (0-100)
 * @param remainingSeconds Absolute seconds remaining
 * @returns Tailwind color class for the progress bar
 */
export function getUsageColorClass(usagePercentage: number, remainingSeconds: number): string {
  // If less than 3 minutes remaining, always show red regardless of percentage
  if (remainingSeconds < 180) {
    return "bg-red-500" // Critical - very little time left
  } else if (usagePercentage < 60) {
    return "bg-green-500" // Plenty of time left
  } else if (usagePercentage < 80) {
    return "bg-amber-500" // Getting low
  } else {
    return "bg-red-500" // Critical - almost out of time
  }
}

// Update the getUsageStatusMessage function to have a consistent message for Company plan
export function getUsageStatusMessage(
  usagePercentage: number,
  remainingSeconds: number,
  planTier: string,
): { message: string; isWarning: boolean; hasLink?: boolean } | null {
  // If less than 3 minutes remaining, always show critical message
  if (remainingSeconds < 180) {
    // Special case for Company plan
    if (planTier === "Company") {
      return {
        message: "Need more time? Please contact us",
        isWarning: true,
        hasLink: true,
      }
    }
    return {
      message: "You have very little audio time left. Consider upgrading your plan.",
      isWarning: true,
    }
  } else if (usagePercentage >= 80) {
    // Special case for Company plan
    if (planTier === "Company") {
      return {
        message: "Need more time? Please contact us",
        isWarning: true,
        hasLink: true,
      }
    }
    return {
      message: "You're almost out of audio time. Consider upgrading your plan.",
      isWarning: true,
    }
  } else if (usagePercentage >= 60) {
    // Special case for Company plan
    if (planTier === "Company") {
      return {
        message: "Need more time? Please contact us",
        isWarning: true,
        hasLink: true,
      }
    }
    return {
      message: "Your audio time is getting low.",
      isWarning: true,
    }
  } else {
    // When usage is low (green), show upgrade suggestions based on plan
    switch (planTier) {
      case "Free":
        return {
          message: "Upgrade to Starter plan and get 45 min per month immediately",
          isWarning: false,
        }
      case "Starter":
        return {
          message: "Upgrade to Creator plan and get 2 hours per month immediately",
          isWarning: false,
        }
      case "Creator":
        return {
          message: "Upgrade to Professional plan and get 12 hours per month immediately",
          isWarning: false,
        }
      case "Professional":
        return {
          message: "Upgrade to Company plan and get 80 hours per month immediately",
          isWarning: false,
        }
      case "Company":
        return {
          message: "Need more time? Please contact us",
          isWarning: false,
          hasLink: true,
        }
      default:
        return null
    }
  }
}

// Add a new function to get the text color class based on usage percentage
export function getUsageTextColorClass(usagePercentage: number, remainingSeconds: number): string {
  // If less than 3 minutes remaining, always show red regardless of percentage
  if (remainingSeconds < 180) {
    return "text-red-500" // Critical - very little time left
  } else if (usagePercentage < 60) {
    return "" // Default text color - plenty of time left
  } else if (usagePercentage < 80) {
    return "text-amber-500" // Getting low - amber warning
  } else {
    return "text-red-500" // Critical - almost out of time
  }
}
