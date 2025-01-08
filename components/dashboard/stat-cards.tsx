"use client";
import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function statCards({
  data,
}: {
  data: {
    totalOrders: number;
    totalRevenue: number;
    totalUsers: number;
  };
}) {
  function formatCurrency(value: number) {
    if (value >= 1_000_000) {
      return `KSH ${(value / 1_000_000).toFixed(1)}M `;
    }
    if (value >= 100_000) {
      return `KSH ${(value / 1_000).toFixed(0)}K`;
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KSH",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }
  return (
    <div className="grid gap-4 p-2 sm:p-4 md:p-6 md:group-has-[[data-collapsible=icon]]/sidebar-wrapper:grid-cols-3 lg:grid-cols-3">
      {/* first card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-lg border border-input bg-card shadow p-6 dark:shadow-purple-600">
        <div className="text-sm font-medium text-muted-foreground flex justify-between gap-2 items-center">
          <h3 className="font-semibold text-lg">Total Revenue</h3>
          <span className="bg-green-100 text-green-700 text-xs flex items-center gap-1 font-medium px-2 py-1 rounded-md">
            <TrendingUp />
            20.1%
          </span>
        </div>
        <div className="my-2 text-2xl md:text-3xl lg:text-4xl font-bold">
          {formatCurrency(data.totalRevenue)}
        </div>
        <p className="text-xs text-muted-foreground">From Jan 1st - Jul 31st</p>
      </motion.div>
      {/* second card */}
      <motion.div
        className="rounded-lg border bg-card border-input p-6 shadow dark:shadow-blue-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}>
        <div className="text-sm font-medium text-muted-foreground flex justify-between gap-2 items-center">
          <h3 className="font-semibold text-lg">Deliveries</h3>
          <motion.span
            className="bg-green-100 text-green-700 text-xs flex items-center gap-1 font-medium px-2 py-1 rounded-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <TrendingUp />
            120.1%
          </motion.span>
        </div>
        <motion.div
          className="my-2 text-2xl md:text-4xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}>
          {data.totalOrders}
        </motion.div>
        <p className="text-xs text-muted-foreground">From Jan 1st - Jul 31st</p>
      </motion.div>
      {/* third card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-lg border bg-card border-input p-6 shadow dark:shadow-purple-600">
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
      </motion.div>
    </div>
  );
}
