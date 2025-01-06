"use client";

import { type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function NavItems({
  items,
}: {
  items: {
    name: string;
    url: string;
    title: string;
    icon: LucideIcon;
    target?: string;
  }[];
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarMenu className="space-y-2">
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              tooltip={item.title}
              asChild
              className={`hover:bg-blue-100 hover:text-blue-600 ${
                pathname === item.url ? "bg-blue-100 text-blue-700" : ""
              }`}>
              <Link
                href={item.url}
                title={item.title}
                target={item.target ?? "_parent"}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <div className="p-2 border rounded-md shadow dark:border-gray-200">
          <ThemeToggle className="sm:hidden mx-auto" />
        </div>
      </SidebarMenu>
    </SidebarGroup>
  );
}
