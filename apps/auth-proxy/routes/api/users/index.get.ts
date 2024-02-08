import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { eventHandler } from "h3";

import { user } from "~/db/schema/user";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);
/* It is only for testing */
export default eventHandler(async (event) => {
  const users = await db.select().from(user);
  return users;
});
