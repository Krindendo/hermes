import type { Config } from "tailwindcss";

import baseConfig from "@hermes/tailwind-config";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@hermes/ui/components/*.{ts,tsx}",
  ],
  presets: [baseConfig],
} satisfies Config;
