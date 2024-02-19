import { defineEventHandler } from "h3";
import { z } from "zod";

import {
  generateJWTAccessToken,
  generateJWTRefreshToken,
  generateRefreshToken,
  getValuesFromRefreshToken,
} from "~/service/auth.service";
import {
  createRefreshToken,
  deleteRefreshToken,
  getRefreshToken,
} from "~/service/user-refresh-tokens.service";
import { getUserById } from "~/service/user.service";
import auth from "~/utils/auth";

const requestSchema = z.object({
  refreshToken: z.string(),
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

    const [currentRefreshToken] = await getRefreshToken(currentUser.id, "web");

    const refreshTokenValues = getValuesFromRefreshToken(body.refreshToken);

    if (!currentRefreshToken) {
      throw new ErrorUnauthorized();
    }

    if (currentRefreshToken !== refreshTokenValues.token) {
      throw new ErrorUnauthorized();
    }

    const refreshTokenCode = generateRefreshToken();

    const accessToken = generateJWTAccessToken(currentUser.id);
    const refreshToken = generateJWTRefreshToken(
      currentUser.id,
      refreshTokenCode,
    );

    await deleteRefreshToken(currentUser.id, refreshTokenValues.token);

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await createRefreshToken({
      userId: currentUser.id,
      token: refreshTokenCode,
      type: "refresh",
      origin: "web",
      expiresAt,
    });

    return { accessToken, refreshToken, userId: currentUser.id };
  },
});
