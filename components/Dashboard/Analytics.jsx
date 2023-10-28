"use client";
import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetch("https://sendit.up.railway.app/company/analytics")
      .then((response) => response.json())
      .then((data) => {
        setAnalytics(data);
      })
      .catch((error) => {
        console.error("Error fetching analysis data: ", error);
      });
  }, []);

  useEffect(() => {
    if (analytics) {
      const ctx = document.getElementById("orderChart");
      const existingChart = Chart.getChart(ctx);

      if (existingChart) {
        existingChart.destroy();
      }
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Pending", "On-Transit", "Delivered"],
          datasets: [
            {
              data: [
                analytics?.orders_data?.on_transit,
                analytics?.orders_data?.pending,
                analytics?.orders_data?.delivered,
              ],
              backgroundColor: ["#0056f1", "#f1c40f", "#33CF64"],
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            datalabels: {
              anchor: "center",
              align: "left",
              font: {
                weight: "bold",
              },
            },
          },
        },
      });
    }
  }, [analytics]);

  return (
    <div className=" p-4">
      <div className="grid grid-cols-2 xsm:grid-cols-1 md:grid-cols-4 gap-2 shadow-lg py-2 my-2">
        <div className="stat sm:w-auto place-items-center bg-slate-200">
          <div className="stat-title">Daily Revenue</div>
          <div className="stat-value text-xl">
            Today&apos;s Revenue: <br /> KES {analytics?.daily_revenue}
          </div>
        </div>

        <div className="stat sm:w-auto place-items-center bg-blue-200">
          <div className="stat-title">Weekly Revenue</div>
          <div className="stat-value text-xl">
            This week&apos;s Revenue: <br /> KES {analytics?.weekly_revenue}
          </div>
        </div>

        <div className="stat sm:w-auto place-items-center bg-yellow-200 ">
          <div className="stat-title">Monthly Revenue</div>
          <div className="stat-value text-xl">
            This month&apos;s Revenue: <br /> KES {analytics?.monthly_revenue}
          </div>
        </div>
        <div className="stat sm:w-auto place-items-center bg-green-100">
          <div className="stat-title text-center">Total Revenue</div>
          <div className="stat-value text-xl">
            Total Revenue: <br /> KES {analytics?.total_revenue}
          </div>
        </div>
      </div>
      <>
        <h2 className="text-2xl font-semibold text-center">Orders Report</h2>
        <div className="text-center mt-2">
          <canvas id="orderChart" width="200" height="200"></canvas>
        </div>
        <div className="stat sm:w-auto place-items-center">
          <div className="stat-title">Total Customers</div>
          <div className="stat-value text-xl">
            Total Customers: {analytics?.total_customers}
          </div>
        </div>

        <div className="stat sm:w-auto place-items-center">
          <div className="stat-title">Total Riders</div>
          <div className="stat-value text-xl">
            Total Riders: {analytics?.total_riders}
          </div>
        </div>
      </>
    </div>
  );
}
