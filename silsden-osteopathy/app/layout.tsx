import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// PLACEHOLDER — replace with the real production domain once known.
const siteUrl = "https://www.silsdenosteopathy.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Silsden Osteopathy | Osteopath in Silsden, West Yorkshire",
    template: "%s | Silsden Osteopathy",
  },
  description:
    "Osteopathy and Pilates in Silsden, West Yorkshire. Personalised, whole-body treatment for back pain, joint pain, headaches and more — with Amy at Silsden Osteopathy.",
  keywords: [
    "Osteopath Silsden",
    "Osteopathy Silsden",
    "Silsden Osteopath",
    "Osteopath near Keighley",
    "Osteopathy West Yorkshire",
    "Pilates Silsden",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Silsden Osteopathy | Osteopath in Silsden, West Yorkshire",
    description:
      "Osteopathy and Pilates in Silsden, West Yorkshire. Personalised, whole-body treatment to help you move, feel and live better.",
    url: siteUrl,
    siteName: "Silsden Osteopathy",
    locale: "en_GB",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#4a3359",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col bg-cream text-charcoal antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
