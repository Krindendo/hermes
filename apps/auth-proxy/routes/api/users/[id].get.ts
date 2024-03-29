import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { defineEventHandler } from "h3";

import { users } from "~/db/schema-sqlite/user";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  return [];
});
