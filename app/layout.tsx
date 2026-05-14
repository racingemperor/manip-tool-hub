import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Embodied Tools",
  description: "Embodied intelligence tool extension and management framework."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
