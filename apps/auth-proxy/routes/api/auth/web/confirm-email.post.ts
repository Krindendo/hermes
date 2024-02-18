import { defineEventHandler } from "h3";

import { getUserByEmail, updateUserById } from "~/service/user.service";

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  const email = url.searchParams.get("email");
  const emailConfirmationCode = url.searchParams.get("code");

  if (!email || !emailConfirmationCode) {
    throw new ErrorBadRequest("email or confirmation code doesnt exists");
  }

  const currentUser = await getUserByEmail(email);

  if (!currentUser) {
    throw new ErrorUnauthorized("Email or pin is not valid");
  }

  if (currentUser.isLockoutEnabled) {
    throw new ErrorUnauthorized("Account is in lockout mode");
  }

  await updateUserById(currentUser.id, {
    isEmailConfirmed: true,
  });

  return { message: "Email was successfully confirmed." };
});
