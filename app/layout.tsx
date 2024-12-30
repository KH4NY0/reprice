import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
 })

export const metadata: Metadata = {
  title: "Reprice",
  description: "Reprice is a powerful eCommerce price tracker that monitors product prices in real-time, sends email alerts for price changes, and helps users save money. Built with Next.js for speed and efficiency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={spaceGrotesk.className}
      >
        <main className="max-w-10xl mx-auto">
          <Navbar />
        </main>
        {children}
      </body>
    </html>
  );
}
