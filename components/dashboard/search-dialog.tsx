"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  DollarSign,
  FileText,
  LayoutDashboard,
  LucideTruck,
  PieChart,
  Search,
  Settings,
  Users,
  WebhookIcon,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DialogTitle } from "../ui/dialog";

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
      url: "https://sendit.kinde.com/admin",
      title: "Manage Customers - External Link",
      icon: Users,
      target: "_blank",
    },
    {
      name: "Web Analytics",
      url: "https://vercel.com/donvine254s-projects/sendit/analytics",
      title: "View website performance",
      icon: WebhookIcon,
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
      icon: DollarSign,
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

export function SearchCommand() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center max-w-xs w-full px-3 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
        <Search className="h-4 w-4 text-gray-500 mr-2" />
        <span className="text-sm text-gray-500 flex-grow text-left">
          Search...
        </span>
        <span className="text-sm text-muted-foreground">⌘+K</span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle />
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            {data.items.map((item) => (
              <CommandItem
                key={item.name}
                onSelect={() => {
                  runCommand(() => {
                    if (item.target === "_blank") {
                      window.open(item.url, "_blank");
                    } else {
                      router.push(item.url);
                    }
                  });
                }}>
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
