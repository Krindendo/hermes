import Database from "better-sqlite3";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";

import type { NewUserRefreshTokens } from "~/db/schema-sqlite/user";
import { userRefreshTokens } from "~/db/schema-sqlite/user";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

export async function createRefreshToken(token: NewUserRefreshTokens) {
  return await db.insert(userRefreshTokens).values(token);
}

export async function deleteRefreshToken(id: number) {
  const deletedLogins = await db
    .delete(userRefreshTokens)
    .where(eq(userRefreshTokens.id, id));
  return deletedLogins;
}

export async function deleteRefreshTokenWithUserId(userId: number) {
  const deletedLogins = await db
    .delete(userRefreshTokens)
    .where(eq(userRefreshTokens.userId, userId));
  return deletedLogins;
}
