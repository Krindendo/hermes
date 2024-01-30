//import { connect } from "@planetscale/database";
//import { drizzle } from "drizzle-orm/planetscale-serverless";

import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { eventHandler } from "h3";

import { user } from "../db/schema";

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

//const conn = connect(config);
const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);
const prepared = db.select().from(user).prepare();

export default eventHandler(async (event) => {
  console.log("event", event);
  await db.insert(user).values({
    email: "example@gmail.com",
    securityStamp: "",
  });
  return prepared.execute();
});
