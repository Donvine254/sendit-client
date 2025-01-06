import Charts from "@/components/dashboard/charts";
import RecentDeliveries from "@/components/dashboard/recent-deliveries";
import StatCards from "@/components/dashboard/stat-cards";
import React from "react";
import { getRecentOrders, getDashboardStatistics } from "../actions";
export const revalidate = 600;
export default async function page() {
  const orders = await getRecentOrders();
  const statistics = await getDashboardStatistics();
  console.log(statistics);
  return (
    <section>
      <StatCards data={statistics} />
      <Charts />
      <hr />
      <RecentDeliveries data={orders} />
    </section>
  );
}
