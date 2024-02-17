import { eventHandler } from "h3";
import { z } from "zod";

import {
  generateAccessToken,
  generateRefreshToken,
} from "~/service/auth.service";
import {
  deleteAcceptToken,
  getAcceptTokenByUserId,
} from "~/service/user-accept-tokens.service";
import { createUserLogin } from "~/service/user-login.service";
import { createRefreshToken } from "~/service/user-refresh-tokens.service";
import { getUserById } from "~/service/user.service";

const requestSchema = z.object({
  userId: z.number(),
  acceptToken: z.string(),
});

type RequestDTO = z.infer<typeof requestSchema>;

export default eventHandler(async (event) => {
  const body = await readBody<RequestDTO>(event);
  const validatedBody = requestSchema.safeParse(body);

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

  if (!acceptToken) {
    throw new ErrorUnauthorized(
      `Token with email ${body.acceptToken} not found`,
    );
  }

  await deleteAcceptToken(acceptToken.id);

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

  await createRefreshToken({ userId: currentUser.id, token: refreshToken });

  return { accessToken, refreshToken, userId: currentUser.id };
});
