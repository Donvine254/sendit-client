"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package,
  Settings,
  Star,
  LogOutIcon,
  CircleFadingPlus,
  HeadsetIcon,
  HouseIcon,
  CopyIcon,
  FileText,
  ChevronRight,
  BadgeCheck,
  Sparkles,
  Grid2x2Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { sessionUser } from "@/types";

const navItems = [
  {
    href: "/me/profile",
    label: "My Profile",
    icon: HouseIcon,
    title: "View Profile Details",
  },
  {
    href: "/me/orders",
    label: "My Orders",
    icon: Package,
    title: "View Your Orders",
  },
  {
    href: "/me/invoices",
    label: "Invoices",
    icon: FileText,
    title: "View Your Invoices",
  },
  {
    href: "/me/settings",
    label: "Settings",
    icon: Settings,
    title: "Adjust Settings",
  },
  {
    href: "/help",
    label: "Support",
    icon: HeadsetIcon,
    title: "Contact Support",
  },
  {
    href: "api/auth/logout",
    label: "Sign out",
    icon: LogOutIcon,
    title: "logout",
  },
];

export default function UserSidenav({
  data,
  permission,
  user,
}: {
  data: any | {};
  user: sessionUser | null;
  permission: any | {};
}) {
  const pathname = usePathname();
  const isAdmin = permission?.isGranted;
  function getCurrentDate(): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return new Date().toLocaleDateString("en-US", options);
  }
  const date = getCurrentDate();
  return (
    <div>
      <div className="w-full bg-white border shadow rounded-md  transition-all duration-300">
        <div className="flex justify-between items-center px-4 pb-2 pt-4">
          <div className="flex items-center space-x-4">
            {user?.picture &&
            user?.picture.startsWith("https://gravatar.com/avatar") ? (
              <Image
                className="w-12 h-12 rounded-full ring-offset-2 ring-2 ring-blue-600 ring-offset-white object-cover"
                alt="user-avatar"
                height={48}
                width={48}
                src={`https://ui-avatars.com/api/?background=007bff&color=fff&name=${data.first_name}+${data.last_name}`}
              />
            ) : (
              <Image
                className="w-12 h-12 rounded-full ring-offset-2 ring-2 ring-blue-600 ring-offset-white object-cover"
                alt="user-avatar"
                height={48}
                width={48}
                src={
                  user?.picture ??
                  `https://ui-avatars.com/api/?background=007bff&color=fff&name=${data.first_name}+${data.last_name}`
                }
              />
            )}

            <div className="flex flex-col">
              <span className="text-gray-700 font-semibold text-sm capitalize flex gap-1 items-baseline truncate">
                {`${data?.first_name} ${data?.last_name}`}{" "}
                <BadgeCheck className="text-sm h-3 w-3 text-blue-500" />
              </span>
              <span className="text-xs md:text-sm text-muted-foreground">
                {date}
              </span>
            </div>
          </div>

          <div
            className="flex space-x-2 gap-2 px-4 py-2"
            title="Go to dashboard">
            {isAdmin && (
              <Link href="/admin/dashboard?utm=profile">
                <Grid2x2Plus className="h-5 w-5 text-blue-600" />
              </Link>
            )}
            <Link
              title="update shipping address"
              scroll
              href="/me/settings#shipping">
              {" "}
              <CircleFadingPlus className="h-5 w-5 text-blue-600" />
            </Link>
          </div>
        </div>
        <hr />
        <div className="flex flex-wrap items-center gap-4 md:gap-8 lg:gap-10 p-4 w-full">
          <div className="space-y-1 ">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="flex items-center gap-1 text-gray-600">
              <span className="text-sm xsm:text-xs truncate">
                {data.preferred_email}
              </span>
              <button
                title="copy email"
                onClick={() => {
                  navigator.clipboard
                    .writeText(data.preferred_email || "")
                    .then(() => {
                      toast.success("Email Copied Successfully", {
                        position: "top-center",
                      });
                    })
                    .catch((error) => {
                      toast.error("Failed to copy email");
                      console.error("Clipboard error:", error);
                    });
                }}>
                <CopyIcon className="h-3 w-3 text-blue-500" />
              </button>
            </p>
          </div>
          <div className="space-y-1 md:border-l-2 md:px-2">
            <p className="text-sm text-muted-foreground">Account</p>
            {isAdmin ? (
              <Link
                href="/admin/dashboard?utm=profile"
                className="text-sm xsm:text-xs font-medium  px-2 rounded-xl border flex items-center justify-start bg-blue-500 text-white">
                ✪ Admin
              </Link>
            ) : (
              <button className="text-sm xsm:text-xs font-medium  px-2 rounded-xl border flex items-center justify-start gap-1 bg-white text-blue-500">
                <Sparkles className="h-3 w-3 text-yellow-500" />
                <span> Normal User</span>
              </button>
            )}
          </div>

          <div className="space-y-1 md:border-l-2 md:px-2">
            <p className="text-sm text-muted-foreground">Joined</p>
            <p className="text-sm xsm:text-xs text-gray-600">
              {new Date(data.created_on).toLocaleDateString()}
            </p>
          </div>
          <div className="space-y-1 md:border-l-2 md:px-2">
            <p className="text-sm text-muted-foreground">Last Login</p>
            <p className="text-sm xsm:text-xs text-gray-600 ">
              {new Date(data.last_signed_in).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <nav className="flex items-center  overflow-x-auto py-4">
        {navItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            title={item.title}
            prefetch={false}
            className="flex items-center gap-2">
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                item.label === "Sign out"
                  ? "hover:bg-destructive hover:text-destructive-foreground"
                  : "hover:bg-blue-100"
              } ${
                pathname === item.href || pathname.includes(item.href)
                  ? "text-blue-600 bg-blue-100 font-semibold"
                  : ""
              }`}>
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
            <ChevronRight
              className={`text-muted-foreground ${index === 5 ? "hidden" : ""}`}
            />
          </Link>
        ))}
      </nav>
      <hr />
    </div>
  );
}

export const reviewCard = () => {
  return (
    <div className="m-4 p-6 rounded-lg bg-blue-600 text-white shadow">
      <div className="p-4 space-y-4">
        <div className="flex items-center space-x-2 justify-center">
          <Star className="h-5 w-5 text-yellow-400" />
          <Star className="h-5 w-5 text-yellow-400" />
          <Star className="h-5 w-5 text-yellow-400" />
          <Star className="h-5 w-5 text-yellow-400" />
          <Star className="h-5 w-5 text-yellow-400" />
        </div>
        <h3 className="font-semibold text-center">
          Love Our Services? Leave Us a Review{" "}
        </h3>
        <p className="text-sm text-gray-100">
          We&apos;d love to hear your feedback! Please take a moment to review
          our service.
        </p>
        <Button variant="secondary" className="w-full">
          Leave a Review
        </Button>
      </div>
    </div>
  );
};
