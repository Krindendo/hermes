//import { db, tableCreator } from "@hermes/db";

//import { env } from "./env.mjs";

export interface Session {
  user: {
    id: string;
    name: string;
  };
}

export function GET() {
  return "";
}

export function POST() {
  return "";
}

export async function auth(callback?: (req: Request) => Promise<Response>) {
  await new Promise((resolveInner) => {
    setTimeout(resolveInner, 1000);
  });
  console.log("callback", callback);
  return { user: { name: "test" } } as Session;
}
