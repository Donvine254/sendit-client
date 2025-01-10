"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  Home,
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
import Link from "next/link";

export function NavUser({ user }: { user?: sessionUser }) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu className="h-full flex items-center justify-center">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              {user?.picture &&
              user?.picture.startsWith("https://gravatar.com/avatar") ? (
                <Image
                  className="h-8 w-8 rounded-lg"
                  alt={user.given_name || "User Avatar"}
                  height={32}
                  width={32}
                  priority
                  src={`https://ui-avatars.com/api/?background=007bff&color=fff&name=${user?.given_name}+${user?.family_name}`}
                />
              ) : (
                <Image
                  className="h-8 w-8 rounded-lg"
                  alt={user?.given_name || "User Avatar"}
                  priority
                  height={32}
                  width={32}
                  src={
                    user?.picture ??
                    `https://ui-avatars.com/api/?background=007bff&color=fff&name=${user?.given_name}+${user?.family_name}`
                  }
                />
              )}

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
                {user?.picture &&
                user?.picture.startsWith("https://gravatar.com/avatar") ? (
                  <Image
                    className="h-8 w-8 rounded-lg"
                    alt={user.given_name || "User Avatar"}
                    priority
                    height={32}
                    width={32}
                    src={`https://ui-avatars.com/api/?background=007bff&color=fff&name=${user?.given_name}+${user?.family_name}`}
                  />
                ) : (
                  <Image
                    className="h-8 w-8 rounded-lg"
                    alt={user?.given_name || "User Avatar"}
                    priority
                    height={32}
                    width={32}
                    src={
                      user?.picture ??
                      `https://ui-avatars.com/api/?background=007bff&color=fff&name=${user?.given_name}+${user?.family_name}`
                    }
                  />
                )}
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
              <DropdownMenuItem asChild>
                <Link href="/">
                  <Home />
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/me/profile">
                  <BadgeCheck />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/me/invoices">
                  <CreditCard />
                  Invoices
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/me/settings#notifications">
                  <Bell />
                  Notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/api/auth/logout">
                <LogOut />
                Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
