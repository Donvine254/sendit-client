"use client";

import * as React from "react";
import {
  Activity,
  Box,
  FileText,
  Landmark,
  LayoutDashboard,
  LucideTruck,
  PieChart,
  Settings,
  Users,
} from "lucide-react";

import { NavItems } from "./nav-items";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { sessionUser } from "@/types";
import { MobileThemeToggle } from "./theme-toggle";

// This is sample data.
const data = {
  items: [
    {
      name: "Overview",
      url: "/admin/dashboard",
      title: "Overview",
      icon: LayoutDashboard,
    },
    {
      name: "Deliveries",
      url: "/admin/dashboard/deliveries",
      title: "Manage Deliveries",
      icon: Box,
    },
    {
      name: "Invoices",
      url: "/admin/dashboard/invoices",
      title: "Manage Invoices",
      icon: FileText,
    },
    {
      name: "Customers",
      url: "/admin/dashboard/customers",
      title: "Manage Customers",
      icon: Users,
    },
    {
      name: "Web Analytics",
      url: "https://vercel.com/donvine254s-projects/sendit/analytics",
      title: "View website performance",
      icon: Activity,
      target: "_blank",
    },
    {
      name: "Riders",
      url: "#",
      title: "Manage Riders",
      icon: LucideTruck,
    },
    {
      name: "Finances",
      url: "https://dashboard.stripe.com/test/payments",
      title: "Manage Finances",
      icon: Landmark,
      target: "_blank",
    },
    {
      name: "Sales & Marketing",
      title: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Settings",
      title: "Adjust settings",
      url: "/admin/dashboard/settings",
      icon: Settings,
    },
  ],
};
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: sessionUser;
}
export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-[#F8F9FA] dark:bg-black transition-colors duration-300 border-b border-input h-20">
        <NavUser user={user} />
      </SidebarHeader>
      <SidebarContent className="dark:bg-none  bg-gradient-to-b from-[#f6faff] via-[#f8f9fa] to-[#eaf3ff]  transition-colors duration-300 border-r border-input">
        <NavItems items={data.items} />
      </SidebarContent>
      <SidebarFooter className="border-t  border-input">
        <MobileThemeToggle />
        <Image
          src="/logo.svg"
          width={100}
          height={30}
          priority
          alt="sendit-logo"
          className="mx-auto xsm:hidden"
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
