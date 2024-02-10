import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const device = sqliteTable("device", {
  id: integer("id").primaryKey({ autoIncrement: true }),
});
