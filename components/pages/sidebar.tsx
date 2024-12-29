"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Package, Settings, Star, LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { sessionUser } from "@/types";

const navItems = [
  { href: "/me/profile", label: "My Profile", icon: User },
  { href: "/me/orders", label: "My Orders", icon: Package },
  { href: "/me/settings", label: "Settings", icon: Settings },
  { href: "api/auth/logout", label: "Sign out", icon: LogOutIcon },
];

type Props = {
  user: sessionUser;
};
export default function UserSidenav({ user }: Props) {
  const pathname = usePathname();
  const [isReviewCardVisible, setIsReviewCardVisible] = useState(true);

  return (
    <div className="md:w-80 bg-white border shadow rounded-md md:sticky md:top-12 transition-all duration-300 h-full min-h-screen">
      <div className="flex flex-col items-center px-6 pt-4 ">
        <Image
          className="w-12 h-12 rounded-full"
          alt="user-avatar"
          height={48}
          width={48}
          src={
            user.picture ||
            "https://res.cloudinary.com/dipkbpinx/image/upload/v1734556978/carhub/avatars/paqrtcgyypq1qelyzrwj.png"
          }
        />
        <p className="text-gray-700 font-semibold my-2 text-center capitalize">
          {user.full_name || user.given_name}
        </p>
        <p className="text-gray-500 mb-2 break-words text-center">
          {user.email}
        </p>
      </div>

      <nav className="space-y-2 px-4  ">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? "default" : "ghost"}
              className={`w-full my-1 justify-start ${
                item.label === "Sign out"
                  ? "hover:bg-destructive hover:text-destructive-foreground"
                  : ""
              }`}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
      <hr />
      {isReviewCardVisible && (
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
              We'd love to hear your feedback! Please take a moment to review
              our service.
            </p>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => setIsReviewCardVisible(false)}>
              Leave a Review
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
