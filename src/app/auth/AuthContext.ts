import { createContext } from 'react'
import type { User } from '../../types/user'

export type AuthContextValue = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
