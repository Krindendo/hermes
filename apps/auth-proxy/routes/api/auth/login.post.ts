//import { connect } from "@planetscale/database";
//import { drizzle } from "drizzle-orm/planetscale-serverless";

import bcrypt from "bcrypt";
import { eventHandler } from "h3";
import { z } from "zod";

import { createUserLogin } from "~/service/user-login.service";
import { getUserByEmailPrep, updateUserById } from "~/service/user.service";
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
const getUser = getUserByEmailPrep();

export default eventHandler(async (event) => {
  const body = await readBody<LoginDTO>(event);
  const validatedBody = loginSchema.safeParse(body);

  if (validatedBody.success === false) {
    throw new ErrorBadRequest(validatedBody.error.message);
  }

  const currentUser = getUser.all({ email: body.email })[0];

  if (!currentUser) {
    throw new ErrorUnauthorized("email or pin is not valid");
  }

  if (currentUser.isLockoutEnabled) {
    throw new ErrorUnauthorized("Maximum login attempts exceeded");
  }

  const isMatch = await bcrypt.compare(body.pin, currentUser.pin);

  if (!isMatch) {
    await updateUserById(currentUser.id, {
      accessFailedCount: currentUser.accessFailedCount + 1,
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

  return currentUser;
});
