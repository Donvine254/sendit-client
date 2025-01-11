"use client";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { ExternalLink, SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
const integrations = [
  {
    id: 1,
    name: "Stripe",
    description:
      "A suite of APIs powering online payment processing and e-commerce solutions.",
    logo: "https://res.cloudinary.com/dipkbpinx/image/upload/v1736634859/logos/ciuykvh1jnmzcjpbigzh.png",
    href: "https://dashboard.stripe.com/test/dashboard",
  },
  {
    id: 2,
    name: "Vercel",
    description:
      "Deploy, scale, and manage web applications with a focus on performance and reliability.",
    logo: "https://res.cloudinary.com/dipkbpinx/image/upload/v1736624645/logos/nrwpszncu2y2krfcj1ic.png",
    href: "https://vercel.com/donvine254s-projects/sendit",
  },
  {
    id: 3,
    name: "Supabase",
    description:
      "An open-source backend as a service offering real-time databases, authentication, and APIs.",
    logo: "https://res.cloudinary.com/dipkbpinx/image/upload/v1736624645/logos/zcplelqaaljmdgv2g8gh.jpg",
    href: "https://supabase.com/dashboard/project/hdmwhtvaedhkwulrhqns",
  },
  {
    id: 4,
    name: "Kinde",
    description:
      "A modern authentication solution offering seamless user login, signup, and management features.",
    logo: "https://res.cloudinary.com/dipkbpinx/image/upload/v1736620242/logos/n0wv3bnj8wdk2wfjwbxv.jpg",
    href: "https://sendit.kinde.com/admin",
  },
  {
    id: 5,
    name: "Github",
    description:
      "A platform for version control and collaboration, enabling teams to build and ship software together.",
    logo: "https://res.cloudinary.com/dipkbpinx/image/upload/v1736620743/logos/x2vgalaho6b2l4xgo92c.svg",
    href: "https://github.com/Donvine254/sendit-client",
  },
  {
    id: 6,
    name: "Gmail",
    description:
      "Send customer notifications and receive security alert emails via Google Gmail.",
    logo: "https://res.cloudinary.com/dipkbpinx/image/upload/v1736622242/logos/ubadg8tke9linn1hbfvu.png",
    href: "https://mail.google.com/mail",
  },
];

interface IntegrationCardProps {
  id: number;
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
  id,
}: IntegrationCardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-input shadow bg-card relative flex flex-col h-full",
        id % 2 === 0 ? "dark:shadow-purple-500" : "dark:shadow-blue-600"
      )}>
      <Link href={href} className="p-2 absolute top-2 right-2" prefetch={false}>
        <ExternalLink className="h-4 w-4 text-muted-foreground" />
      </Link>
      <div className="p-6 flex flex-col flex-grow space-y-2">
        <Image
          src={logo}
          alt={name}
          height={48}
          width={48}
          className="h-12 w-12 rounded-lg ring-2 ring-input ring-offset-input dark:bg-gray-100"
        />
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm text-muted-foreground flex-grow">{description}</p>
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

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function IntegrationCards() {
  return (
    <div className="space-y-2 py-2 p-2 sm:p-4 lg:px-8">
      <h2 className="text-lg font-semibold">Integrations & Workflows</h2>
      <p className="text-sm text-muted-foreground">Manage your integrations</p>
      <motion.div
        className="grid gap-2 gap-y-4 md:gap-4 md:grid-cols-2 lg:grid-cols-3 items-center py-4"
        variants={gridVariants}
        initial="hidden"
        animate="visible">
        {integrations.map((int) => (
          <motion.div key={int.id} variants={cardVariants}>
            <IntegrationCard {...int} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
