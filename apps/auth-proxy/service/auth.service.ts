import jwt from "jsonwebtoken";

import { ErrorInternalServer } from "~/utils/errors";

const SECRET_KEY_FOR_JWT = process.env.SECRET_KEY_FOR_JWT;

interface AccessToken {}
interface RefreshToken {}

export function generateRefreshToken() {
  return generateSecurityStamp();
}

export function generateJWTAccessToken(userId: number) {
  const payload = { userId, issuedAt: Date.now() };
  const token = jwt.sign(payload, SECRET_KEY_FOR_JWT, { expiresIn: 15 * 60 });
  return `Bearer ${token}`;
}

export function generateJWTRefreshToken(userId: number, refreshToken: string) {
  const payload = { userId, refreshToken, issuedAt: Date.now() };
  const token = jwt.sign(payload, SECRET_KEY_FOR_JWT, {
    expiresIn: 24 * 60 * 60,
  });
  return token as string;
}

export function getValuesFromAccessToken(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY_FOR_JWT);
    return decoded;
  } catch (error) {
    throw new ErrorInternalServer();
  }
}

export function getValuesFromRefreshToken(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY_FOR_JWT);
    return decoded;
  } catch (error) {
    throw new ErrorInternalServer();
  }
}
