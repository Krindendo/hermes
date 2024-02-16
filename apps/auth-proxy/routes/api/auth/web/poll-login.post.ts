import { eventHandler } from "h3";
import { z } from "zod";

import {
  generateAccessToken,
  generateRefreshToken,
} from "~/service/auth.service";
import { getAcceptTokenByUserId } from "~/service/user-accept-tokens.service";
import { createUserLogin } from "~/service/user-login.service";
import { getUserById } from "~/service/user.service";

const loginPollSchema = z.object({
  userId: z.number(),
  acceptToken: z.string(),
});

type loginPollDTO = z.infer<typeof loginPollSchema>;

export default eventHandler(async (event) => {
  const body = await readBody<loginPollDTO>(event);
  const validatedBody = loginPollSchema.safeParse(body);

  if (validatedBody.success === false) {
    throw new ErrorBadRequest(validatedBody.error.message);
  }

  const currentUser = await getUserById(body.userId);

  if (!currentUser) {
    throw new ErrorUnauthorized("email or pin is not valid");
  }

  if (currentUser.isLockoutEnabled) {
    throw new ErrorUnauthorized("Account is in lockout mode");
  }

  const acceptToken = await getAcceptTokenByUserId(currentUser.id);

  if (!acceptToken || acceptToken?.isAccepted === true) {
    throw new ErrorUnauthorized("Token is already taken");
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
