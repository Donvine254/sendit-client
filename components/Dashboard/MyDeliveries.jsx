"use client";

import React, { useEffect, useState } from "react";
import { IoPricetagSharp } from "react-icons/io5";
import Link from "next/link";

export default function MyDeliveries({ currentUser }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState("all");

  const handleButtonClick = (status) => {
    setActive(status);
  };
  //function to filter orders
  let filteredOrders = orders;

  if (Array.isArray(orders) && orders.length > 0) {
    filteredOrders = orders.filter((order) => {
      if (active === "all") {
        return true;
      } else {
        return order.status.includes(active);
      }
    });
  }

  useEffect(() => {
    (async () => {
      if (currentUser) {
        const response = await fetch(
          `https://sendit.up.railway.app/rider/${currentUser.id}/orders`
        );
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
        setIsLoading(false);
      }
    })();
  }, [currentUser]);

  return (
    <div className="w-full lg:mt-5 p-2">
      {isLoading ? (
        <div className="md:flex items-center justify-center">
          <progress className="progress progress-primary w-full md:w-1/2"></progress>
        </div>
      ) : (
        <div>
          {isLoading || orders.length < 1 ? null : (
            <div className="flex items-center xsm:gap-1 gap-2">
              <button
                className={`btn bg-gray-200 btn-sm normal-case xsm:text-[10px] ${
                  active === "all" ? "!btn-primary" : ""
                }`}
                onClick={() => handleButtonClick("all")}>
                All
              </button>
              <button
                className={`btn bg-gray-200 btn-sm normal-case xsm:text-[10px] ${
                  active === "on-transit" ? "!btn-primary" : ""
                }`}
                onClick={() => handleButtonClick("on-transit")}>
                On-Transit
              </button>
              <button
                className={`btn bg-gray-200 btn-sm normal-case xsm:text-[10px] ${
                  active === "delivered" ? "!btn-primary" : ""
                }`}
                onClick={() => handleButtonClick("delivered")}>
                Delivered
              </button>
            </div>
          )}

          <div
            className={
              orders.length > 0
                ? "grid grid-cols-1 lg:grid-cols-2 gap-4"
                : "lg:w-1/2 lg:mx-auto"
            }>
            {orders && orders.length > 0 ? (
              filteredOrders.map((order) => (
                <div
                  className="flex flex-col bg-base-200 p-4 rounded-lg border space-y-4 my-3 relative overflow-hidden"
                  key={order.id}>
                  <div className="font-semibold md:flex md:items-center md:gap-10">
                    <span>Order ID: 000{order?.id}</span>
                    <p className="hidden md:block"> {order?.created_at_date}</p>
                  </div>
                  <ul className="steps steps-vertical">
                    <li className="step step-primary " data-content="✓">
                      {order?.parcel?.pickup_address}
                    </li>
                    <li
                      className={`step ${
                        order.status === "delivered" ? "step-primary" : ""
                      }`}
                      data-content={order.status === "delivered" ? "✓" : "✕"}>
                      {order?.parcel?.delivery_address}
                    </li>
                  </ul>
                  <div className="text-base font-light leading-loose">
                    <span className="font-bold">Description: </span>
                    {order?.parcel?.description}
                  </div>
                  <div className="flex gap-2 xsm:flex-col">
                    <p>
                      <span className="font-bold">Customer: </span>
                      {order.customer?.name}
                    </p>
                    <p className="font-bold">
                      Contact:{" "}
                      <span className=" font-light">
                        {order.customer?.phone_number}{" "}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-between gap-5 items-center">
                    <div className="btn btn-outline btn-disabled flex items-center gap-1">
                      <IoPricetagSharp className="text-xl text-primary" />
                      <span className="font-bold text-primary">
                        Ksh {order?.price}
                      </span>
                      {order.status === "delivered" ? (
                        <span className="hidden md:block indicator-item badge text-white bg-green-600">
                          ✓Paid
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <button className="btn btn-outline hover:btn-primary flex">
                      View Details
                    </button>
                  </div>
                  {/* styling for a banner */}
                  <div className="absolute right-0 md:right-[-10px] top-[-25px] md:top-[-10px] h-24 w-20 z-5">
                    <div
                      className={`absolute transform rotate-45 bg-green-600 ${
                        order.status === "delivered" ? "!bg-[#FFC804]" : ""
                      } text-center text-white text-[10px] md:text-xl font-semibold py-1 right-[-34px] top-[32px] capitalize w-[150px] md:w-[200px]`}>
                      {order?.status}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-2">
                <p className="text-error font-bold py-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <span>
                    You have no scheduled deliveries, let&apos;s fix that!
                  </span>
                </p>
                <Link
                  href="/dashboard?active=Get%Orders"
                  className="btn btn-primary">
                  Get Orders
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
