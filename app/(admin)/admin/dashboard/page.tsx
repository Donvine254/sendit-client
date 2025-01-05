import Charts from "@/components/dashboard/charts";
import RecentDeliveries from "@/components/dashboard/recent-deliveries";
import StatCards from "@/components/dashboard/stat-cards";
import React from "react";

export default function page() {
  return (
    <section>
      <StatCards />
      <Charts />
      <hr />
      <RecentDeliveries />
    </section>
  );
}
