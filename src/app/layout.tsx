import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/layout/AuthProvider";

import { GlobalHeader } from "@/components/layout/GlobalHeader";

export const metadata: Metadata = {
  title: "SaaS-500K Academy",
  description: "Build your SaaS to $500K ARR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-slate-200">
        <GlobalHeader />
        {children}
      </body>
    </html>
  );
}
