import { execSync } from "child_process";
import { defineConfig } from "tsup";

export default defineConfig((opts) => ({
  sourcemap: true,
  dts: true,
  format: ["esm", "cjs"],
  // eslint-disable-next-line @typescript-eslint/require-await
  async onSuccess() {
    // emit dts and sourcemaps to enable jump to definition
    execSync("pnpm tsc --project tsconfig.sourcemap.json");
  },
  entry: ["./src/index.ts", "./src/hooks.ts"],
  clean: !opts.watch,
  esbuildOptions: (option) => {
    option.banner = {
      js: `"use client";`,
    };
  },
}));
