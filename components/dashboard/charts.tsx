"use client";
import React from "react";
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
          // eslint-disable-next-line
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
          color: "#6b7280",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#6b7280",
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
        backgroundColor: "rgba(191, 219, 254, 0.5)",
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
          color: "#6b7280",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#6b7280",
        },
        grid: {
          color: "#e4e4e7",
        },
      },
    },
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 p-2 sm:p-4 md:p-6">
      <div className="rounded-lg border bg-card p-2 md:p-4 ">
        <h3 className="font-semibold mb-4">Revenue Trend</h3>
        <div style={{ height: 350 }} className="w-full ">
          <Bar data={revenueChartData} options={revenueChartOptions} />
        </div>
      </div>

      <div className="rounded-lg border bg-card p-2 md:p-4">
        <h3 className="font-semibold mb-4">Site Visitors</h3>
        <div style={{ height: 350 }} className="w-full">
          <Line data={visitorsChartData} options={visitorsChartOptions} />
        </div>
      </div>
    </div>
  );
}
