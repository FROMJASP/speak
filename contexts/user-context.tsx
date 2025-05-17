"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { UserProfile, UserPreferences, UserStats } from "@/types/user"
import { UserService } from "@/lib/api/user-service"
import { ShieldCheck, ChevronUp, ChevronDown, Check, Loader2, UserCog } from "lucide-react"

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

/**
 * BACKEND CONTRACT:
 * GET /api/me -> UserProfile
 * UserProfile must include: id, username, firstName, lastName, email, emailVerified, bio, avatarUrl, plan, signupDate, lastLogin, preferences, role
 *
 * TODO: Ensure backend returns all required fields for UserProfile, especially 'role' for access control.
 */

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // DEV-ONLY: Mock user role switcher (bottom right, minimizable, animated, with loading, toggle switch)
  const [devRole, setDevRole] = useState<string | null>(null)
  const [minimized, setMinimized] = useState(true)
  const [switching, setSwitching] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" && user && devRole && user.role !== devRole) {
      setSwitching(true)
      setTimeout(() => {
        setUser({ ...user, role: devRole })
        setSwitching(false)
      }, 400)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [devRole])

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

  // Helper: get the intended role for the toggle
  const effectiveRole = devRole !== null ? devRole : user?.role

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading user...</div>
  }
  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error loading user: {error.message}</div>
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
      {process.env.NODE_ENV !== "production" && user && (
        <div className="fixed bottom-4 right-4 z-50">
          <div
            className={`transition-all duration-200 ${minimized ? "scale-90 opacity-80" : "scale-100 opacity-100"}`}
            style={{ minWidth: minimized ? 0 : 160 }}
          >
            {minimized ? (
              <button
                className="flex items-center gap-1 bg-muted text-primary px-3 py-2 rounded-full shadow border border-border hover:bg-muted/70 transition-all"
                onClick={() => setMinimized(false)}
                aria-label="Show dev role switcher"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
            ) : (
              <div className="bg-muted text-primary px-4 py-3 rounded shadow border border-border flex items-center gap-3 relative min-w-[160px]">
                <div className="relative">
                  <button
                    className="flex items-center gap-2 px-3 py-1.5 rounded bg-background border border-border text-primary font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                    onClick={() => setDropdownOpen((open) => !open)}
                    aria-haspopup="listbox"
                    aria-expanded={dropdownOpen}
                  >
                    {effectiveRole === "admin" ? "Admin" : "User"}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {dropdownOpen && (
                    <ul
                      className="absolute right-0 mt-2 w-28 bg-background border border-border rounded shadow-lg z-10"
                      role="listbox"
                      tabIndex={-1}
                    >
                      <li
                        className={`px-4 py-2 cursor-pointer hover:bg-muted/50 ${effectiveRole === "admin" ? "text-primary font-bold" : "text-muted-foreground"}`}
                        onClick={() => { setDevRole("admin"); setDropdownOpen(false) }}
                        role="option"
                        aria-selected={effectiveRole === "admin"}
                      >
                        Admin
                      </li>
                      <li
                        className={`px-4 py-2 cursor-pointer hover:bg-muted/50 ${effectiveRole === "user" ? "text-primary font-bold" : "text-muted-foreground"}`}
                        onClick={() => { setDevRole("user"); setDropdownOpen(false) }}
                        role="option"
                        aria-selected={effectiveRole === "user"}
                      >
                        User
                      </li>
                    </ul>
                  )}
                </div>
                <button
                  className="ml-2 p-1 rounded-full hover:bg-muted/70 absolute top-2 right-2"
                  onClick={() => setMinimized(true)}
                  aria-label="Minimize dev role switcher"
                  tabIndex={0}
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                {switching && (
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-1 flex items-center">
                    <svg className="h-4 w-4 animate-spin text-primary" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
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
