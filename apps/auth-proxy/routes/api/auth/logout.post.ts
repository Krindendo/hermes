import { defineEventHandler } from "h3";
import { z } from "zod";

import { deleteRefreshToken } from "~/service/user-refresh-tokens.service";
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

    if (validatedBody.success == false) {
      throw new ErrorBadRequest(validatedBody.error.message);
    }

    if (!event.context.userId) {
      throw new ErrorBadRequest("user id is missing");
    }

    await deleteRefreshToken(event.context.userId, body.refreshToken);

    return { message: "User successfully logout" };
  },
});
