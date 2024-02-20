import { defineEventHandler } from "h3";

import { getDevicesWithUserId } from "~/service/device.service";
import auth from "~/utils/auth";

export default defineEventHandler({
  onRequest: [auth],
  async handler(event) {
    if (!event.context.userId) {
      throw new ErrorBadRequest("user id is missing");
    }
    return await getDevicesWithUserId(event.context.userId);
  },
});
