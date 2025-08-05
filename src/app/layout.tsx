import type { Metadata } from "next";
import "@/assets/styles/globals.css";

export const metadata: Metadata = {
  title: "DocAI",
  description: "AI powered Medical Consultation Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
