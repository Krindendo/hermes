//import { connect } from "@planetscale/database";
//import { drizzle } from "drizzle-orm/planetscale-serverless";

import Database from "better-sqlite3";
import { eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { eventHandler } from "h3";
import { z } from "zod";

import { user, userLogins } from "~/db/schema-sqlite/user";
import { hashPin } from "~/utils/authUtils";
import { ErrorBadRequest, ErrorUnauthorized } from "~/utils/errors";

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

  if (validatedBody.success === false) {
    throw new ErrorBadRequest(validatedBody.error.message);
  }

  const currentUser = await preparedUser.all({ email: body.email })[0];

  if (!currentUser) {
    throw new ErrorUnauthorized("email or pin is not valid");
  }

  if (currentUser.isLockoutEnabled) {
    throw new ErrorUnauthorized("Maximum login attempts exceeded");
  }

  const hashedPin = await hashPin(body.pin);

  if (currentUser.pin !== hashedPin) {
    await db
      .update(user)
      .set({ accessFailedCount: currentUser.accessFailedCount + 1 });
    await db.insert(userLogins).values({
      userId: currentUser.id,
      loginProvider: "web",
      isSuccess: false,
    });
    throw new ErrorUnauthorized("email or pin is not valid");
  }

  await db.insert(userLogins).values({
    userId: currentUser.id,
    loginProvider: "web",
    isSuccess: true,
  });

  return currentUser;
});
