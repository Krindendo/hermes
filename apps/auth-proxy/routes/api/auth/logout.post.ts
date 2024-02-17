import { deleteRefreshToken } from "~/service/user-refresh-tokens.service";
import auth from "~/utils/auth";

export default defineEventHandler({
  onRequest: [auth],
  async handler(event) {
    console.log("event", event);
    //await deleteRefreshToken(event.context.userId);
  },
});
