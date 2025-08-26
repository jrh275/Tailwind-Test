// src/app/fonts/index.ts
import { Inter } from "next/font/google";

// Inter for headings
export const interHeading = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Regular, Medium, Semibold, Bold
  variable: "--font-heading",
  display: "swap",
});

// Inter for body text
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"], // Regular, Medium, Semibold
  variable: "--font-sans",
  display: "swap",
});

// Inter for mono
export const geistMono = Inter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

// Keep austinNewsDeck for backward compatibility (points to interHeading)
export const austinNewsDeck = interHeading;
