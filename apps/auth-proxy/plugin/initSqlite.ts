import { defineNitroPlugin } from "nitropack/dist/runtime/plugin";

export default defineNitroPlugin((nitroApp) => {
  console.log("nesto");
  nitroApp.hooks.hookOnce("beforeResponse", async () => {
    console.log("Disconnecting database...");

    // something you want to do, such like disconnected the database, or wait the task is done
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log("Database is disconnected!");
  });
});
