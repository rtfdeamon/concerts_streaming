import RootProvider from "./store/RootProvider";

import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.scss";

const inter = Onest({ subsets: ["latin"], weight: ['600', '500', '400', '100'] });

export const metadata: Metadata = {
  title: "Digital Platform Entertainment",
  description: "Concert platform for musicians all over the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <RootProvider>
          <body className={inter.className}>
            {children}
          </body>
      </RootProvider>
    </html>
  );
}
