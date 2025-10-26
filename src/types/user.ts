export type RawUser = {
  email: string
  firstName: string
  id: number
  lastName: string
  managerId?: number
  password: string
  photo?: string
}

export type User = Omit<RawUser, 'password'>
