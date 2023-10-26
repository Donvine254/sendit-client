"use client";

import React, { useEffect, useState } from "react";
import { IoPricetagSharp } from "react-icons/io5";
import Orderdetails from "../Orderdetails";

export default function GetOrders({ currentUser }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://sendit.up.railway.app/orders?status=pending`
      );
      if (response.ok) {
        setIsLoading(false);
        const data = await response.json();
        setOrders(data);
      }
      setIsLoading(false);
    })();
  }, []);
  if (selectedOrder) {
    return (
      <Orderdetails
        order={selectedOrder}
        role="rider"
        handleClick={() => setSelectedOrder(null)}
        currentUser={currentUser}
        
      />
    );
  }

  return (
    <div className="w-full lg:mt-5 p-2">
      {isLoading ? (
        <div className="md:flex items-center justify-center">
          <progress className="progress progress-primary w-full md:w-1/2"></progress>
        </div>
      ) : null}
      <div
        className={
          orders.length > 0
            ? "grid grid-cols-1 lg:grid-cols-2 gap-4"
            : "lg:w-1/2 lg:mx-auto"
        }>
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <div
              className="flex flex-col bg-base-200 p-4 rounded-lg border space-y-4 my-3 relative overflow-hidden"
              key={order.id}>
              <div className="text-base font-light leading-loose">
                <h1 className="font-bold">Order ID: 000{order?.id}</h1>
                <h2 className="font-bold">
                  From:{" "}
                  <span className="font-light">
                    {order?.parcel?.pickup_address}
                  </span>
                </h2>
                <h2 className="font-bold">
                  To:{" "}
                  <span className="font-light">
                    {order?.parcel?.delivery_address}
                  </span>
                </h2>
                <p>
                  <span className="font-bold">Description: </span>
                  {order?.parcel?.description}
                </p>
                <p>
                  <span className="font-bold">Weight: </span>
                  {order?.parcel.weight} Kgs
                </p>
                <p>
                  <span className="font-bold">Distance: </span>
                  {order?.distance}, {order.duration} drive.
                </p>
              </div>
              <hr />
              <div className="flex gap-2 xsm:flex-col">
                <p>
                  <span className="font-bold">Customer: </span>
                  {order.sender?.name}
                </p>
                <p className="font-bold">
                  Contact:{" "}
                  <span className=" font-light">
                    {order.sender?.phone_number ?? "No Contact"}{" "}
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
                <button
                  className="btn btn-outline hover:btn-primary flex"
                  onClick={() => setSelectedOrder(order)}>
                  View Details
                </button>
              </div>
              {/* styling for a banner */}
              <div className="absolute right-0 md:right-[-10px] top-[-25px] md:top-[-10px] h-24 w-20 z-5">
                <div
                  className={`absolute transform rotate-45 bg-primary text-center text-white text-[10px] md:text-xl font-semibold py-1 right-[-34px] top-[32px] capitalize w-[150px] md:w-[200px]`}>
                  pending
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className={`flex flex-col items-center justify-center py-2 ${
              isLoading ? "hidden" : ""
            }`}>
            <p className="text-primary font-bold py-2 flex items-center gap-2">
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

              <span>No orders available at the moment, come back later</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
