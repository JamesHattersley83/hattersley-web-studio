import type { Metadata } from "next";
import { Inter, Figtree } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hattersley Studio CRM",
  description:
    "Internal CRM and project tracker for Hattersley Web Studio & Hattersley CAD Services.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${figtree.variable}`}>
      <body>{children}</body>
    </html>
  );
}
