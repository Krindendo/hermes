import Database from "better-sqlite3";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { eventHandler } from "h3";
import { z } from "zod";

import { user } from "~/db/schema/user";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type RegisterDTO = z.infer<typeof registerSchema>;

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

export default eventHandler(async (event) => {
  const body = await readBody<RegisterDTO>(event);
  const validatedBody = registerSchema.safeParse(body);

  if (!validatedBody.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation of body is failed",
    });
  }

  const currentUser = await db
    .select()
    .from(user)
    .where(eq(user.email, body.email));

  if (currentUser[0]) {
    throw createError({
      statusCode: 400,
      statusMessage: "user exists",
    });
  }

  return "success";
});
