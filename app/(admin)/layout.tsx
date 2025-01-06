import React from "react";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { AuthProvider } from "../AuthProvider";
import { sessionUser } from "@/types";
import { SidebarGroup, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import Header from "@/components/dashboard/header";
import { ThemeProvider } from "next-themes";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Toaster richColors closeButton theme="light" />
          <AuthProvider>
            <SidebarProvider>
              <AppSidebar user={user} />
              <SidebarGroup className="bg-[#F8F9FA] dark:bg-gray-950 transition-colors duration-300 !p-0">
                <Header user={user} />
                <div className="space-y-2 pt-20 lg:pt-16">{children}</div>
              </SidebarGroup>
            </SidebarProvider>
          </AuthProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
