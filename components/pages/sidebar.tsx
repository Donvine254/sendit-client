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
  ChevronDown,
  CopyIcon,
  Dot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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

type Props = {
  user: sessionUser;
};
export default function UserSidenav({ user }: Props) {
  const pathname = usePathname();
  console.log(user);
  return (
    <div className="w-full bg-white border shadow rounded-md  transition-all duration-300">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center space-x-4">
          <Image
            className="w-8 h-8 rounded-full ring-offset-4 ring-2 ring-blue-600 ring-offset-white object-fit"
            alt="user-avatar"
            height={32}
            width={32}
            src={
              user.picture ||
              "https://res.cloudinary.com/dipkbpinx/image/upload/v1734556978/carhub/avatars/paqrtcgyypq1qelyzrwj.png"
            }
          />
          <p className="text-gray-700 font-semibold my-2 text-center capitalize">
            {user.full_name ?? `${user.given_name} ${user.family_name}`}
          </p>
        </div>
        <div className="flex space-x-2 px-4 py-2">
          <CircleFadingPlus className="h-5 w-5" />
        </div>
      </div>
      <hr />
      <div className="flex flex-wrap items-center gap-4 md:gap-8 lg:gap-10 px-4 py-2 w-full">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="flex items-center gap-1">
            <span className="text-sm">{user.email}</span>
            <button>
              <CopyIcon className="h-3 w-3 text-blue-500" />
            </button>
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Account</p>
          <button className="text-sm font-medium  px-2 rounded-xl bg-white text-blue-500 border flex items-center justify-start gap-1">
            <span>&#x2022;</span> <span>Normal User</span>
          </button>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Joined</p>
          <p className="text-sm font-medium">
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
      <nav className="flex items-center space-x-4 overflow-x-auto gap-4 p-4">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} title={item.title}>
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                item.label === "Sign out"
                  ? "hover:bg-destructive hover:text-destructive-foreground"
                  : ""
              } ${pathname === item.href ? "text-blue-600 bg-blue-50" : ""}`}>
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
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
          We'd love to hear your feedback! Please take a moment to review our
          service.
        </p>
        <Button variant="secondary" className="w-full">
          Leave a Review
        </Button>
      </div>
    </div>
  );
};
