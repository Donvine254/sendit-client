"use client";

import * as React from "react";
import {
  Box,
  DollarSign,
  FileText,
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

// This is sample data.
const data = {
  items: [
    {
      name: "Dashboard",
      url: "/",
      title: "Overview",
      icon: LayoutDashboard,
    },
    {
      name: "Deliveries",
      url: "/deliveries",
      title: "Manage Deliveries",
      icon: Box,
    },
    {
      name: "Invoices",
      url: "/invoices",
      title: "Manage Invoices",
      icon: FileText,
    },
    {
      name: "Customers",
      url: "/customers",
      title: "Manage Customers",
      icon: Users,
    },
    {
      name: "Riders",
      url: "/riders",
      title: "Manage Riders",
      icon: LucideTruck,
    },
    {
      name: "Finance",
      url: "/finance",
      title: "Manage Finances",
      icon: DollarSign,
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
      url: "/settings",
      icon: Settings,
    },
  ],
};
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: sessionUser;
}
export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-[#F8F9FA] border-b">
        <NavUser user={user} />
      </SidebarHeader>
      <SidebarContent className="bg-gradient-to-b from-[#f6faff] via-[#f8f9fa] to-[#eaf3ff]">
        <NavItems items={data.items} />
      </SidebarContent>
      <SidebarFooter className="border-t">
        <Image
          src="/logo.svg"
          width={100}
          height={30}
          priority
          alt="sendit-logo"
          className="mx-auto"
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
