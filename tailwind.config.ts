// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        heading: ["var(--font-heading)", "var(--font-sans)", "sans-serif"],
      },
      colors: {
        // Brand
        "brand-royal": "rgb(var(--color-brand-royal) / <alpha-value>)",
        "brand-royal-hover":
          "rgb(var(--color-brand-royal-hover) / <alpha-value>)",

        // Contextual UI
        "contextual-spruce": "rgb(var(--color-spruce) / <alpha-value>)",
        "contextual-cardinal": "rgb(var(--color-cardinal) / <alpha-value>)",
        "contextual-cardinal-hover":
          "rgb(var(--color-cardinal-hover) / <alpha-value>)",
        "contextual-pumpkin": "rgb(var(--color-pumpkin) / <alpha-value>)",

        // Base UI
        "base-midnight": "rgb(var(--color-midnight) / <alpha-value>)",
        "base-sea": "rgb(var(--color-sea) / <alpha-value>)",
        "base-foggy": "rgb(var(--color-foggy) / <alpha-value>)",
        "base-rainy": "rgb(var(--color-rainy) / <alpha-value>)",
        "base-cloudy": "rgb(var(--color-cloudy) / <alpha-value>)",
        "base-mist": "rgb(var(--color-mist) / <alpha-value>)",
        "base-faint": "rgb(var(--color-faint) / <alpha-value>)",
        "base-white": "rgb(var(--color-white) / <alpha-value>)",

        // Typography
        "typography-midnight":
          "rgb(var(--color-typography-midnight) / <alpha-value>)",
        "typography-foggy":
          "rgb(var(--color-typography-foggy) / <alpha-value>)",
        "typography-rainy":
          "rgb(var(--color-typography-rainy) / <alpha-value>)",
        "typography-white":
          "rgb(var(--color-typography-white) / <alpha-value>)",

        // Background & foreground
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
      },
      fontSize: {
        "12-16": ["12px", { lineHeight: "16px" }],
        "14-20": ["14px", { lineHeight: "20px" }],
      },
      letterSpacing: {
        caps: "0.04em",
        overline: "1.2px",
      },
    },
  },
  plugins: [],
};

export default config;
