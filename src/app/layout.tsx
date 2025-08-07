import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "@/assets/styles/globals.css";
import Provider from "./provider";

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
    <ClerkProvider>
      <html lang="en">
        <body>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
