import Database from "better-sqlite3";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";

import type { NewUserRefreshTokens } from "~/db/schema-sqlite/user";
import { userRefreshTokens } from "~/db/schema-sqlite/user";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

export async function getRefreshToken(
  userId: number,
  origin: "web" | "mobile",
) {
  return await db
    .select()
    .from(userRefreshTokens)
    .where(
      and(
        eq(userRefreshTokens.userId, userId),
        eq(userRefreshTokens.origin, origin),
      ),
    );
}

export async function createRefreshToken(token: NewUserRefreshTokens) {
  return await db.insert(userRefreshTokens).values(token);
}

export async function deleteRefreshToken(userId: number, token: string) {
  const deletedLogins = await db
    .delete(userRefreshTokens)
    .where(
      and(
        eq(userRefreshTokens.userId, userId),
        eq(userRefreshTokens.token, token),
      ),
    );
  return deletedLogins;
}

export async function deleteRefreshTokens(userId: number) {
  const deletedLogins = await db
    .delete(userRefreshTokens)
    .where(eq(userRefreshTokens.userId, userId));
  return deletedLogins;
}
