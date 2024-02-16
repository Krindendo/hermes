import { eventHandler } from "h3";
import { z } from "zod";

import {
  generateAccessToken,
  generateRefreshToken,
} from "~/service/auth.service";
import { createUserLogin } from "~/service/user-login.service";
import { getUserByEmail } from "~/service/user.service";

const loginMobileSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type loginMobileDTO = z.infer<typeof loginMobileSchema>;

export default eventHandler(async (event) => {
  const body = await readBody<loginMobileDTO>(event);
  const validatedBody = loginMobileSchema.safeParse(body);

  if (validatedBody.success === false) {
    throw new ErrorBadRequest(validatedBody.error.message);
  }

  const currentUser = await getUserByEmail(body.email);

  if (!currentUser) {
    throw new ErrorUnauthorized("email is not valid");
  }

  await createUserLogin({
    userId: currentUser.id,
    loginProvider: "mobile",
    isSuccess: true,
  });

  const accessToken = generateAccessToken(currentUser.id);
  const refreshToken = generateRefreshToken(
    currentUser.id,
    currentUser.securityStamp,
  );

  return { accessToken, refreshToken, userId: currentUser.id };
});
