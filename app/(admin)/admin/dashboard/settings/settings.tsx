"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import ThemeSelector from "./theme-selector";
import TimezoneSelector from "./timezone-selector";
import IntegrationCards from "./integration-cards";
import { LogOut } from "lucide-react";
export default function Settings() {
  return (
    <div className="w-full">
      <h2 className="font-bold text-xl sm:text-2xl md:text-3xl my-2 p-2 sm:p-4 lg:px-8">
        Dashboard Settings
      </h2>
      {/* parent for settings */}
      <Separator />
      <div className="space-y-2 py-2 p-2 sm:p-4">
        <div className="grid sm:grid-cols-2 gap-2 lg:p-4">
          <div>
            <h2 className="text-lg font-semibold">Language & Region</h2>
            <p className="text-sm text-muted-foreground">
              Customize your language and region
            </p>
          </div>
          <div>
            <div className="space-y-2">
              <label
                htmlFor="language"
                className="font-semibold block text-muted-foreground">
                Language
              </label>
              <select
                defaultValue="en"
                disabled
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                <option value="en">English</option>
                <option value="sw">Swahili</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="language"
                className="font-semibold block text-muted-foreground">
                Timezone
              </label>
              <TimezoneSelector />
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <ThemeSelector />
      <Separator />
      {/* div for integrations */}
      <IntegrationCards />
      {/* danger zone */}
      <Separator />
      <div className="space-y-2 py-2 pb-6 p-2 sm:p-4">
        <div className="grid sm:grid-cols-2 gap-2 lg:p-4">
          <div>
            <h2 className="text-lg font-semibold">Danger Zone</h2>
            <p className="text-sm text-muted-foreground">Destructive Actions</p>
          </div>
          <div className="grid lg:grid-cols-2 space-y-1 gap-4">
            <p className="text-sm text-muted-foreground">
              Logout from all sessions across all devices and browsers.
            </p>
            <Button
              className="justify-start xsm:w-fit "
              variant="destructive"
              asChild>
              <Link href="/api/auth/logout">
                <LogOut className="h-5 w-5" /> Logout All Sessions
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
