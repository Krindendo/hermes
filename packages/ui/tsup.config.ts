import type { Options } from "tsup";
import { defineConfig } from "tsup";

import { config } from "@hermes/tsup-config";

export default defineConfig((options: Options) => ({
  ...config,
  entry: ["src/index.ts", "src/client.ts", "src/utils.ts", "src/hooks.ts"],
  treeshake: true,
  splitting: true,
  minify: process.env.NODE_ENV === "production",
  clean: !options.watch,
  external: ["react", "react-dom"],
  ...options,
}));
