/**
 * Checks if the user has the admin role.
 *
 * @param user - The user object, expected to have a 'role' property.
 * @returns true if the user is an admin.
 *
 * TODO: Ensure backend provides user.role (e.g., via /api/me or session).
 */
export function isAdmin(user: { role?: string }): boolean {
  return user.role === "admin"
} 