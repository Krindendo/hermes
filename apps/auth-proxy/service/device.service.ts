import Database from "better-sqlite3";
import type { SQL } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";

import { device } from "~/db/schema-sqlite/device";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);
