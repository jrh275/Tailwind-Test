// src/app/fonts/index.ts
import { Inter, Noto_Serif_Georgian } from "next/font/google";

// Use Lora for headings (serif)
export const austinNewsDeck = Noto_Serif_Georgian({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Regular, Medium, Semibold, Bold
  variable: "--font-heading",
  display: "swap",
});

// Load Inter from Google Fonts for body text (sans-serif)
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"], // Regular, Medium, Semibold
  variable: "--font-sans",
  display: "swap",
});

// Use Inter for mono for now
export const geistMono = Inter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});
