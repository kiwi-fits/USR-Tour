import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/providers/LenisProvider";
import InteractiveLayout from "@/components/layout/InteractiveLayout";
import { DataProvider } from "@/lib/DataContext";

export const metadata: Metadata = {
  title: "USR Tours | Experience Jaffna — Sri Lanka's Northern Paradise",
  description:
    "Explore pristine turquoise beaches, historic Dutch forts, ancient Tamil Kovils, and authentic Jaffna crab curry. Premium tour packages with USR Tours.",
  keywords: "Jaffna travel, Sri Lanka tourism, Jaffna packages, Chennai to Jaffna, USR Tours",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-cyan-500 selection:text-white">
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
