//import { db, tableCreator } from "@hermes/db";

//import { env } from "./env.mjs";

export interface Session {
  user: {
    id: string;
    name: string;
  };
}

export async function auth() {
  return { user: { name: "test" } } as Session;
}
