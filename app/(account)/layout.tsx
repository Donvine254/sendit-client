import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import NavigationMenu from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import UserSidenav from "@/components/pages/sidebar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { AuthProvider } from "../AuthProvider";
import { getUserData } from "@/lib/actions";
import { sessionUser } from "@/types";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
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
  const user = (await getUser()) as sessionUser;
  const userData = await getUserData(user.id);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased smooth-scroll`}>
        <Toaster richColors closeButton theme="light" />
        <AuthProvider>
          <NavigationMenu user={user} />
          <section
            className={`bg-gradient-to-b from-[#f6faff] via-[#f8f9fa] to-[#eaf3ff] p-2 pt-10 `}>
            <div className="w-full max-w-5xl  min-h-[500px] mx-auto px-2 md:px-8  py-8">
              <UserSidenav
                data={userData}
                user={user}
                permission={permission}
              />
              <section> {children}</section>
            </div>
          </section>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
