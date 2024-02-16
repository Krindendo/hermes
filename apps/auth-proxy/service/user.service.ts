import Database from "better-sqlite3";
import type { SQL } from "drizzle-orm";
import { eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";

import type { NewUser } from "~/db/schema-sqlite/user";
import { users } from "~/db/schema-sqlite/user";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

export async function getUserById(userId: number) {
  const [result] = await db.select().from(users).where(eq(users.id, userId));

  if (!result) {
    throw new ErrorNotFound(`User with ID ${userId} not found`);
  }
  return result;
}

export async function getUserByEmail(email: string) {
  const [result] = await db.select().from(users).where(eq(users.email, email));

  if (!result) {
    throw new ErrorNotFound(`User with email ${email} not found`);
  }
  return result;
}

export async function getUsers(filter: SQL<unknown>) {
  return await db.select().from(users).where(filter);
}

export async function createUser(userData: NewUser) {
  return await db.insert(users).values(userData);
}

export async function updateUserById(
  userId: number,
  userData: Partial<NewUser>,
) {
  const updatedUser = await db
    .update(users)
    .set(userData)
    .where(eq(users.id, userId));

  if (!updatedUser) {
    throw new ErrorNotFound(`User with ID ${userId} not found`);
  }
  return updatedUser;
}

export async function deleteUserById(userId: number) {
  const deletedUser = await db.delete(users).where(eq(users.id, userId));
  if (!deletedUser) {
    throw new ErrorNotFound(`User with ID ${userId} not found`);
  }
  return deletedUser;
}

/* --- prepares --- */

export function getUserByEmailPrep() {
  return db
    .select()
    .from(users)
    .where(eq(users.id, sql.placeholder("email")))
    .prepare();
}
