import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RawUser, User } from '../../../types/user'

export const hierarchyApi = createApi({
  reducerPath: 'hierarchyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://gongfetest.firebaseio.com',
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users.json',
      transformResponse: (response: RawUser[]) =>
        response.map((user) => {
          const { password, ...safeUser } = user
          void password
          return safeUser
        }),
    }),
  }),
})

export const { useGetUsersQuery } = hierarchyApi
