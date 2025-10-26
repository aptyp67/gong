import type { RawUser } from '../types/user'

const BASE_URL = 'https://gongfetest.firebaseio.com'

async function fetchJson<T>(path: string) {
  const url = `${BASE_URL}/${path}.json`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return (await response.json()) as T
}

export async function fetchUserIdBySecret(secret: string) {
  return fetchJson<number | null>(`secrets/${secret}`)
}

export async function fetchUsers() {
  return fetchJson<RawUser[]>('users')
}
