import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema-mysql/*.ts",
  driver: "better-sqlite",
  out: "./drizzle",
  dbCredentials: { url: "./sqlite.db" },
} satisfies Config;
