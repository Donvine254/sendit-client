"use client";
import React, { useState, useEffect } from "react";

export default function Riders() {
  const [riderData, setRiderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [riderOrders, setRiderOrders] = useState(null);
  const [loadingRiderOrders, setLoadingRiderOrders] = useState(false);

  useEffect(() => {
    fetch("https://sendit.up.railway.app/company/riders")
      .then((response) => response.json())
      .then((data) => {
        setRiderData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching customer data: ", error);
        setLoading(false);
      });
  }, []);

  const fetchRiderOrders = (riderId) => {
    setLoadingRiderOrders(true);
    fetch(`https://sendit.up.railway.app/rider/${riderId}/orders`)
      .then((response) => response.json())
      .then((data) => {
        setRiderOrders(data);
        setLoadingRiderOrders(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingRiderOrders(false);
      });
  };

  console.log(riderOrders, loadingRiderOrders);

  return (
    <div className="card w-full max-w-screen-xl md:w-auto sm:w-2/3 mx-auto  bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Riders List</h2>
        <div className="w-full   mt-6">
          {loading ? (
            <div className="p-4">
              <div className="md:flex items-center justify-center">
                <progress className="progress progress-primary w-full md:w-1/2"></progress>
              </div>
            </div>
          ) : (
            <div className="w-full overflow-x-auto ">
              <table class="shadow-lg h-60 w-full bg-white	 border-collapse rounded-md border-neutral-800 ">
                <thead className="">
                  <tr>
                    <th className="bg-blue-100 border text-left px-8 py-4 underline decoration-blue-600 underline-offset-2 hover:text-primary">
                      Name
                    </th>
                    <th className="bg-blue-100 border text-left px-8 py-4">
                      Email
                    </th>
                    <th className="bg-blue-100 border text-left px-8 py-4">
                      Phone Number
                    </th>
                    <th className="bg-blue-100 border text-left px-8 py-4">
                      Date Joined
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {riderData.map((rider) => (
                    <tr
                      className="hover cursor-pointer"
                      onClick={() => fetchRiderOrders(rider.id)}
                      key={rider.id}>
                      <td className="w-1/4 sm:w-1/6 md:w-1/8 lg:w-1/4 border px-4 py-2">
                        {rider.name}
                      </td>
                      <td className="w-1/4 sm:w-1/6 md:w-1/4 lg:w-1/4 border px-4 py-2">
                        {rider.email}
                      </td>
                      <td className="w-1/4 sm:w-1/6 md:w-1/4 lg:w-1/4 border px-4 py-2">
                        {rider.phone_number ? rider.phone_number : "N/A"}
                      </td>
                      <td className="w-1/4 sm:w-1/6 md:w-1/4 lg:w-1/4 border px-4 py-2">
                        {rider.joined}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {riderOrders && (
        <dialog id="order_modal" className="modal modal-open mx-auto">
          <div className="modal-box max-w-7xl w-full">
            <h3 className="font-bold text-lg my-8">Rider&apos;s Orders</h3>
            <button
              onClick={() => setRiderOrders(null)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <table class="shadow-lg bg-white	 border-collapse rounded-md border-neutral-800 ">
              <thead className="">
                <tr>
                  <th className="bg-blue-100 border text-left px-8 py-4">
                    Price
                  </th>
                  <th className="bg-blue-100 border text-left px-8 py-4">
                    Duration
                  </th>
                  <th className="bg-blue-100 border text-left px-8 py-4">
                    Description
                  </th>
                  <th className="bg-blue-100 border text-left px-8 py-4">
                    Weight
                  </th>
                  <th className="bg-blue-100 border text-left px-8 py-4">
                    Pickup Address
                  </th>
                  <th className="bg-blue-100 border text-left px-8 py-4">
                    Delivery Address
                  </th>
                  <th className="bg-blue-100 border text-left px-8 py-4">
                    Status
                  </th>
                  <th className="bg-blue-100 border text-left px-8 py-4">
                    Receiver Name
                  </th>
                  <th className="bg-blue-100 border text-left px-8 py-4">
                    Receiver Contact
                  </th>
                </tr>
              </thead>
              <tbody>
                {riderOrders.map((order) => (
                  <tr className="hover cursor-pointer" key={order.id}>
                    <td className="border px-2 sm:px-4 py-2">{order.price}</td>
                    <td className="border px-2 sm:px-4 py-2">
                      {order.duration}
                    </td>
                    <td className="border px-2 sm:px-4 py-2">
                      {order.parcel.description}
                    </td>
                    <td className="border px-2 sm:px-4 py-2">
                      {order.parcel.weight}
                    </td>
                    <td className="border px-2 sm:px-4 py-2">
                      {order.parcel.pickup_address}
                    </td>
                    <td className="border px-2 sm:px-4 py-2">
                      {order.parcel.delivery_address}
                    </td>
                    <td
                      className={`${
                        order.status == "delivered"
                          ? "bg-green-300 text-green-900"
                          : order.status == "on-transit"
                          ? "bg-blue-300 text-blue-900"
                          : order.status == "pending"
                          ? "bg-orange-300 text-orange-900"
                          : ""
                      } border px-2 sm:px-4 py-2`}>
                      {order.status}
                    </td>
                    <td className="border px-2 sm:px-4 py-2">
                      {order.parcel.receiver_name}
                    </td>
                    <td className="border px-2 sm:px-4 py-2">
                      {order.parcel.receiver_contact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </dialog>
      )}
    </div>
  );
}
