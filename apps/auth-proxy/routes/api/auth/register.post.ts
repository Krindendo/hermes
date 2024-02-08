import crypto from "crypto";
import Database from "better-sqlite3";
import { eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { eventHandler } from "h3";
import { z } from "zod";

import { user } from "~/db/schema/user";
import { hashPin } from "~/utils/authUtils";

const registerSchema = z.object({
  email: z.string().email(),
  pin: z.string().max(4),
});

type RegisterDTO = z.infer<typeof registerSchema>;

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);
const preparedUser = db
  .select()
  .from(user)
  .where(eq(user.id, sql.placeholder("email")))
  .prepare();

//https://orm.drizzle.team/docs/perf-queries

export default eventHandler(async (event) => {
  const body = await readBody<RegisterDTO>(event);
  const validatedBody = registerSchema.safeParse(body);

  if (!validatedBody.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation of body is failed",
    });
  }

  const currentUser = await preparedUser.all({ email: body.email })[0];

  if (currentUser) {
    throw createError({
      statusCode: 400,
      statusMessage: "user exists",
    });
  }

  const hashedPin = await hashPin(body.pin);

  if (currentUser.pin !== hashedPin) {
    throw createError({
      statusCode: 400,
      statusMessage: "Wrong pin",
    });
  }

  const createdUser = await db.insert(user).values({
    email: body.email,
    pin: body.pin,
    securityStamp: generateSecurityStamp(),
  });

  console.log("createdUser", createdUser);

  return { messange: "User successfully registered" };
});

function generateSecurityStamp() {
  return crypto.randomBytes(32).toString("hex");
}
