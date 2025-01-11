"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ExternalLink, SettingsIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 space-y-2 items-center">
          {integrations.map((int, index) => (
            <IntegrationCard key={index} {...int} />
          ))}
        </div>
      </div>
    </div>
  );
}

const integrations = [
  {
    name: "Stripe",
    description:
      "A suite of APIs powering online payment processing and e-commerce solutions.",
    logo: "https://mybroadband.co.za/news/wp-content/uploads/2017/07/Stripe-logo-595x400.jpg",
    href: "https://dashboard.stripe.com/test/dashboard",
  },
  {
    name: "Vercel",
    description:
      "Deploy, scale, and manage web applications with a focus on performance and reliability.",
    logo: "https://res.cloudinary.com/dipkbpinx/image/upload/v1736624645/logos/nrwpszncu2y2krfcj1ic.png",
    href: "https://vercel.com/donvine254s-projects/sendit",
  },
  {
    name: "Supabase",
    description:
      "An open-source backend as a service offering real-time databases, authentication, and APIs.",
    logo: "https://res.cloudinary.com/dipkbpinx/image/upload/v1736624645/logos/zcplelqaaljmdgv2g8gh.jpg",
    href: "https://supabase.com/dashboard/project/hdmwhtvaedhkwulrhqns",
  },
  {
    name: "Kinde",
    description:
      "A modern authentication solution offering seamless user login, signup, and management features.",
    logo: "https://res.cloudinary.com/dipkbpinx/image/upload/v1736620242/logos/n0wv3bnj8wdk2wfjwbxv.jpg",
    href: "https://sendit.kinde.com/admin",
  },
  {
    name: "Github",
    description:
      "A platform for version control and collaboration, enabling teams to build and ship software together.",
    logo: "https://res.cloudinary.com/dipkbpinx/image/upload/v1736620743/logos/x2vgalaho6b2l4xgo92c.svg",
    href: "https://github.com/Donvine254/sendit-client",
  },
  {
    name: "GMAIL",
    description:
      "Send customer notifications and receive security alert emails via Google Gmail.",
    logo: "https://res.cloudinary.com/dipkbpinx/image/upload/v1736622242/logos/ubadg8tke9linn1hbfvu.png",
    href: "#google",
  },
];

interface IntegrationCardProps {
  name: string;
  description: string;
  logo: string;
  href: string;
}
const IntegrationCard = ({
  name,
  description,
  logo,
  href,
}: IntegrationCardProps) => {
  return (
    <div className="rounded-lg border border-input shadow dark:shadow-blue-500  relative">
      <Link
        href={href}
        className="p-2 absolute top-2 right-2 "
        prefetch={false}>
        {" "}
        <ExternalLink className="h-4 w-4 text-muted-foreground " />
      </Link>
      <div className="p-6 space-y-2">
        <Image
          src={logo}
          alt={name}
          height={48}
          width={48}
          className="h-12 w-12 rounded-lg ring-2 ring-input ring-offset-input dark:bg-gray-100"
        />
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Separator />
      <div className="flex items-center justify-between px-6 py-2 space-y-2">
        <Button className="justify-start gap-1" variant="outline" asChild>
          <Link href={href} prefetch={false}>
            <SettingsIcon />
            Settings
          </Link>
        </Button>
        <Switch checked />
      </div>
    </div>
  );
};
