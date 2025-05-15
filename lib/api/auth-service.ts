// This service handles authentication-related operations
// When migrating to a real database, only this file needs to change

export class AuthService {
  // In a real implementation, this would call an API endpoint
  static async login(email: string, password: string): Promise<{ success: boolean; message?: string }> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Mock login logic
    if (email === "jasper@stemacteren.nl" && password === "password") {
      return { success: true }
    }

    return {
      success: false,
      message: "Invalid email or password",
    }
  }

  static async logout(): Promise<void> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 200))

    // In a real implementation, this would clear session cookies, tokens, etc.
    console.log("User logged out")
  }

  static async resetPassword(email: string): Promise<{ success: boolean; message: string }> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock password reset logic
    return {
      success: true,
      message: "If an account exists with that email, we've sent password reset instructions.",
    }
  }

  static async isAuthenticated(): Promise<boolean> {
    // Simulate API call to check authentication status
    await new Promise((resolve) => setTimeout(resolve, 100))

    // In a real implementation, this would check for valid tokens/session
    return true // Always return true for the mock
  }
}
