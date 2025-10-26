import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { encode } from '../../utils/encode'
import { authApi } from './api/authApi'
import { hierarchyApi } from '../hierarchy/api/hierarchyApi'
import type { User } from '../../types/user'

type AuthState = {
  user: User | null
  status: 'idle' | 'loading' | 'ready' | 'error'
  error: string | null
}

type Credentials = {
  email: string
  password: string
}

const STORAGE_KEY = 'gong-auth-user'

function loadUserFromSession(): User | null {
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

function persistUser(user: User | null) {
  if (typeof window === 'undefined') {
    return
  }

  if (user) {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  } else {
    window.sessionStorage.removeItem(STORAGE_KEY)
  }
}

const sessionUser = loadUserFromSession()

const initialState: AuthState = {
  user: sessionUser,
  status: sessionUser ? 'ready' : 'idle',
  error: null,
}

export const login = createAsyncThunk<
  User,
  Credentials,
  { rejectValue: string }
>('auth/login', async ({ email, password }, { dispatch, rejectWithValue }) => {
  const normalizedEmail = email.trim()
  const secret = encode(normalizedEmail, password)
  const secretQuery = dispatch(
    authApi.endpoints.getUserIdBySecret.initiate(secret),
  )

  const usersQuery = dispatch(hierarchyApi.endpoints.getUsers.initiate())

  try {
    const userId = await secretQuery.unwrap()

    if (!userId) {
      return rejectWithValue('Invalid email or password.')
    }

    const users = await usersQuery.unwrap()
    const match = users.find((currentUser) => currentUser.id === userId)

    if (!match) {
      return rejectWithValue('User not found.')
    }

    return match
  } catch {
    return rejectWithValue('Unable to load user profile.')
  } finally {
    secretQuery.unsubscribe()
    usersQuery.unsubscribe()
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.status = 'idle'
      state.error = null
      persistUser(null)
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.status = 'ready'
        state.error = null
        persistUser(action.payload)
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload ?? 'Login failed.'
      })
  },
})

export const { logout, clearError } = authSlice.actions
export const authReducer = authSlice.reducer
