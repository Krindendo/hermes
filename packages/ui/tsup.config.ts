import { defineConfig } from "tsup";

import { config } from "@hermes/tsup-config";

export default defineConfig((opts) => ({
  ...config,
  entry: {
    index: "./src/index.ts",
    utils: "./src/utils.ts",
    "alert-dialog": "./src/components/alert-dialog/index.ts",
    alert: "./src/components/alert/index.ts",
    button: "./src/components/button/index.ts",
    checkbox: "./src/components/checkbox/index.ts",
    "dropdown-menu": "./src/components/dropdown-menu/index.ts",
    Icons: "./src/components/Icons/index.ts",
    input: "./src/components/input/index.ts",
    label: "./src/components/label/index.ts",
    progress: "./src/components/progress/index.ts",
    select: "./src/components/select/index.ts",
    separator: "./src/components/separator/index.ts",
    skeleton: "./src/components/skeleton/index.ts",
    switch: "./src/components/switch/index.ts",
    table: "./src/components/table/index.ts",
    toast: "./src/components/toast/index.ts",
  },
  splitting: true,
  minify: process.env.NODE_ENV === "production",
  external: ["react"],
  treeShaking: true,
  clean: !opts.watch,
}));
