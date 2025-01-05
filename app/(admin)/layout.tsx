import React from "react";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { AuthProvider } from "../AuthProvider";
import { sessionUser } from "@/types";
import {
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Separator } from "@/components/ui/separator";

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
          <SidebarProvider>
            <AppSidebar user={user} />
            <SidebarGroup className="bg-[#F8F9FA] !p-0">
              <SidebarHeader className="fixed top-0 h-16 z-10 bg-white w-full  border-b">
                <div className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                  <div className="flex items-center gap-2 px-4 h-full">
                    <SidebarTrigger className="-ml-1" title="collapse menu" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <p className="tracking-tight leading-tight inline-flex flex-col py-2 ">
                      <span className="font-semibold leading-tight capitalize">
                        Good morning {user.given_name}
                      </span>
                      <span className="text-muted-foreground text-xs sm:text-sm">
                        {new Date().toLocaleDateString(undefined, {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </p>
                  </div>
                </div>
              </SidebarHeader>
              <div className="space-y-2 mt-20 sm:mt-16 md:mt-14">
                {children}
              </div>
            </SidebarGroup>
          </SidebarProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
