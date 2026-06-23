import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dwiki Arlian Maulana — IT Support & System Engineer",
    template: "%s | wikidotexe",
  },
  description:
    "Portfolio of Dwiki Arlian Maulana (wikidotexe) — IT Support & System Engineer with 6+ years of experience managing networks, servers, cloud infrastructure, and end-user systems.",
  keywords: [
    "IT Support",
    "System Engineer",
    "Network Engineer",
    "Dwiki Arlian Maulana",
    "wikidotexe",
    "MikroTik",
    "Linux",
    "Docker",
    "DevOps",
    "Indonesia",
  ],
  authors: [{ name: "Dwiki Arlian Maulana", url: "https://github.com/wikidotexe" }],
  creator: "Dwiki Arlian Maulana",
  metadataBase: new URL("https://wikidotexe.com"),
  openGraph: {
    title: "Dwiki Arlian Maulana — IT Support & System Engineer",
    description:
      "Portfolio of Dwiki Arlian Maulana — IT Support & System Engineer with 6+ years managing networks, servers, cloud infrastructure, and automation.",
    url: "https://wikidotexe.com",
    siteName: "wikidotexe",
    images: [
      {
        url: "/logo/logowikidotexe.png",
        width: 1200,
        height: 630,
        alt: "wikidotexe — Dwiki Arlian Maulana",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dwiki Arlian Maulana — IT Support & System Engineer",
    description:
      "Portfolio of Dwiki Arlian Maulana — IT Support & System Engineer with 6+ years managing networks, servers, and automation.",
    creator: "@wikidotexe",
    images: ["/logo/logowikidotexe.png"],
  },
  icons: {
    icon: "/logo/logowikidotexe.png",
    shortcut: "/logo/logowikidotexe.png",
    apple: "/logo/logowikidotexe.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
