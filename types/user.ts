export interface UserProfile {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  emailVerified: boolean
  bio: string
  avatarUrl?: string
  plan: string
  signupDate: string
  lastLogin: string
  preferences: UserPreferences
  /**
   * User role for access control (e.g., 'admin', 'user').
   * BACKEND CONTRACT: Must be provided by /api/me or session endpoint.
   */
  role: string
}

export interface UserPreferences {
  marketingEmails: boolean
  productUpdates: boolean
  securityAlerts: boolean
  language: string
  theme: "light" | "dark" | "system"
}

export interface UserStats {
  totalSessions: number
  totalAudioTime: number
  averageSessionLength: number
}
