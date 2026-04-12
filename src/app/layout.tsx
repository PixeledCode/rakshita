import type { Metadata } from "next";
import localFont from "next/font/local";
import { Be_Vietnam_Pro, Birthstone } from "next/font/google";
import "./globals.css";

const zodiak = localFont({
  src: "../../public/fonts/Zodiak-Bold.woff2",
  variable: "--font-zodiak",
  weight: "700",
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  variable: "--font-be-vietnam",
  weight: ["400", "500", "600"],
  display: "swap",
});

const birthstone = Birthstone({
  subsets: ["latin"],
  variable: "--font-birthstone",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rakshita Singh — Filmmaker",
  description: "Portfolio of Rakshita Singh, filmmaker and photographer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${zodiak.variable} ${beVietnam.variable} ${birthstone.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
