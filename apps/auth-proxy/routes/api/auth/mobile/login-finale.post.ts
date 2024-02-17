import { eventHandler } from "h3";
import { z } from "zod";

import {
  generateAccessToken,
  generateRefreshToken,
} from "~/service/auth.service";
import { createUserLogin } from "~/service/user-login.service";
import { getUserByEmail, updateUserById } from "~/service/user.service";

const requestSchema = z.object({
  email: z.string().email(),
  emailConfirmationCode: z.string(),
});

type RequestDTO = z.infer<typeof requestSchema>;

export default eventHandler(async (event) => {
  const body = await readBody<RequestDTO>(event);
  const validatedBody = requestSchema.safeParse(body);

  if (validatedBody.success === false) {
    throw new ErrorBadRequest(validatedBody.error.message);
  }

  const currentUser = await getUserByEmail(body.email);

  if (!currentUser) {
    throw new ErrorUnauthorized("email is not valid");
  }

  if (currentUser.isEmailConfirmed) {
    throw new ErrorBadRequest("Email is already confirmed");
  }

  if (currentUser.emailConfirmationCode !== body.emailConfirmationCode) {
    throw new ErrorUnauthorized("confirmationCode is not valid");
  }

  await updateUserById(currentUser.id, {
    isEmailConfirmed: true,
  });

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
