"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Star {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
}
const StarBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => {
    const generatedStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      // Reduce the duration to increase speed (e.g., between 5 and 15 seconds)
      duration: Math.random() * 10 + 5,
    }));
    setStars(generatedStars);
  }, []);
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            y: ["0%", "100%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 pt-10 md:pt-12 relative overflow-hidden">
      <StarBackground />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center z-10">
        <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold text-blue-400 mb-2">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-2 text-white">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-300 mb-2">
          Looks like this page got lost in the cosmos!
        </p>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
        className="w-64 h-64 mb-2">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <motion.path
            d="M 100 100 L 100 30 A 70 70 0 1 1 30 100 L 100 100"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.circle
            cx="100"
            cy="100"
            r="20"
            fill="#3B82F6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 1.5,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          />
          <motion.rect
            x="90"
            y="90"
            width="20"
            height="20"
            fill="#1E40AF"
            initial={{ opacity: 0, rotate: 45 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
          />
        </svg>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="z-10">
        <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white">
          <Link href="/">Return to Homepage</Link>
        </Button>
      </motion.div>
    </div>
  );
}
