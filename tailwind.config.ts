import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        // Brand
        "brand-royal": "var(--color-brand-royal)",
        "brand-royal-hover": "var(--color-brand-royal-hover)",

        // Contextual UI
        "contextual-spruce": "var(--color-spruce)",
        "contextual-cardinal": "var(--color-cardinal)",
        "contextual-cardinal-hover": "var(--color-cardinal-hover)",
        "contextual-pumpkin": "var(--color-pumpkin)",

        // Base UI
        "base-midnight": "var(--color-midnight)",
        "base-sea": "var(--color-sea)",
        "base-foggy": "var(--color-foggy)",
        "base-rainy": "var(--color-rainy)",
        "base-cloudy": "var(--color-cloudy)",
        "base-mist": "var(--color-mist)",
        "base-faint": "var(--color-faint)",
        "base-white": "var(--color-white)",

        // Typography
        "typography-midnight": "var(--color-typography-midnight)",
        "typography-foggy": "var(--color-typography-foggy)",
        "typography-rainy": "var(--color-typography-rainy)",
        "typography-white": "var(--color-typography-white)",

        // Background & foreground
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        "12-16": ["12px", { lineHeight: "16px" }],
        "14-20": ["14px", { lineHeight: "20px" }],
      },
      letterSpacing: {
        caps: "0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
