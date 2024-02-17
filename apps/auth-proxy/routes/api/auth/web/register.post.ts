import { eventHandler } from "h3";
import { z } from "zod";

import { createUser, getUserByEmailPrep } from "~/service/user.service";
import { generateSecurityStamp, hashPin } from "~/utils/authUtils";

const requestSchema = z.object({
  email: z.string().email(),
  pin: z.string().max(4),
});

type RequestDTO = z.infer<typeof requestSchema>;

const getUser = getUserByEmailPrep();

export default eventHandler(async (event) => {
  const body = await readBody<RequestDTO>(event);
  const validatedBody = requestSchema.safeParse(body);

  if (validatedBody.success == false) {
    throw new ErrorBadRequest(validatedBody.error.message);
  }

  const [currentUser] = getUser.all({ email: body.email });

  if (currentUser) {
    throw new ErrorBadRequest("user exists");
  }

  const hashedPin = await hashPin(body.pin);

  const emailConfirmationCode = generateSecurityStamp();

  await createUser({
    email: body.email,
    pin: hashedPin,
    securityStamp: generateSecurityStamp(),
    emailConfirmationCode,
  });

  //send email to confirm mail

  return { messange: "User successfully registered" };
});

//https://orm.drizzle.team/docs/perf-queries
