import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { users } from "./user";

export const devices = sqliteTable("devices", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  verificationCode: text("verification_code").notNull(),
  ipAddress: text("ip_address").notNull(),
  createdAt: integer("create_at", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

export type NewDevice = typeof devices.$inferInsert;
export type Device = typeof devices.$inferSelect;
