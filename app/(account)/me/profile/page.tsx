import React from "react";
import ProfilePage from "./profile";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { sessionUser } from "@/types";
import { getRecentOrders, getUserOrderStatistics } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = (await getUser()) as sessionUser;
  if (!user) {
    return redirect(`/api/auth/login`);
  }
  const recentOrders = await getRecentOrders(user.id);
  const orderStats = await getUserOrderStatistics(user.id);
  return (
    <section>
      <ProfilePage
        user={user}
        recentOrders={recentOrders}
        orderStats={orderStats}
      />
    </section>
  );
}
