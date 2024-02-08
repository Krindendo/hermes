import { defineEventHandler } from "h3";

export default defineEventHandler((event) => {
  const token = event.headers.authorization;

  if (!token) {
    throw createError({
      statusCode: 400,
      statusMessage: "Unauthorized",
    });
  }

  event.context.userId = token.userId;
});
