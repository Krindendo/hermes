import jwt from "jsonwebtoken";

const SECRET_KEY_FOR_JWT = process.env.SECRET_KEY_FOR_JWT;

export function generateAccessToken(userId: number) {
  const payload = { userId, issuedAt: Date.now() };
  const token = jwt.sign(payload, SECRET_KEY_FOR_JWT, { expiresIn: 15 * 60 });
  return token as string;
}

export function generateRefreshToken(userId: number, securityStamp: string) {
  const payload = { userId, securityStamp, issuedAt: Date.now() };
  const token = jwt.sign(payload, SECRET_KEY_FOR_JWT, {
    expiresIn: 24 * 60 * 60,
  });
  return token as string;
}

export function isAccessTokenValid() {}

export function isRefreshTokenValid() {}
