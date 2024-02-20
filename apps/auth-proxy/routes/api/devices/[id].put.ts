import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  console.log("id", id);
});
