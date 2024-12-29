import React from "react";
import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "../globals.css";
import NavigationMenu from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { Toaster } from "@/components/ui/sonner";

const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sendit Courier ",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${eb_garamond.className} antialiased smooth-scroll`}>
        <NavigationMenu />
        <Toaster />
        {children}
        <Footer />
      </body>
    </html>
  );
}
