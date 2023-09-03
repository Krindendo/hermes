import type { NextRequest } from "next/server";

export const runtime = "edge";

export function GET(req: NextRequest) {
  try {
    console.log("req", req);
    const response = {};

    return new Response(JSON.stringify(response));
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
