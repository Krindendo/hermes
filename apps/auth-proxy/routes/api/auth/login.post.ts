/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//import { connect } from "@planetscale/database";
//import { drizzle } from "drizzle-orm/planetscale-serverless";

import Database from "better-sqlite3";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { eventHandler } from "h3";
import { z } from "zod";

import { user } from "~/db/schema/user";

const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .required({ email: true, password: true });

type LoginDTO = z.infer<typeof loginSchema>;

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

//const conn = connect(config);
const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);
//const prepared = db.select().from(user).prepare();

export default eventHandler(async (event) => {
  const body = await readBody<LoginDTO>(event);
  const validatedBody = loginSchema.safeParse(body);

  if (!validatedBody.success) {
    const errors = (validatedBody as any).error.errors;
    const error = `${errors[0].code} for ${errors[0].path}`;
    throw createError({
      statusCode: 400,
      statusMessage: error,
    });
  }

  const currentUser = await db
    .select()
    .from(user)
    .where(eq(user.email, body.email));

  if (!currentUser[0]) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
    });
  }

  // await db.insert(user).values({
  //   email: "example@gmail.com",
  //   securityStamp: "",
  // });
  return currentUser;
});
