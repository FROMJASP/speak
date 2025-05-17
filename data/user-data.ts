// Get a date from 2 weeks ago
const getTwoWeeksAgoDate = (): string => {
  const today = new Date()
  const twoWeeksAgo = new Date(today)
  twoWeeksAgo.setDate(today.getDate() - 14) // Subtract 14 days
  return twoWeeksAgo.toISOString().split("T")[0] // Return in YYYY-MM-DD format
}

// Centralized user data that can be used across components
export const userData = {
  username: "fromjasp",
  firstName: "Jasper",
  lastName: "Hartsuijker",
  email: "jasper@stemacteren.nl",
  emailVerified: true,
  bio: "Product designer and developer based in Amsterdam.",
  marketingEmails: true,
  productUpdates: true,
  securityAlerts: true,
  language: "english",
  signupDate: getTwoWeeksAgoDate(),
  lastLogin: "2023-11-28",
  role: "admin",
}
