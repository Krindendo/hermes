import type { Config } from "tailwindcss";

import baseConfig from "@hermes/tailwind-config";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [baseConfig],
} satisfies Config;
