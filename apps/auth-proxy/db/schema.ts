// import { int, mysqlSchema, mysqlTable, text } from "drizzle-orm/mysql-core";

// export const mySchema = mysqlSchema("my_schema");

// export const users = mySchema.table("users", {
//   id: int("id").primaryKey().autoincrement(),
//   firstName: text("first_name"),
//   lastName: text("last_name"),
//   email: text("email"),
// });

//pin ce se hashovati

/*
Korisnik otvara login
unosi email i pin(pin ima 4 cifre)
ako je to okej, onda preko mobilnog treba da potvrdi nastavak logovanja

proveravanje da li aplikacija stvarno pripada korisniku,
u aplikaciji korisnik unosi email
korisniku se salje email sa pinom
korisnik unosi taj pin u aplikaciju
*/
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
  loginProvider: text("login_provider"),
  logInAt: integer("created_at", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});
