import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { encode } from '../../utils/encode'
import { fetchUserIdBySecret } from '../../services/firebase'
import { getUserById } from '../../services/users'
import type { User } from '../../types/user'
import { AuthContext } from './AuthContext'

const STORAGE_KEY = 'gong-auth-user'

function readUserFromStorage() {
  if (typeof window === 'undefined') {
    return null
  }

  const stored = window.sessionStorage.getItem(STORAGE_KEY)

  if (!stored) {
    return null
  }

  try {
    return JSON.parse(stored) as User
  } catch {
    return null
  }
}

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => readUserFromStorage())

  const persistUser = useCallback((current: User | null) => {
    if (typeof window === 'undefined') {
      return
    }

    if (current) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current))
    } else {
      window.sessionStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const login = useCallback(
    async (email: string, password: string) => {
      const trimmedEmail = email.trim()
      const secret = encode(trimmedEmail, password)
      const userId = await fetchUserIdBySecret(secret)

      if (!userId) {
        throw new Error('Invalid credentials')
      }

      const match = await getUserById(userId)

      if (!match) {
        throw new Error('User not found')
      }

      const candidate: User = {
        ...match,
      }

      setUser(candidate)
      persistUser(candidate)
    },
    [persistUser],
  )

  const logout = useCallback(() => {
    setUser(null)
    persistUser(null)
  }, [persistUser])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
