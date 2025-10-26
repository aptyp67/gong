import { fetchUsers } from "./firebase";
import type { RawUser, User } from "../types/user";

let cachedUsers: User[] | null = null;

export async function getAllUsers() {
  if (!cachedUsers) {
    const rawUsers = await fetchUsers();
    cachedUsers = rawUsers.map(stripPassword);
  }

  return cachedUsers;
}

export async function getUserById(id: number) {
  const users = await getAllUsers();
  return users.find((user) => user.id === id) ?? null;
}

function stripPassword(user: RawUser): User {
  const safeUser = { ...user };
  delete (safeUser as Partial<RawUser>).password;
  return safeUser
}
