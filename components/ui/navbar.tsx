"use client";
import Script from "next/script";
import React from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";

import Navbar from "./nav-items";
import { usePathname } from "next/navigation";
import { sessionUser } from "@/types";
export default function NavigationMenu({ user }: { user?: sessionUser }) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const pathname = usePathname();
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 300,
    damping: 50,
  });
  const isScrollingUp = useTransform(smoothVelocity, (v) => v < 0);
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]
  );
  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ["0px 0px 0px rgba(0,0,0,0)", "0px 4px 6px rgba(0,0,0,0.1)"]
  );
  const opacity = useTransform(scrollY, (y) =>
    y < 100 || isScrollingUp.get() ? 1 : 0
  );
  const position = useTransform(opacity, (o) =>
    o === 1 ? "fixed" : "absolute"
  );

  const motionStyle =
    pathname === "/"
      ? { backgroundColor, boxShadow, opacity, position }
      : {
          backgroundColor: "white",
          boxShadow: "none",
          opacity: 1,
          position: "fixed",
        };
  return (
    <menu className="relative bg-green-500 w-full" suppressHydrationWarning>
      <Script
        async
        defer
        src="https://unpkg.com/@themesberg/flowbite@1.1.1/dist/flowbite.bundle.js"></Script>
      <motion.section
        className="xsm:!bg-white text-blue-600 md:text-gray-700  z-20 py-4  top-0  w-full shadow"
        style={motionStyle as any}>
        <Navbar user={user} />
      </motion.section>
    </menu>
  );
}
