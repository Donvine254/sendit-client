import { sessionUser } from "@/types";
import React from "react";
import { SidebarHeader, SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { Moon, RefreshCcw, Search } from "lucide-react";
import { Button } from "../ui/button";

export default function Header({ user }: { user: sessionUser }) {
  function greetUser() {
    const data: [number, number, string][] = [
      [0, 4, "Good Night"],
      [5, 11, "Good Morning"],
      [12, 17, "Good Afternoon"],
      [18, 24, "Good Night"],
    ];
    const hr = new Date().getHours();

    for (let i = 0; i < data.length; i++) {
      if (hr >= data[i][0] && hr <= data[i][1]) {
        return data[i][2];
      }
    }
  }

  return (
    // <SidebarHeader className="fixed top-0 h-20 z-10 bg-red-500 w-full  border-b">
    //   <div className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
    //     <div className="flex items-center gap-2 px-4 h-full">
    //       <SidebarTrigger className="-ml-1" title="collapse menu" />
    //       <Separator orientation="vertical" className="mr-2 h-4" />
    //       <p className="tracking-tight leading-tight inline-flex flex-col py-2 ">
    //         <span className="font-semibold leading-tight capitalize">
    //           {greetUser()} {user?.given_name}
    //         </span>
    //         <span className="text-muted-foreground text-xs sm:text-sm">
    //           {new Date().toLocaleDateString(undefined, {
    //             weekday: "long",
    //             month: "short",
    //             day: "numeric",
    //             year: "numeric",
    //           })}
    //         </span>
    //       </p>
    //     </div>
    //     {/* TODO: Add search bar, sync button and theme toggle button */}
    //   </div>
    // </SidebarHeader>
    <SidebarHeader className="fixed top-0 h-20 z-10 bg-white w-full border-b">
      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4 h-full w-full px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" title="collapse menu" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <p className="tracking-tight leading-tight inline-flex flex-col py-2">
            <span className="font-semibold leading-tight capitalize">
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
        <div className="hidden md:flex items-center min-w-md">
          <div className="relative flex items-center w-full">
            <Search className="absolute left-2 h-5 w-5 text-gray-500" />
            <input
              type="search"
              placeholder="Search.."
              className="w-full pl-8 pr-10 py-1 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
            />
            <span className="absolute right-2 text-sm text-muted-foreground">
              ⌘+K
            </span>
          </div>
        </div>

        {/* Right Section (Sync Button and Theme Toggle) */}
        <div className="md:flex md:static items-center justify-start group-has-[[data-collapsible=icon]]/sidebar-wrapper:justify-center absolute right-1">
          <Button variant="ghost" size="icon" title="Sync">
            <RefreshCcw className="h-5 w-5 text-blue-700" />
          </Button>
          <Button variant="ghost" size="icon" title="Toggle Theme">
            <Moon className="h-5 w-5 text-gray-700" />
          </Button>
        </div>
      </div>
    </SidebarHeader>
  );
}
