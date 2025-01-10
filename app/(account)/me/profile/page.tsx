import React from "react";
import ProfilePage from "./profile";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { sessionUser } from "@/types";
import { getRecentOrders, getUserOrderStatistics } from "@/lib/actions";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sendit Courier- My Account | Profile",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = (await getUser()) as sessionUser | undefined;
  let recentOrders;
  let orderStats = {
    total_orders: 0,
    cancelled_orders: 0,
    pending_orders: 0,
  };
  if (user) {
    recentOrders = await getRecentOrders(user.id);
    orderStats = await getUserOrderStatistics(user.id);
  }

  return (
    <section>
      <ProfilePage recentOrders={recentOrders} orderStats={orderStats} />
    </section>
  );
}
