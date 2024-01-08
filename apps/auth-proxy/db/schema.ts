import { int, mysqlSchema, mysqlTable, text } from "drizzle-orm/mysql-core";

export const mySchema = mysqlSchema("my_schema");

export const users = mySchema.table("users", {
  id: int("id").primaryKey().autoincrement(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
});
