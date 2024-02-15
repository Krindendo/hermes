//import { connect } from "@planetscale/database";
//import { drizzle } from "drizzle-orm/planetscale-serverless";

import bcrypt from "bcrypt";
import { eventHandler } from "h3";
import { z } from "zod";

import {
  generateAccessToken,
  generateRefreshToken,
} from "~/service/auth.service";
import { createUserLogin } from "~/service/user-login.service";
import {
  getUserByEmail,
  getUserByEmailPrep,
  updateUserById,
} from "~/service/user.service";
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
//const getUser = getUserByEmailPrep();

export default eventHandler(async (event) => {
  const body = await readBody<LoginDTO>(event);
  const validatedBody = loginSchema.safeParse(body);

  if (validatedBody.success === false) {
    throw new ErrorBadRequest(validatedBody.error.message);
  }

  const currentUser = await getUserByEmail(body.email);

  if (!currentUser) {
    throw new ErrorUnauthorized("email or pin is not valid");
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

  await createUserLogin({
    userId: currentUser.id,
    loginProvider: "web",
    isSuccess: true,
  });

  const accessToken = generateAccessToken(currentUser.id);
  const refreshToken = generateRefreshToken(
    currentUser.id,
    currentUser.securityStamp,
  );

  return { accessToken, refreshToken, userId: currentUser.id };
});
