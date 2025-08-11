// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";

// Load Inter with the weights you use in MUI (400/500/600/700)
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Your App",
  description: "Built with Next.js + Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ⬇️ If you have existing providers, wrap <body> contents with them.
  // Example:
  // return (
  //   <html lang="en">
  //     <body className={`${inter.variable} antialiased bg-baseUi-faint text-typography-midnight`}>
  //       <ThemeProvider>
  //         <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  //       </ThemeProvider>
  //     </body>
  //   </html>
  // );

  return (
    <html lang="en">
      <body
        className={
          // Inter everywhere + sensible defaults using your Tailwind tokens
          `${inter.variable} antialiased bg-baseUi-faint text-typography-midnight`
        }
      >
        {children}
      </body>
    </html>
  );
}
