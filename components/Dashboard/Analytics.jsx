"use client";
import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

export default function Analytics() {
  const [revenue, setRevenue] = useState(null);
  const [totalRiders, setTotalRiders] = useState(null);
  const [orderCount, setOrderCount] = useState(null);
  const [onTransitOrdersCount, setOnTransitOrdersCount] = useState(null);
  const [pendingOrderCount, setPendingOrderCount] = useState(null);
  const [deliveredOrderCount, setDeliveredOrderCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://sendit.up.railway.app/company/revenue")
      .then((response) => response.json())
      .then((data) => {
        setRevenue(data);
      })
      .catch((error) => {
        console.error("Error fetching revenue data: ", error);
      });

    fetch("https://sendit.up.railway.app/company/customers")
      .then((response) => response.json())
      .then((data) => {
        const totalCustomers = data.length;
        setTotalCustomers(totalCustomers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching customer data: ", error);
        setLoading(false);
      });

    fetch("https://sendit.up.railway.app/company/riders")
      .then((response) => response.json())
      .then((data) => {
        const totalRiders = data.length;
        setTotalRiders(totalRiders);
      })
      .catch((error) => {
        console.error("Error fetching rider data: ", error);
      });

    fetch("https://sendit.up.railway.app/orders")
      .then((response) => response.json())
      .then((data) => {
        setOrderCount(data.length);
        console.log(data);
        const onTransitOrders = data.filter(
          (order) => order.status === "on-transit"
        );
        setOnTransitOrdersCount(onTransitOrders.length);

        const pendingOrderCount = data.filter(
          (order) => order.status === "pending"
        );
        setPendingOrderCount(pendingOrderCount.length);

        const deliveredOrderCount = data.filter(
          (order) => order.status === "delivered"
        );
        setDeliveredOrderCount(deliveredOrderCount.length);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders: ", error);
      });
  }, []);

  useEffect(() => {
    if (
      orderCount !== null &&
      onTransitOrdersCount !== null &&
      pendingOrderCount !== null &&
      deliveredOrderCount !== null
    ) {
      const ctx = document.getElementById("orderChart");
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Pending", "On-Transit", "Delivered"],
          datasets: [
            {
              data: [
                onTransitOrdersCount,
                pendingOrderCount,
                deliveredOrderCount,
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
  }, [
    orderCount,
    onTransitOrdersCount,
    pendingOrderCount,
    deliveredOrderCount,
  ]);

  return (
    <div className=" p-4">
      <div className="grid grid-cols-2 xsm:grid-cols-1 md:grid-cols-4 gap-2 shadow-lg py-2 my-2">
        <div className="stat sm:w-auto place-items-center bg-slate-200">
          <div className="stat-title">Daily Revenue</div>
          <div className="stat-value text-xl">
            Today&apos;s Revenue: <br /> KES {revenue?.daily_revenue}
          </div>
        </div>

        <div className="stat sm:w-auto place-items-center bg-blue-200">
          <div className="stat-title">Weekly Revenue</div>
          <div className="stat-value text-xl">
            This week&apos;s Revenue: <br /> KES {revenue?.weekly_revenue}
          </div>
        </div>

        <div className="stat sm:w-auto place-items-center bg-yellow-200 ">
          <div className="stat-title">Monthly Revenue</div>
          <div className="stat-value text-xl">
            This month&apos;s Revenue: <br /> KES {revenue?.monthly_revenue}
          </div>
        </div>
        <div className="stat sm:w-auto place-items-center bg-green-100">
          <div className="stat-title text-center">Total Revenue</div>
          <div className="stat-value text-xl">
            Total Revenue: <br /> KES {revenue?.total_revenue}
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
            Total Customers: {totalCustomers}
          </div>
        </div>

        <div className="stat sm:w-auto place-items-center">
          <div className="stat-title">Total Riders</div>
          <div className="stat-value text-xl">Total Riders: {totalRiders}</div>
        </div>
      </>
    </div>
  );
}
