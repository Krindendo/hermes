import { defineEventHandler } from "h3";
import { z } from "zod";

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
  },
});
