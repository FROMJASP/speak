import type { UserProfile, UserPreferences, UserStats } from "@/types/user"
import { userData as mockUserData } from "@/data/user-data"

/**
 * BACKEND CONTRACT:
 * GET /api/me -> UserProfile
 * UserProfile must include: id, username, firstName, lastName, email, emailVerified, bio, avatarUrl, plan, signupDate, lastLogin, preferences, role
 */
// This is the abstraction layer for user data
// When migrating to a real database, only this file needs to change
export class UserService {
  // In a real implementation, this would fetch from an API or database
  static async getCurrentUser(): Promise<UserProfile> {
    // Simulate API call with a small delay
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Convert the mock data to match our interface
    // This mapping ensures we have a consistent data structure
    return {
      id: "1",
      username: mockUserData.username,
      firstName: mockUserData.firstName,
      lastName: mockUserData.lastName,
      email: mockUserData.email,
      emailVerified: mockUserData.emailVerified,
      bio: mockUserData.bio,
      avatarUrl: "/user-avatar.jpeg",
      plan: "Professional",
      signupDate: mockUserData.signupDate,
      lastLogin: mockUserData.lastLogin,
      preferences: {
        marketingEmails: mockUserData.marketingEmails,
        productUpdates: mockUserData.productUpdates,
        securityAlerts: mockUserData.securityAlerts,
        language: mockUserData.language,
        theme: "dark",
      },
      role: mockUserData.role || "user", // Ensure role is present
    }
  }

  static async updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    // Simulate API call with a small delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    // In a real implementation, this would send the updates to an API
    console.log("Updating user profile:", updates)

    // Return the updated user (in a real implementation, this would come from the API)
    const currentUser = await this.getCurrentUser()
    return { ...currentUser, ...updates }
  }

  static async updateUserPreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 150))

    // In a real implementation, this would send the updates to an API
    console.log("Updating user preferences:", preferences)

    // Return the updated preferences
    const currentUser = await this.getCurrentUser()
    return { ...currentUser.preferences, ...preferences }
  }

  static async getUserStats(): Promise<UserStats> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 120))

    // Mock stats data
    return {
      totalSessions: 42,
      totalAudioTime: 18000, // in seconds
      averageSessionLength: 428, // in seconds
    }
  }
}
