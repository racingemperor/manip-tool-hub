import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manip Tool Hub",
  description: "A research-engineering hub for embodied AI, robotics tools, benchmark evidence, and validation notes."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
