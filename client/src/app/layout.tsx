import RootProvider from "./store/RootProvider";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Toaster } from "@/shadComponents/ui/toaster";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"], weight: ['600', '500', '400', '100'] });

export const metadata: Metadata = {
  title: "Digital Platform Entertainment",
  description: "Concert platform for musicians all over the world",
};

const initialOptions = {

}

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
              <Toaster />
            </body>
        </RootProvider>
    </html>
  );
}
