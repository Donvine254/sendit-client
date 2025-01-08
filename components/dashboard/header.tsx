import { sessionUser } from "@/types";
import React from "react";
import { SidebarHeader, SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { RefreshCcw } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { SearchCommand } from "./search-dialog";
import { toZonedTime } from "date-fns-tz";
export default function Header({ user }: { user: sessionUser }) {
  function greetUser() {
    const data: [number, number, string][] = [
      [23, 4, "Good Night"],
      [5, 11, "Good Morning"],
      [12, 17, "Good Afternoon"],
      [18, 22, "Good Evening"],
    ];
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date();
    const zonedTime = toZonedTime(now, userTimezone);
    const hr = zonedTime.getHours();
    for (let i = 0; i < data.length; i++) {
      if (hr >= data[i][0] && hr <= data[i][1]) {
        return data[i][2];
      }
    }
  }

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
              {greetUser()} {user?.given_name}
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
          <button
            title="Sync"
            type="button"
            className="p-1 rounded-md bg-gray-200 text-blue-500 dark:bg-gray-600 dark:text-gray-100 group">
            <RefreshCcw className="h-4 w-4 group-hover:animate-spin transition-all delay-150" />
          </button>
          <ThemeToggle className="xsm:hidden" />
        </div>
      </div>
    </SidebarHeader>
  );
}
