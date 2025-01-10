"use client";
import { cn } from "@/lib/utils";
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
      <StatCard
        data={formatCurrency(data.totalRevenue)}
        percentage={20.1}
        title="Revenue"
        variant="up"
        period="From Jan 1st - Jul 31st"
        className="dark:shadow-purple-600"
      />
      {/* second card */}
      <StatCard
        data={data.totalOrders}
        percentage={120.1}
        title="Deliveries"
        variant="up"
        period="From Jan 1st - Jul 31st"
        className="dark:shadow-blue-600"
      />
      {/* third card */}
      <StatCard
        data={data.totalUsers}
        percentage={20.1}
        title="Total Users"
        variant="down"
        period="Previous 365 Days"
        className="dark:shadow-purple-600"
      />
    </div>
  );
}

export const StatCard = ({
  data,
  percentage,
  title,
  variant,
  period,
  className,
}: {
  data: number | string;
  percentage: number;
  title: string;
  variant: "up" | "down";
  period: string;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "rounded-lg border bg-card border-input p-6 shadow ",
        className
      )}>
      <div className="text-sm font-medium text-muted-foreground flex justify-between gap-2 items-center">
        <h3 className="font-semibold text-lg">{title}</h3>
        {variant === "up" ? (
          <motion.span
            className="bg-green-100 text-green-700 text-xs flex items-center gap-1 font-medium px-2 py-1 rounded-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <TrendingUp />
            {percentage}%
          </motion.span>
        ) : (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-red-100 text-red-700 text-xs flex items-center gap-1 font-medium px-2 py-1 rounded-md">
            <TrendingDown />
            {percentage}%
          </motion.span>
        )}
      </div>
      <div className="my-2 text-2xl md:text-4xl font-bold">{data}</div>
      <p className="text-xs text-muted-foreground">{period}</p>
    </motion.div>
  );
};
