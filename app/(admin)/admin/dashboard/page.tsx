import { prisma } from "@/prisma/prisma";
import Charts from "@/components/dashboard/charts";
import RecentDeliveries from "@/components/dashboard/recent-deliveries";
import StatCards from "@/components/dashboard/stat-cards";
import React from "react";
export const revalidate = 600;
export default async function page() {
  const recentOrders = await prisma.parcel.findMany({
    where: {
      status: {
        not: "CANCELLED",
      },
    },
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <section>
      <StatCards />
      <Charts />
      <hr />
      <RecentDeliveries data={recentOrders} />
    </section>
  );
}
