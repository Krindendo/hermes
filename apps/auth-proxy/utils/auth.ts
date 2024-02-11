import { defineRequestMiddleware } from "h3";
import jwt from "jsonwebtoken";

import { ErrorUnauthorized } from "./errors";

const secretKey = process.env.SECRET_KEY_FOR_JWT;

export default defineRequestMiddleware((event) => {
  const authorization = event.headers.get("authorization");

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new ErrorUnauthorized();
  }
  const token = authorization.slice(7);

  try {
    //const decoded = jwtDecode(token);

    const decoded = jwt.verify(token, secretKey);
    console.log("decoded", decoded);
  } catch (error) {
    throw new ErrorBadRequest("Invalid token");
  }

  //event.context.userId = token.userId;
});
