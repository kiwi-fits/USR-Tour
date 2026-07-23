import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/providers/LenisProvider";
import InteractiveLayout from "@/components/layout/InteractiveLayout";
import { DataProvider } from "@/lib/DataContext";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "USR Tours | Your Perfect Jaffna Getaway from India",
  description:
    "Explore the breathtaking beaches, ancient temples, rich Tamil culture, and warm hospitality of Jaffna, Sri Lanka. Just a short trip from India. Travel with USR Tours.",
  keywords:
    "Jaffna tours from India, Chennai to Jaffna, Sri Lanka travel, Tamil culture tours, Nallur Kandaswamy temple, Jaffna vacation packages, USR tours",
  openGraph: {
    title: "USR Tours | Your Perfect Jaffna Getaway",
    description:
      "Explore the breathtaking beaches, ancient temples, and shared heritage of Jaffna, Sri Lanka with USR Tours.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable}`}>
      <body className="antialiased">
        <DataProvider>
          <LenisProvider>
            <InteractiveLayout>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </InteractiveLayout>
          </LenisProvider>
        </DataProvider>
      </body>
    </html>
  );
}
