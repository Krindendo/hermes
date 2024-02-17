import { defineEventHandler } from "h3";
import { z } from "zod";

import {
  generateAccessToken,
  generateRefreshToken,
} from "~/service/auth.service";
import { getUserById } from "~/service/user.service";
import auth from "~/utils/auth";

const requestSchema = z.object({
  email: z.string().email(),
  emailConfirmationCode: z.string(),
});

type RequestDTO = z.infer<typeof requestSchema>;

export default defineEventHandler({
  onRequest: [auth],
  async handler(event) {
    const body = await readBody<RequestDTO>(event);
    const validatedBody = requestSchema.safeParse(body);

    if (validatedBody.success === false) {
      throw new ErrorBadRequest(validatedBody.error.message);
    }

    const currentUser = await getUserById(event.context.userId);

    if (!currentUser) {
      throw new ErrorUnauthorized("email is not valid");
    }

    if (currentUser.securityStamp !== event.context.securityStamp) {
      throw new ErrorUnauthorized();
    }

    const accessToken = generateAccessToken(currentUser.id);
    const refreshToken = generateRefreshToken(
      currentUser.id,
      currentUser.securityStamp,
    );

    return { accessToken, refreshToken, userId: currentUser.id };
  },
});
