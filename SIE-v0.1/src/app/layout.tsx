import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIE — System for Intelligence and Execution",
  description: "Turn a desired outcome into an appropriate structure and one clear next action.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
