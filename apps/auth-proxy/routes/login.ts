import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { eventHandler } from "h3";

import { users } from "../db/schema";

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

const conn = connect(config);
const db = drizzle(conn);
const prepared = db.select().from(users).prepare();

export default eventHandler(async (event) => {
  console.log("event", event);

  return prepared.execute();
});
