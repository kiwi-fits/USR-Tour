import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/providers/LenisProvider";
import InteractiveLayout from "@/components/layout/InteractiveLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "USR Tours | Travel with us. Create memories.",
  description:
    "Explore the breathtaking beaches, ancient temples, rich culture, and warm hospitality of Jaffna, Sri Lanka with USR Tours. Travel with us, create memories.",
  keywords:
    "USR tours, Jaffna tourism, Sri Lanka travel, Casuarina beach, Jaffna fort, Nainativu temple, Delft island, Sri Lanka vacation, travel memories",
  openGraph: {
    title: "USR Tours | Travel with us. Create memories.",
    description:
      "Explore the breathtaking beaches, ancient temples, rich culture, and warm hospitality of Jaffna, Sri Lanka with USR Tours.",
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
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased">
        <LenisProvider>
          <InteractiveLayout>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </InteractiveLayout>
        </LenisProvider>
      </body>
    </html>
  );
}
