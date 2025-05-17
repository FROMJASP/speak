/**
 * Format seconds into a human-readable time format
 * @param seconds Number of seconds
 * @returns Human-readable time string
 */
export function formatTimeHumanReadable(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  if (minutes < 60) {
    if (remainingSeconds === 0) {
      return `${minutes}m`
    }
    return `${minutes}m ${remainingSeconds}s`
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (remainingMinutes === 0) {
    return `${hours}h`
  }

  if (remainingSeconds === 0) {
    return `${hours}h ${remainingMinutes}m`
  }

  // For very precise display, include hours, minutes and seconds
  return `${hours}h ${remainingMinutes}m ${remainingSeconds}s`
}

/**
 * Format seconds into a compact human-readable time format
 * Simplifies the display by only showing the most significant units
 * @param seconds Number of seconds
 * @returns Compact human-readable time string
 */
export function formatTimeCompact(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  if (minutes < 60) {
    if (remainingSeconds === 0) {
      return `${minutes}m`
    }
    return `${minutes}m ${remainingSeconds}s`
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (remainingMinutes === 0) {
    return `${hours}h`
  }

  // For hours + minutes, don't show seconds to save space
  return `${hours}h ${remainingMinutes}m`
}

/**
 * Format seconds into minutes and seconds
 * @param seconds Number of seconds
 * @returns Formatted time string
 */
export function formatTimeFromSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  if (minutes < 60) {
    return `${minutes}m ${remainingSeconds}s`
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (remainingMinutes === 0) {
    return `${hours}h`
  }

  return `${hours}h ${remainingMinutes}m`
}

/**
 * Format minutes into a human-readable time format (e.g., 1h 30m)
 * @param minutes Number of minutes
 * @returns Human-readable time string
 */
export function formatAudioTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (remainingMinutes === 0) {
    return `${hours}h`
  }
  return `${hours}h ${remainingMinutes}m`
}

/**
 * Format minutes into a compact time format (e.g., 1h)
 * @param minutes Number of minutes
 * @returns Compact time string
 */
export function formatAudioTimeCompact(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`
  }
  const hours = Math.floor(minutes / 60)
  return `${hours}h`
}

/**
 * Format minutes into a human-readable extra time format (e.g., 1hr 30min)
 * @param minutes Number of minutes
 * @returns Extra time string
 */
export function formatAudioTimeExtra(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}min`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (remainingMinutes === 0) {
    return `${hours}hr`
  }
  return `${hours}hr ${remainingMinutes}min`
}
