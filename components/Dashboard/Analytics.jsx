"use client";
import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

export default function Analytics() {
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [dailyRevenue, setDailyRevenue] = useState(null);
  const [weeklyRevenue, setWeeklyRevenue] = useState(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState(null);
  const [totalCustomers, setTotalCustomers] = useState(null);
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
        setTotalRevenue(data.total_revenue);
      })
      .catch((error) => {
        console.error("Error fetching revenue data: ", error);
      });

    fetch("https://sendit.up.railway.app/company/daily_revenue")
      .then((response) => response.json())
      .then((data) => {
        setDailyRevenue(data.daily_revenue);
      })
      .catch((error) => {
        console.error("Error fetching revenue data: ", error);
      });

    fetch("https://sendit.up.railway.app/company/weekly_revenue")
      .then((response) => response.json())
      .then((data) => {
        setWeeklyRevenue(data.weekly_revenue);
      })
      .catch((error) => {
        console.error("Error fetching revenue data: ", error);
      });

    fetch("https://sendit.up.railway.app/company/monthly_revenue")
      .then((response) => response.json())
      .then((data) => {
        setMonthlyRevenue(data.monthly_revenue);
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
          labels: ["On Transit", "Pending", "Delivered"],
          datasets: [
            {
              data: [
                onTransitOrdersCount,
                pendingOrderCount,
                deliveredOrderCount,
              ],
              backgroundColor: ["#e74c3c", "#f1c40f","#3498db"],
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
    <div className="bg-gray-100 p-4">
      <div className="card w-full max-w-screen-xl md:w-auto sm:w-2/3 mx-auto  bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Analytics</h2>
          <div className="stats flex-1 flex-row shadow">
            <div className="stat sm:w-auto place-items-center">
              <div className="stat-title">Daily Revenue</div>
              <div className="stat-value text-xl">
                Today&apos;s Revenue: <br /> KES{dailyRevenue}
              </div>
            </div>

            <div className="stat sm:w-auto place-items-center">
              <div className="stat-title">Weekly Revenue</div>
              <div className="stat-value text-xl">
                This week&apos;s Revenue: <br /> KES{weeklyRevenue}
              </div>
            </div>

            <div className="stat sm:w-auto place-items-center">
              <div className="stat-title">Monthly Revenue</div>
              <div className="stat-value text-xl">
                This month&apos;s Revenue: <br /> KES{monthlyRevenue}
              </div>
            </div>
            <div className="stat sm:w-auto place-items-center">
              <div className="stat-title text-center">Total Revenue</div>
              <div className="stat-value text-xl">
                Total Revenue: <br /> KES{totalRevenue}
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
            <div className="stat-value text-xl">
              Total Riders: {totalRiders}
            </div>
          </div>
        </>
        </div>
      </div>
    </div>
  );
}
