import React from "react";
import ProfilePage from "./profile";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { sessionUser } from "@/types";
import { getRecentOrders } from "@/lib/actions";
import { redirect } from "next/navigation";
import { Parcel } from "@prisma/client";

type Props = {};

export default async function Page({}: Props) {
  const { getUser, getPermission } = getKindeServerSession();
  const user = (await getUser()) as sessionUser;
  if (!user) {
    return redirect(`/api/auth/login`);
  }
  const recentOrders = (await getRecentOrders(user.id)) as Parcel[];
  return (
    <section>
      <ProfilePage user={user} recentOrders={recentOrders} />
    </section>
  );
}
