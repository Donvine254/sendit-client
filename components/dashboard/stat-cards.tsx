import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

export default function statCards({
  data,
}: {
  data: {
    totalOrders: number;
    totalRevenue: number;
    totalUsers: number;
  };
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3 p-2 sm:p-4 md:p-6">
      {/* first card */}
      <div className="rounded-lg border border-input bg-card shadow p-6">
        <div className="text-sm font-medium text-muted-foreground flex justify-between gap-2 items-center">
          <h3 className="font-semibold text-lg">Total Revenue</h3>
          <span className="bg-green-100 text-green-700 text-xs flex items-center gap-1 font-medium px-2 py-1 rounded-md">
            <TrendingUp />
            20.1%
          </span>
        </div>
        <div className="my-2 text-2xl md:text-3xl lg:text-4xl font-bold">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "KES",
          }).format(data.totalRevenue)}
        </div>
        <p className="text-xs text-muted-foreground">From Jan 1st - Jul 31st</p>
      </div>
      {/* second card */}
      <div className="rounded-lg border bg-card border-input  p-6 shadow">
        <div className="text-sm font-medium text-muted-foreground flex justify-between gap-2 items-center">
          <h3 className="font-semibold text-lg">Deliveries</h3>
          <span className="bg-green-100 text-green-700 text-xs flex items-center gap-1 font-medium px-2 py-1 rounded-md">
            <TrendingUp />
            120.1%
          </span>
        </div>
        <div className="my-2 text-2xl md:text-4xl font-bold">
          {data.totalOrders}
        </div>
        <p className="text-xs text-muted-foreground">From Jan 1st - Jul 31st</p>
      </div>
      {/* third card */}
      <div className="rounded-lg border bg-card border-input p-6 shadow">
        <div className="text-sm font-medium text-muted-foreground flex justify-between gap-2 items-center">
          <h3 className="font-semibold text-lg">Active Users</h3>
          <span className="bg-red-100 text-red-700 text-xs flex items-center gap-1 font-medium px-2 py-1 rounded-md">
            <TrendingDown />
            20.1%
          </span>
        </div>
        <div className="my-2 text-2xl md:text-4xl font-bold">
          {data.totalUsers}
        </div>
        <p className="text-xs text-muted-foreground">Previous 365 days</p>
      </div>
    </div>
  );
}
