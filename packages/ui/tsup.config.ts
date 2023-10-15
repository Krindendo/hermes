import type { Options } from "tsup";
import { defineConfig } from "tsup";

import { config } from "@hermes/tsup-config";

export default defineConfig((opts: Options) => ({
  entry: ["src/index.ts", "src/utils.ts", "src/components/*"],
  treeshake: true,
  splitting: true,
  minify: process.env.NODE_ENV === "production",
  clean: !opts.watch,
  external: ["react", "react-dom"],
  ...config,
}));
