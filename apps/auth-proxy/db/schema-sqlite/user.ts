import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  accessFailedCount: integer("accessFailedCount").default(0),
  pin: text("pin").notNull(),
  securityStamp: text("security_stamp").notNull(),
  email: text("email").unique(),
  emailConfirmationCode: text("email_confirmation_code").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  isDeleted: integer("is_deleted", { mode: "boolean" }).default(false),
  isEmailConfirmed: integer("is_email_confirmed", { mode: "boolean" }).default(
    false,
  ),
  isLockoutEnabled: integer("is_lockout_enabled", { mode: "boolean" }).default(
    false,
  ),
  lockoutEndDateUtc: integer("lockout_end_date_utc", { mode: "timestamp_ms" }),
  createdAt: integer("create_at", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

export type NewUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const userTokens = sqliteTable("user_tokens", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  token: text("token"),
  createdAt: integer("create_at", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

export type NewUserTokens = typeof userTokens.$inferInsert;
export type UserTokens = typeof userTokens.$inferSelect;

export const userLogins = sqliteTable("user_logins", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  isSuccess: integer("is_success", { mode: "boolean" }).notNull(),
  loginProvider: text("login_provider", { enum: ["web", "mobile"] }).notNull(),
  logInAt: integer("created_at", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

export type NewUserLogins = typeof userLogins.$inferInsert;
export type UserLogins = typeof userLogins.$inferSelect;
