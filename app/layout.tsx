import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "remixicon/fonts/remixicon.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisProvider from "@/app/providers/lenis-provider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Modern Cafe",
  description: "Artisan coffee and pastries in the heart of the city.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} antialiased font-sans`}
      >
        <Navbar />
        <LenisProvider>{children}</LenisProvider>
        <Footer />
      </body>
    </html>
  );
}
