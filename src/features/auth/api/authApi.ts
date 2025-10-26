import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type SecretResponse = number | null

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://gongfetest.firebaseio.com',
  }),
  endpoints: (builder) => ({
    getUserIdBySecret: builder.query<number | null, string>({
      query: (secret) => `/secrets/${secret}.json`,
      transformResponse: (response: SecretResponse) => response,
    }),
  }),
})

export const { useLazyGetUserIdBySecretQuery } = authApi
