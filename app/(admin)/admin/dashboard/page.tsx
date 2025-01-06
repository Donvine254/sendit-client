import Charts from "@/components/dashboard/charts";
import RecentDeliveries from "@/components/dashboard/recent-deliveries";
import StatCards from "@/components/dashboard/stat-cards";
import React from "react";
import { getRecentOrders, getDashboardStatistics } from "../actions";
import { Metadata } from "next";
export const revalidate = 600;
export const metadata: Metadata = {
  title: "Admin Dashboard | Sendit Kenya",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};
export const dynamic = "force-dynamic";
export default async function page() {
  const orders = await getRecentOrders();
  const statistics = await getDashboardStatistics();
  return (
    <section>
      <StatCards data={statistics} />
      <Charts />
      <hr />
      <RecentDeliveries data={orders} />
    </section>
  );
}
