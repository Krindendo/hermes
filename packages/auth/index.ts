import { db, tableCreator } from "@hermes/db";

import { env } from "./env.mjs";

export interface Session {
  user: {
    id: string;
  };
}

export function GET() {}

export function POST() {}

export function auth() {
  return { user: { id: "test" } } as Session;
}
