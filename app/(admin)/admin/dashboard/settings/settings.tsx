"use client";
import { Separator } from "@/components/ui/separator";
import React from "react";

const timezones = Intl.supportedValuesOf("timeZone");
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
              <select
                defaultValue="Africa/Nairobi"
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                <option value="">Select Timezone</option>
                {timezones.map((zone, index) => (
                  <option key={index} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <Separator />
      {/* div for integrations */}
      <div className="space-y-2 py-2 p-2 sm:p-4">
        <h2 className="text-lg font-semibold">Integrations & Workflows</h2>
        <p className="text-sm text-muted-foreground">
          Manage your integrations
        </p>
      </div>
    </div>
  );
}


const integrations = [
    {
      name: "Stripe",
      description: "Process payments and manage subscriptions",
      logo:"",
      href: "#stripe",
    },
    {
      name: "Vercel",
      description: "Deploy and host your applications",
      logo:"",
      href: "#vercel",
    },
    {
      name: "Supabase",
      description: "Database and authentication services",
      logo:"",
      href: "#supabase",
    },
    {
      name: "Kinde",
      description: "User authentication and management",
      logo:"",
      href: "#kinde",
    },
    {
      name: "Google",
      description: "Google services integration",
      logo:"",
      href: "#google",
    },
  ];