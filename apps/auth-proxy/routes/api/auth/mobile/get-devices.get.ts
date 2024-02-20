import { defineEventHandler } from "h3";

import auth from "~/utils/auth";

export default defineEventHandler({
  onRequest: [auth],
  async handler(event) {},
});
