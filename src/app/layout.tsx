import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saswata Saha · Senior Flutter & Mobile Solutions Architect",
  description:
    "US-style portfolio for Saswata Saha featuring enterprise mobile architecture, AI-first delivery systems, and guided OpenAI briefings.",
  openGraph: {
    title: "Saswata Saha · Senior Flutter & Mobile Solutions Architect",
    description:
      "Enterprise-ready portfolio detailing Saswata Saha's mobile leadership, AI copilots, and client outcomes.",
    url: "https://saswata-mobile.ai",
    siteName: "Saswata Saha Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-50`}
      >
        {children}
      </body>
    </html>
  );
}
