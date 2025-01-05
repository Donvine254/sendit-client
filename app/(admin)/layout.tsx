import React from "react";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { AuthProvider } from "../AuthProvider";
import { sessionUser } from "@/types";
import { redirect } from "next/navigation";

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
  const { getUser, getPermission } = getKindeServerSession();
  const permission = await getPermission("admin");
  const isAdmin = permission?.isGranted;
  const user = (await getUser()) as sessionUser;
  if (!isAdmin || !user) {
    return redirect("/");
  }
  return (
    <html lang="en">
      <body className={`${noto_sans.variable} antialiased smooth-scroll`}>
        <Toaster richColors closeButton theme="light" />
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
