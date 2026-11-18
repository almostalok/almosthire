import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlmostHire | Transparent Merit-Based Hiring & Live Cohort Leaderboard",
  description: "Eliminating recruitment black boxes, ghosting, and opaque rejections through deterministic scoring, public SLAs, and anonymised peer percentiles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-zinc-950 text-zinc-100 h-full antialiased">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-200`}>
        {children}
      </body>
    </html>
  );
}
