import Database from "better-sqlite3";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";

import type { NewUserAcceptTokens } from "~/db/schema-sqlite/user";
import { userAcceptTokens } from "~/db/schema-sqlite/user";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

export async function createAcceptToken(token: NewUserAcceptTokens) {
  return await db.insert(userAcceptTokens).values(token);
}

export async function getAcceptTokenByUserId(userId: number) {
  const [result] = await db
    .select()
    .from(userAcceptTokens)
    .where(eq(userAcceptTokens.userId, userId));

  if (!result) {
    throw new ErrorNotFound(`User with email ${userId} not found`);
  }
  return result;
}

export async function deleteAcceptToken(id: number) {
  const deletedLogins = await db
    .delete(userAcceptTokens)
    .where(eq(userAcceptTokens.id, id));
  return deletedLogins;
}
