import Database from "better-sqlite3";
import { lt } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";

import type { NewUserLogins } from "~/db/schema-sqlite/user";
import { userLogins } from "~/db/schema-sqlite/user";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

export async function createUserLogin(userData: NewUserLogins) {
  return await db.insert(userLogins).values(userData);
}

export async function deleteUserLogins(date: Date) {
  const deletedLogins = await db
    .delete(userLogins)
    .where(lt(userLogins.logInAt, date));
  return deletedLogins;
}
