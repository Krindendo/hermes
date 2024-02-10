import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  accessFailedCount: integer("accessFailedCount"),
  pin: text("pin"),
  securityStamp: text("security_stamp").notNull(),
  email: text("email").unique(),
  emailConfirmationCode: text("email_confirmation_code"),
  isActive: integer("is_active", { mode: "boolean" }),
  isDeleted: integer("is_deleted", { mode: "boolean" }),
  isEmailConfirmed: integer("is_email_confirmed", { mode: "boolean" }),
  isLockoutEnabled: integer("is_lockout_enabled", { mode: "boolean" }),
  lockoutEndDateUtc: integer("lockout_end_date_utc", { mode: "timestamp_ms" }),
  createdAt: integer("create_at", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

export const userToken = sqliteTable("user_token", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  token: text("token"),
  createdAt: integer("create_at", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

export const userLogins = sqliteTable("user_logins", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  isSuccess: integer("is_success", { mode: "boolean" }).notNull(),
  loginProvider: text("login_provider").notNull(),
  logInAt: integer("created_at", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});
