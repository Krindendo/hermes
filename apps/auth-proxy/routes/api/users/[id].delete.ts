import Database from "better-sqlite3";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { eventHandler } from "h3";

import { users } from "~/db/schema-sqlite/user";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  await db
    .delete(users)
    .where(eq(users.id, Number(id)))
    .returning();

  return { message: "user is deleted" };
});
