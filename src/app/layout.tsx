import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/layout/Providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plutus",
  description: "Future of Personal Branding and Payments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          <Header />
          <main className="flex grow flex-col">{children}</main>
          <Footer />
          <Toaster />
        </body>
      </html>
    </Providers>
  );
}
