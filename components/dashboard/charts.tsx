"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { revenueData, visitorsData } from "@/constants";
import { useTheme } from "next-themes";

// Register Chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler
);

export default function Charts() {
  // Prepare data for the revenue bar chart
  const { theme } = useTheme();
  const isLight = theme === "light";
  const revenueChartData = {
    labels: revenueData.map((item) => item.month),
    datasets: [
      {
        label: "Revenue",
        data: revenueData.map((item) => item.revenue),
        backgroundColor: revenueData.map((entry) => {
          const maxValue = Math.max(...revenueData.map((d) => d.revenue));
          const minValue = Math.min(...revenueData.map((d) => d.revenue));
          const normalizedOpacity =
            (entry.revenue - minValue) / (maxValue - minValue) || 0.5;
          const opacity = 0.5 + normalizedOpacity * 0.5;
          return `rgba(37, 99, 235, ${opacity})`;
        }),
        borderRadius: 5,
      },
    ],
  };

  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#2563eb",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = context.raw;
            return `${(value / 1000).toFixed(1)}K`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: isLight ? "#6b7280" : "#ffff",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: isLight ? "#6b7280" : "#ffff",
        },
        grid: {
          color: "#e4e4e7",
        },
      },
    },
  };

  // Prepare data for the visitors line chart
  const visitorsChartData = {
    labels: visitorsData.map((item) => item.month),
    datasets: [
      {
        label: "Visitors",
        data: visitorsData.map((item) => item.visitors),
        borderColor: "#2563eb",
        backgroundColor: isLight ? "rgba(191, 219, 254, 0.5)" : "#60a5fa",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const visitorsChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#2563eb",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: isLight ? "#6b7280" : "#ffff",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: isLight ? "#6b7280" : "#ffff",
        },
        grid: {
          color: "#e4e4e7",
        },
      },
    },
  };

  return (
    <div className="grid gap-4 md:md:group-has-[[data-collapsible=icon]]/sidebar-wrapper:grid-cols-2 lg:grid-cols-2 p-2 sm:p-4 md:p-6">
      <div className="rounded-lg border border-input  bg-card p-2 md:p-4 ">
        <h3 className="font-semibold mb-4">Revenue Trend</h3>
        <div style={{ height: 350 }} className="w-full ">
          <Bar data={revenueChartData} options={revenueChartOptions} />
        </div>
      </div>

      <div className="rounded-lg border bg-card border-input  p-2 md:p-4">
        <h3 className="font-semibold mb-4">Site Visitors</h3>
        <div style={{ height: 350 }} className="w-full">
          <Line data={visitorsChartData} options={visitorsChartOptions} />
        </div>
      </div>
    </div>
  );
}
type stat = {
  status: string;
  count: number;
  percentage: number;
  color: string;
};
export function StatsCard({
  stats,
  totalOrders,
  title,
}: {
  stats: stat[];
  totalOrders: number;
  title: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mx-auto rounded-lg border border-input bg-card p-6 text-card-foreground shadow dark:shadow-purple-600">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-1.5 pb-4">
        <div className="text-2xl font-semibold text-muted-foreground text-center">
          {title}
        </div>
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          className="text-[2.75rem] font-semibold tracking-tight">
          {totalOrders.toLocaleString()}
        </motion.div>
      </motion.div>
      <div className="space-y-4">
        {/* Progress bar */}
        <div className="h-2 flex rounded-full overflow-hidden">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.status}
              initial={{ width: 0 }}
              animate={{ width: `${stat.percentage}%` }}
              transition={{
                delay: 0.5 + index * 0.1,
                duration: 0.8,
                ease: "easeOut",
              }}
              className={`${stat.color}`}
            />
          ))}
        </div>
        {/* stats */}
        {/* show only on small devices */}
        <div className="space-y-2 sm:hidden">
          {stats.map((stat, index) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.8 + index * 0.1,
                duration: 0.5,
              }}
              key={stat.status}
              className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 1 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className={`h-3 w-3 rounded-full ${stat.color}`}
                />
                <span className="text-sm text-muted-foreground">
                  {stat.status}
                </span>
              </div>
              <div className="">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  className="text-sm tabular-nums">
                  {stat.count.toLocaleString()}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                  className="text-sm text-muted-foreground italic w-12 text-right">
                  ({stat.percentage.toFixed(0)}%)
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* hide on small devices */}
        <div className="hidden sm:grid grid-cols-2 xsm:leading-none gap-2 items-center pt-2">
          {stats.map((stat, index) => (
            <div key={stat.status} className="flex items-center gap-2 ">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 1 + index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                className={`h-3 w-3 rounded-full ${stat.color}`}
              />{" "}
              <span className="text-sm text-muted-foreground">
                {" "}
                {stat.status}:{" "}
              </span>
              <motion.span
                className="text-sm tabular-nums"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}>
                {stat.count}
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                className="text-muted-foreground text-sm">
                ({stat.percentage.toFixed(0)}%)
              </motion.span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function SatisfactionCard({
  percentage,
  title,
  text,
  callout,
}: {
  percentage: number;
  title: string;
  text: string;
  callout: string;
}) {
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="w-full rounded-lg border border-input bg-card p-6 text-card-foreground shadow mx-auto dark:shadow-yellow-600">
      <h2 className="text-2xl font-semibold text-muted-foreground text-center">
        {title}
      </h2>
      <div className="relative w-[200px] h-[100px] mx-auto my-2">
        {/* Background circle */}
        <svg
          className="w-full h-full -rotate-90 transform"
          viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            className="stroke-slate-100"
            strokeWidth="12"
            fill="none"
          />
          {/* Animated progress circle */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            className="stroke-green-500"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
        {/* Center emoji */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5, type: "spring" }}>
            <svg
              width="1.5rem"
              height="1.5rem"
              fill="currentColor"
              viewBox="0 0 512 512"
              className="w-6 h-6 text-green-500">
              <path d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1-512 0zm407.4 75.5c5-11.8-7-22.5-19.3-18.7-39.7 12.2-84.5 19-131.8 19s-92.1-6.8-131.8-19c-12.3-3.8-24.3 6.9-19.3 18.7 25 59.1 83.2 100.5 151.1 100.5s126.2-41.4 151.1-100.5zM160 120c-3.1 0-5.9 1.8-7.2 4.6l-16.6 34.7-38.1 5c-3.1.4-5.6 2.5-6.6 5.5s-.1 6.2 2.1 8.3l27.9 26.5-7 37.8c-.6 3 .7 6.1 3.2 7.9s5.8 2 8.5.6l33.8-18.4 33.8 18.3c2.7 1.5 6 1.3 8.5-.6s3.7-4.9 3.2-7.9l-7-37.8 27.9-26.5c2.2-2.1 3.1-5.3 2.1-8.3s-3.5-5.1-6.6-5.5l-38.1-5-16.6-34.7c-1.3-2.8-4.1-4.6-7.2-4.6zm192 0c-3.1 0-5.9 1.8-7.2 4.6l-16.6 34.7-38.1 5c-3.1.4-5.6 2.5-6.6 5.5s-.1 6.2 2.1 8.3l27.9 26.5-7 37.8c-.6 3 .7 6.1 3.2 7.9s5.8 2 8.5.6l33.8-18.4 33.8 18.3c2.7 1.5 6 1.3 8.5-.6s3.7-4.9 3.2-7.9l-7-37.8 27.9-26.5c2.2-2.1 3.1-5.3 2.1-8.3s-3.5-5.1-6.6-5.5l-38.1-5-16.6-34.7c-1.3-2.8-4.1-4.6-7.2-4.6z" />
            </svg>
          </motion.div>
        </div>
      </div>
      <div className="text-center py-0.5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}>
          <h3 className="text-emerald-400 text-lg md:text-xl font-bold">
            {/* callout text */}
            {callout}
          </h3>
          <p className="text-muted-foreground my-1">
            <span className="font-bold">{percentage.toFixed(0)}%</span> {text}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
