import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { clearError, logout } from './authSlice'

export function useAuth() {
  const dispatch = useAppDispatch()
  const authState = useAppSelector((state) => state.auth)

  const handleLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  const resetError = useCallback(() => {
    dispatch(clearError())
  }, [dispatch])

  return {
    ...authState,
    logout: handleLogout,
    clearError: resetError,
  }
}
