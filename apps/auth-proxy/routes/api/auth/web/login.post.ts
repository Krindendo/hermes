//import { connect } from "@planetscale/database";
//import { drizzle } from "drizzle-orm/planetscale-serverless";

import bcrypt from "bcrypt";
import { eventHandler } from "h3";
import { z } from "zod";

import { createAcceptToken } from "~/service/user-accept-tokens.service";
import { createUserLogin } from "~/service/user-login.service";
import { getUserByEmail, updateUserById } from "~/service/user.service";
import { generateSecurityStamp } from "~/utils/authUtils";
import { ErrorBadRequest, ErrorUnauthorized } from "~/utils/errors";

const requestSchema = z.object({
  email: z.string().email(),
  pin: z.string().max(4),
});

type RequestDTO = z.infer<typeof requestSchema>;

// const config = {
//   host: process.env.DATABASE_HOST,
//   username: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
// };

//const conn = connect(config);
//const getUser = getUserByEmailPrep();

export default eventHandler(async (event) => {
  const body = await readBody<RequestDTO>(event);
  const validatedBody = requestSchema.safeParse(body);

  if (validatedBody.success === false) {
    throw new ErrorBadRequest(validatedBody.error.message);
  }

  const currentUser = await getUserByEmail(body.email);

  if (!currentUser) {
    throw new ErrorUnauthorized("Email or pin is not valid");
  }

  if (!currentUser.isEmailConfirmed) {
    throw new ErrorBadRequest("Email is not confirmed");
  }

  if (currentUser.isLockoutEnabled) {
    throw new ErrorUnauthorized("Account is in lockout mode");
  }

  if (currentUser.accessFailedCount > 2) {
    if (currentUser.lockoutEndDateUtc < new Date()) {
      currentUser.accessFailedCount = 0;
      await updateUserById(currentUser.id, {
        accessFailedCount: 0,
      });
    } else {
      throw new ErrorUnauthorized("Maximum login attempts exceeded");
    }
  }

  const isPasswordMatch = await bcrypt.compare(body.pin, currentUser.pin);

  if (!isPasswordMatch) {
    await updateUserById(currentUser.id, {
      accessFailedCount: currentUser.accessFailedCount + 1,
      lockoutEndDateUtc: new Date(Date.now() + 30 * 60 * 1000),
    });

    await createUserLogin({
      userId: currentUser.id,
      loginProvider: "web",
      isSuccess: false,
    });

    throw new ErrorUnauthorized("email or pin is not valid");
  }

  const acceptToken = generateSecurityStamp();

  await createAcceptToken({
    userId: currentUser.id,
    token: acceptToken,
  });

  // send notification to mobile app

  return { acceptToken: acceptToken, userId: currentUser.id };
});
