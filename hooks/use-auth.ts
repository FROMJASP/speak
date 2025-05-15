"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthService } from "@/lib/api/auth-service"
import { useUser } from "@/contexts/user-context"

export function useAuth() {
  const router = useRouter()
  const { refreshUserData } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuthenticated = await AuthService.isAuthenticated()
        if (!isAuthenticated) {
          // Redirect to login if not authenticated
          router.push("/login")
        }
      } catch (err) {
        console.error("Auth check failed:", err)
      }
    }

    checkAuth()
  }, [router])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await AuthService.login(email, password)

      if (result.success) {
        // Refresh user data after successful login
        await refreshUserData()
        router.push("/")
        return true
      } else {
        setError(result.message || "Login failed")
        return false
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error("Login error:", err)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)

    try {
      await AuthService.logout()
      router.push("/login")
    } catch (err) {
      console.error("Logout error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await AuthService.resetPassword(email)
      return result
    } catch (err) {
      setError("Failed to reset password")
      console.error("Password reset error:", err)
      return { success: false, message: "An unexpected error occurred" }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    login,
    logout,
    resetPassword,
    isLoading,
    error,
  }
}
