import type { Config } from "tailwindcss";

import baseConfig from "@hermes/tailwind-config";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  corePlugins: {
    preflight: false,
  },
  presets: [baseConfig],
} satisfies Config;
