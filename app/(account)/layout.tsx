import React from "react";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import NavigationMenu from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import UserSidenav from "@/components/pages/sidebar";
import { Analytics } from "@vercel/analytics/react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { AuthProvider } from "../AuthProvider";
import { getUserData } from "@/lib/actions";
import { sessionUser } from "@/types";

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
  const user = (await getUser()) as sessionUser;
  const userData = await getUserData(user.id);
  return (
    <html lang="en">
      <body className={`${noto_sans.variable} antialiased smooth-scroll`}>
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
        <Analytics />
      </body>
    </html>
  );
}
