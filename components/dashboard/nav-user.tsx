"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { sessionUser } from "@/types";

export function NavUser({ user }: { user: sessionUser }) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Image
                className="h-8 w-8 rounded-lg"
                alt={user?.given_name || "User Avatar"}
                src={
                  user?.picture ??
                  `https://ui-avatars.com/api/?background=007bff&color=fff&name=${user?.given_name}+${user?.family_name}`
                }
                height={32}
                width={32}
                priority
              />

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate capitalize font-semibold">
                  {`${user?.given_name} ${user?.family_name}`}
                </span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Image
                  className="h-8 w-8 rounded-lg"
                  alt={user.given_name || "User Avatar"}
                  src={
                    user.picture ??
                    `https://ui-avatars.com/api/?background=007bff&color=fff&name=${user?.given_name}+${user?.family_name}`
                  }
                  height={32}
                  width={32}
                  priority
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold capitalize">
                    {" "}
                    {`${user?.given_name} ${user?.family_name}`}
                  </span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Invoices
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
