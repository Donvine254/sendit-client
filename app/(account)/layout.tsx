import React from "react";
import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import NavigationMenu from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sendit Courier ",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { sessionUser } from "@/types";
import { redirect } from "next/navigation";
import UserSidenav from "@/components/pages/sidebar";
import { getUserData } from "@/lib/actions";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getUser, getPermission } = getKindeServerSession();
  const permission = await getPermission("admin");
  const user = (await getUser()) as sessionUser;
  if (!user) {
    return redirect(`/api/auth/login`);
  }
  const userData = await getUserData(user.id);
  return (
    <html lang="en">
      <body className={`antialiased smooth-scroll ${eb_garamond.className}`}>
        <NavigationMenu />
        <Toaster />
        <section
          className={`bg-gradient-to-b from-[#f6faff] via-[#f8f9fa] to-[#eaf3ff] p-2 pt-10 `}>
          <div className="w-full max-w-5xl  min-h-[500px] mx-auto px-2 md:px-8  py-8">
            <UserSidenav
              user={user}
              permission={permission}
              userData={userData}
            />
            <section> {children}</section>
          </div>
        </section>
        <Footer />
      </body>
    </html>
  );
}
