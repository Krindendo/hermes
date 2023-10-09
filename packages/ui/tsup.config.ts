import { defineConfig } from "tsup";

import { config } from "@hermes/tsup-config";

export default defineConfig((opts) => ({
  ...config,
  //entry: ["./**/*.tsx", "./**/*.ts"],
  //entry: ["./src/index.ts", "./src/utils.ts"],

  entry: {
    index: "./src/index.ts",
    utils: "./src/utils.ts",
    "alert-dialog": "./src/components/alert-dialog.tsx",
    alert: "./src/components/alert.tsx",
    button: "./src/components/button/button.tsx",
    checkbox: "./src/components/checkbox.tsx",
    "dropdown-menu": "./src/components/dropdown-menu.tsx",
    Icons: "./src/components/Icons.tsx",
    input: "./src/components/input.tsx",
    label: "./src/components/label.tsx",
    progress: "./src/components/progress.tsx",
    select: "./src/components/select.tsx",
    separator: "./src/components/separator.tsx",
    skeleton: "./src/components/skeleton.tsx",
    switch: "./src/components/switch.tsx",
    table: "./src/components/table.tsx",
    toast: "./src/components/toast.tsx",
    toaster: "./src/components/toaster.tsx",
    "use-toast": "./src/components/use-toast.ts",
  },
  splitting: true,
  minify: process.env.NODE_ENV === "production",
  external: ["react", "react-dom"],
  treeShaking: true,
  clean: !opts.watch,
  // esbuildOptions: (option) => {
  //   option.banner = {
  //     js: `"use client";`,
  //   };
  // },
}));
