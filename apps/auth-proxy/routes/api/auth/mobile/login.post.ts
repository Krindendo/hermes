import { eventHandler } from "h3";
import { z } from "zod";

import { getUserByEmail, updateUserById } from "~/service/user.service";
import { generateSecurityStamp } from "~/utils/authUtils";

const requestSchema = z.object({
  email: z.string().email(),
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

  if (!currentUser.isEmailConfirmed) {
    throw new ErrorBadRequest("Email is not confirmed");
  }

  const emailConfirmationCode = generateSecurityStamp();

  await updateUserById(currentUser.id, { emailConfirmationCode });

  //send email to this email.

  return { message: "Email is sent" };
});
