"use client";

import Image from "next/image";
import { useAppContext } from "@/context/context";
export default function UserImage({ src }) {
  const { currentUser } = useAppContext();
  const imageSrc = currentUser?.picture || src;
  return (
    <Image
      className="h-8 w-8 md:h-10 md:w-10 rounded-full ring-2 ring-blue-800 ring-offset-base-100 ring-offset-2"
      src={imageSrc}
      width={48}
      height={48}
      alt="user profile avatar"
      referrerPolicy="no-referrer"
    />
  );
}

export const FallbackImage = () => {
  return (
    <Image
      className="h-8 w-8 md:h-10 md:w-10 rounded-full ring-2 ring-blue-800 ring-offset-base-100 ring-offset-2"
      src={user?.picture}
      width={48}
      height={48}
      alt="user profile avatar"
      referrerPolicy="no-referrer"
    />
  );
};
