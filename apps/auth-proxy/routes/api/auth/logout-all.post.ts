import { deleteRefreshTokenWithUserId } from "~/service/user-refresh-tokens.service";
import { updateUserById } from "~/service/user.service";
import auth from "~/utils/auth";
import { generateSecurityStamp } from "~/utils/authUtils";

export default defineEventHandler({
  onRequest: [auth],
  async handler(event) {
    if (!event.context.userId) {
      throw new ErrorBadRequest("user id is missing");
    }
    await updateUserById(event.context.userId, {
      securityStamp: generateSecurityStamp(),
    });

    await deleteRefreshTokenWithUserId(event.context.userId);
  },
});
