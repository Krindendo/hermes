import { eventHandler } from "h3";
import { z } from "zod";

import { getUserByEmail } from "~/service/user.service";

const loginMobileSchema = z.object({
  email: z.string().email(),
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

  //send email to this email.
});
