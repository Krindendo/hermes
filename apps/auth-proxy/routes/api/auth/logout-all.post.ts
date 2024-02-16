import { updateUserById } from "~/service/user.service";
import auth from "~/utils/auth";
import { generateSecurityStamp } from "~/utils/authUtils";

export default defineEventHandler({
  onRequest: [auth],
  async handler(event) {
    console.log("event", event);
    await updateUserById(event.context.userId, {
      securityStamp: generateSecurityStamp(),
    });
  },
});
