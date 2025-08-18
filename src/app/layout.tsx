// src/app/layout.tsx
import type { Metadata } from "next";
import AppLayoutWrapper from "./AppLayoutWrapper";
import { austinNewsDeck, geistMono, inter } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your App Name",
  description: "App description here",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${austinNewsDeck.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Preload critical fonts for better performance */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap"
          as="style"
        />
      </head>
      <body className="min-h-screen bg-base-faint text-typography-midnight">
        <AppLayoutWrapper>{children}</AppLayoutWrapper>
      </body>
    </html>
  );
}
