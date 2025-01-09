import { sessionUser } from "@/types";
import React from "react";
import { SidebarHeader, SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { ThemeToggle } from "./theme-toggle";
import { SearchCommand } from "./search-dialog";
import SyncButton from "./sync-button";
export default function Header({ user }: { user: sessionUser }) {
  return (
    <SidebarHeader className="fixed top-0 h-20 z-10 bg-white dark:bg-black transition-colors duration-300 w-full border-b border-input">
      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4 h-full w-full px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" title="collapse menu" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <p className="tracking-tight leading-tight inline-flex flex-col py-2">
            {/* account for when users have a really long name */}
            <span className="font-semibold leading-tight truncate capitalize">
              Hello {user?.given_name}!
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

        {/* Center Section (Search Bar) */}
        <div className="hidden md:block">
          <SearchCommand />
        </div>
        {/* Right Section (Sync Button and Theme Toggle) */}
        <div
          className="flex md:static items-center gap-4 justify-start group-has-[[data-collapsible=icon]]/sidebar-wrapper:justify-center absolute right-0"
          suppressHydrationWarning>
          <SyncButton />
          <ThemeToggle className="xsm:hidden" />
        </div>
      </div>
    </SidebarHeader>
  );
}
