"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { UserProfile, UserPreferences, UserStats } from "@/types/user"
import { UserService } from "@/lib/api/user-service"

interface UserContextType {
  user: UserProfile | null
  userStats: UserStats | null
  isLoading: boolean
  error: Error | null
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>
  refreshUserData: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchUserData = async () => {
    try {
      setIsLoading(true)
      const userData = await UserService.getCurrentUser()
      setUser(userData)

      const stats = await UserService.getUserStats()
      setUserStats(stats)

      setError(null)
    } catch (err) {
      console.error("Error fetching user data:", err)
      setError(err instanceof Error ? err : new Error("Failed to fetch user data"))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      setIsLoading(true)
      const updatedUser = await UserService.updateUserProfile(updates)
      setUser(updatedUser)
    } catch (err) {
      console.error("Error updating user profile:", err)
      setError(err instanceof Error ? err : new Error("Failed to update user profile"))
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const updatePreferences = async (preferences: Partial<UserPreferences>) => {
    try {
      setIsLoading(true)
      const updatedPreferences = await UserService.updateUserPreferences(preferences)

      if (user) {
        setUser({
          ...user,
          preferences: updatedPreferences,
        })
      }
    } catch (err) {
      console.error("Error updating user preferences:", err)
      setError(err instanceof Error ? err : new Error("Failed to update user preferences"))
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const refreshUserData = async () => {
    await fetchUserData()
  }

  return (
    <UserContext.Provider
      value={{
        user,
        userStats,
        isLoading,
        error,
        updateProfile,
        updatePreferences,
        refreshUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
