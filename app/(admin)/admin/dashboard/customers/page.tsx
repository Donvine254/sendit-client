import { Metadata } from "next";
import React from "react";
import { getUsers } from "../../actions";
import { StatCard } from "@/components/dashboard/stat-cards";
import { KindeUser } from "@/types";

export const metadata: Metadata = {
  title: "Admin Dashboard | Sendit Kenya",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};

export default async function CustomersPage() {
  const users = (await getUsers()) as KindeUser[];
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const monthlyActiveUsers = users.filter((user) => {
    const lastSignInDate = new Date(user.last_signed_in);
    return (
      lastSignInDate.getMonth() === currentMonth &&
      lastSignInDate.getFullYear() === currentYear
    );
  });
  return (
    <section>
      <div className="grid gap-4 p-2 sm:p-4 md:p-6 sm:grid-cols-2">
        <StatCard
          data={users.length}
          percentage={20.1}
          title="Total Users"
          variant="down"
          period="Previous 365 Days"
          className="dark:shadow-red-600"
        />
        <StatCard
          data={monthlyActiveUsers.length}
          percentage={40.1}
          title="Monthly Active Users"
          variant="down"
          period="Previous 30 Days"
          className="dark:shadow-blue-600"
        />
      </div>
    </section>
  );
}
