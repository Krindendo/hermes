import { defineConfig } from "tsup";

import { config } from "@hermes/tsup-config";

export default defineConfig((opts) => ({
  ...config,
  entry: ["./src/index.ts", "./src/hooks.ts", "./src/utils.ts"],
  clean: !opts.watch,
  esbuildOptions: (option) => {
    option.banner = {
      js: `"use client";`,
    };
  },
}));
