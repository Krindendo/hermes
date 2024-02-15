import crypto from "crypto";
import { eventHandler } from "h3";
import { z } from "zod";

import { createUser, getUserByEmailPrep } from "~/service/user.service";
import { hashPin } from "~/utils/authUtils";

const registerSchema = z.object({
  email: z.string().email(),
  pin: z.string().max(4),
});

type RegisterDTO = z.infer<typeof registerSchema>;

const getUser = getUserByEmailPrep();

export default eventHandler(async (event) => {
  const body = await readBody<RegisterDTO>(event);
  const validatedBody = registerSchema.safeParse(body);

  if (validatedBody.success == false) {
    throw new ErrorBadRequest(validatedBody.error.message);
  }

  const currentUser = getUser.all({ email: body.email })[0];

  if (currentUser) {
    throw new ErrorBadRequest("user exists");
  }

  const hashedPin = await hashPin(body.pin);

  await createUser({
    email: body.email,
    pin: hashedPin,
    securityStamp: generateSecurityStamp(),
    emailConfirmationCode: generateSecurityStamp(),
  });

  return { messange: "User successfully registered" };
});

function generateSecurityStamp() {
  return crypto.randomBytes(32).toString("hex");
}

//https://orm.drizzle.team/docs/perf-queries
