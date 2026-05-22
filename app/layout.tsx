import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Landlite Philippines Corporation | Illuminate Your World",
  description:
    "Landlite Philippines Corporation — pioneers of LED lighting since 2005. General Lights, Wiring Devices, Designer Lightings, and Smart Solutions for homes and businesses.",
  keywords:
    "LED lights, lighting Philippines, wiring device, designer lighting, smart home, Landlite, LPC",
  openGraph: {
    title: "Landlite Philippines Corporation",
    description: "Illuminate Your World with Landlite.",
    url: "https://landlitephilcorp.com",
    siteName: "Landlite Philippines Corporation",
    locale: "en_PH",
    type: "website",
  },
  themeColor: "#0EBBF0",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://supabase.co" />
      </head>
      <body>{children}</body>
    </html>
  );
}
