import { deleteRefreshTokens } from "~/service/user-refresh-tokens.service";
import auth from "~/utils/auth";

export default defineEventHandler({
  onRequest: [auth],
  async handler(event) {
    if (!event.context.userId) {
      throw new ErrorBadRequest("user id is missing");
    }

    await deleteRefreshTokens(event.context.userId);

    return { message: "User successfully logout from all devices" };
  },
});
