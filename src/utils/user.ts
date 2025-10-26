import type { User } from '../types/user'

export function formatFullName(user: User) {
  return `${user.firstName} ${user.lastName}`
}

export function createInitials(user: User) {
  const first = user.firstName.trim().charAt(0)
  const last = user.lastName.trim().charAt(0)
  return `${first}${last}`.toUpperCase()
}
