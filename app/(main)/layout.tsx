import React from "react";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "../globals.css";
import NavigationMenu from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "../AuthProvider";
import { sessionUser } from "@/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const noto_sans = Noto_Sans({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sendit Courier ",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getUser } = getKindeServerSession();
  const user = (await getUser()) as sessionUser;
  return (
    <html lang="en">
      <body className={`${noto_sans.variable} antialiased smooth-scroll`}>
        <Toaster richColors closeButton theme="light" />
        <AuthProvider>
          <NavigationMenu user={user} />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
