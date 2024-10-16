import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/src/provider";





const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BedWood Furnishing",
  description: "Buy Furniture Online from our extensive collection of wooden furniture units to give your home an elegant touch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <Providers>
        {children}
        </Providers>
     </body>
    </html>
  );
}
