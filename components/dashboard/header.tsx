import { sessionUser } from "@/types";
import React from "react";
import { SidebarHeader, SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";

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
    <SidebarHeader className="fixed top-0 h-20 z-10 bg-white w-full  border-b">
      <div className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 h-full">
          <SidebarTrigger className="-ml-1" title="collapse menu" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <p className="tracking-tight leading-tight inline-flex flex-col py-2 ">
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
        {/* TODO: Add search bar, sync button and theme toggle button */}
      </div>
    </SidebarHeader>
  );
}
