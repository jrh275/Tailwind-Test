// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "var(--font-sans)", "sans-serif"],
      },

      // Custom font sizes (matching existing usage)
      fontSize: {
        "12-16": ["12px", { lineHeight: "16px" }],
        "14-20": ["14px", { lineHeight: "20px" }],
      },

      // Note: Colors are now defined in @theme in globals.css
      // This simplifies the config and matches Feynman's approach
      // All custom colors will be available as utilities automatically

      letterSpacing: {
        caps: "0.04em",
        overline: "1.2px",
      },
    },
  },
  plugins: [],
};

export default config;
