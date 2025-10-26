import { configureStore } from '@reduxjs/toolkit'
import { hierarchyApi } from '../features/hierarchy/api/hierarchyApi'
import { authApi } from '../features/auth/api/authApi'
import { authReducer } from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [hierarchyApi.reducerPath]: hierarchyApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      hierarchyApi.middleware,
      authApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
