//import { connect } from "@planetscale/database";
//import { drizzle } from "drizzle-orm/planetscale-serverless";

import Database from "better-sqlite3";
import { eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { eventHandler } from "h3";
import { z } from "zod";

import { user, userLogins } from "~/db/schema/user";
import { hashPin } from "~/utils/authUtils";

const loginSchema = z.object({
  email: z.string().email(),
  pin: z.string().max(4),
});

type LoginDTO = z.infer<typeof loginSchema>;

// const config = {
//   host: process.env.DATABASE_HOST,
//   username: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
// };

//const conn = connect(config);
const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);
const preparedUser = db
  .select()
  .from(user)
  .where(eq(user.id, sql.placeholder("email")))
  .prepare();

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

  const currentUser = await preparedUser.all({ email: body.email })[0];

  if (!currentUser) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
    });
  }

  if (currentUser.isLockoutEnabled) {
    throw createError({
      statusCode: 400,
      statusMessage: "You account is in lockout mode",
    });
  }

  const hashedPin = await hashPin(body.pin);

  if (currentUser.pin !== hashedPin) {
    await db
      .update(user)
      .set({ accessFailedCount: currentUser.accessFailedCount + 1 });
    throw createError({
      statusCode: 400,
      statusMessage: "Pin is not valid",
    });
  }

  await db.insert(userLogins).values({
    userId: currentUser.id,
    loginProvider: "web",
  });

  return currentUser;
});
