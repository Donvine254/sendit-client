"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { sendEmail } from "@/lib/mailer";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(false);

  const [parcelData, setParcelData] = useState({
    user_id: null,
    weight: null,
    description: "",
    value: "",
    pickup_address: "",
    pickup_notes: "",
    delivery_address: "",
    delivery_notes: "",
    receiver_name: "",
    receiver_contact: "",
    contact_person: "",
  });

  useEffect(() => {
    fetch("https://sendit.up.railway.app/orders")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders: ", error);
      });
  }, []);

  const handleDeleteOrder = (orderId) => {
    fetch(`https://sendit.up.railway.app/orders/${orderId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedOrders = orders.filter((order) => order.id !== orderId);
        setOrders(updatedOrders);
        setSelectedOrder(null);
        setEditOrder(false);
      })
      .catch((error) => {
        console.error("Error deleting order: ", error);
      });
  };

  const handleOrderClick = (orderId) => {
    const selectedOrder = orders.filter((order) => order.id === orderId)[0];
    setSelectedOrder(selectedOrder);
    setParcelData(selectedOrder.parcel);
  };

  const handleEditOrder = () => {
    setEditOrder(true);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);

    setParcelData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`https://sendit.up.railway.app/parcels/${parcelData.id}`, {
      method: "PATCH",
      body: JSON.stringify(parcelData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(() => {
        const emailData = {
          subject: "Parcel Updated",
          message: `Hello there, this is just to let you know that your parcel details have been updated.${JSON.stringify(
            parcelData
          )}`,
          email: selectedOrder.sender.email,
        };
        sendEmail(emailData);
        window.location.reload(false);
      })
      .catch((error) => {
        console.error("Error updating order: ", error);
      });
  };

  console.log(selectedOrder);
  return (
    <div className="card w-full max-w-screen-2xl md:w-auto sm:w-2/3 mx-auto  bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Order List</h2>
        <div className="w-full   mt-6">
          {loading ? (
            <div className="md:flex items-center justify-center">
              <progress className="progress progress-primary w-full md:w-1/2"></progress>
            </div>
          ) : (
            <div className="w-full overflow-x-auto ">
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
                    <th className="bg-blue-100 border text-left px-8 py-4">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      className="hover cursor-pointer"
                      onClick={() => handleOrderClick(order.id)}
                      key={order.id}>
                      <td className="border px-2 sm:px-4 py-2">
                        {order.price}
                      </td>
                      <td className="border px-2 sm:px-4 py-2">
                        {order.duration}
                      </td>
                      <td className="border px-2 sm:px-4 py-2 underline decoration-blue-600 underline-offset-2 hover:text-primary">
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
                            ? "bg-green-500 text-green-900"
                            : order.status == "on-transit"
                            ? "bg-blue-600 text-blue-900"
                            : order.status == "pending"
                            ? "bg-orange-500 text-orange-900"
                            : ""
                        } border px-2 sm:px-4 py-2 text-white capitalize`}>
                        {order.status}
                      </td>
                      <td className="border px-2 sm:px-4 py-2">
                        {order.parcel.receiver_name}
                      </td>
                      <td className="border px-2 sm:px-4 py-2">
                        {order.parcel.receiver_contact}
                      </td>
                      <td className="border px-2 sm:px-4 py-2">
                        {moment(order.created_at_date).format("MMMM Do YYYY")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedOrder && (
            <dialog id="order_modal" className="modal modal-open mx-auto">
              <div className="modal-box max-w-5xl w-full">
                <h3 className="font-bold text-lg my-8">Order Parcel Details</h3>
                <form onSubmit={handleUpdate}>
                  <div className="mb-6">
                    <label
                      htmlFor="Parcel Description"
                      className="block mb-2 text-sm text-gray-600">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      placeholder="Enter parcel description"
                      required
                      className="input input-bordered input-secondary w-full max-w-xs0"
                      disabled={editOrder ? false : true}
                      value={parcelData.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="Parcel Weight"
                      className="block mb-2 text-sm text-gray-600">
                      Weight
                    </label>
                    <input
                      type="text"
                      name="weight"
                      id="weight"
                      placeholder="Enter parcel Weight"
                      required
                      className="input input-bordered input-secondary w-full max-w-xs0"
                      disabled={editOrder ? false : true}
                      value={parcelData.weight}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="Parcel Pickup Address"
                      className="block mb-2 text-sm text-gray-600">
                      Pickup Address
                    </label>
                    <input
                      type="text"
                      name="pickup_address"
                      id="pickup_address"
                      placeholder="Enter parcel pickup address"
                      required
                      className="input input-bordered input-secondary w-full max-w-xs0"
                      disabled={editOrder ? false : true}
                      value={parcelData.pickup_address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="Parcel Pickup Notes"
                      className="block mb-2 text-sm text-gray-600">
                      Pickup Notes
                    </label>
                    <input
                      type="text"
                      name="pickup_notes"
                      id="pickup_notes"
                      placeholder="Enter parcel pickup notes"
                      required
                      className="input input-bordered input-secondary w-full max-w-xs0"
                      disabled={editOrder ? false : true}
                      value={parcelData.pickup_notes}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="Parcel Delivery Address"
                      className="block mb-2 text-sm text-gray-600">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      name="delivery_address"
                      id="delivery_address"
                      placeholder="Enter parcel delivery address"
                      required
                      className="input input-bordered input-secondary w-full max-w-xs0"
                      disabled={editOrder ? false : true}
                      value={parcelData.delivery_address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="Parcel Recipient Name"
                      className="block mb-2 text-sm text-gray-600">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      name="receiver_name"
                      id="receiver_name"
                      placeholder="Enter parcel recipient name"
                      required
                      className="input input-bordered input-secondary w-full max-w-xs0"
                      disabled={editOrder ? false : true}
                      value={parcelData.receiver_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="Parcel Recipient Contact"
                      className="block mb-2 text-sm text-gray-600">
                      Recipient Contact
                    </label>
                    <input
                      type="text"
                      name="receiver_contact"
                      id="receiver_contact"
                      placeholder="Enter parcel Recipient Contact"
                      required
                      className="input input-bordered input-secondary w-full max-w-xs0"
                      disabled={editOrder ? false : true}
                      value={parcelData.receiver_contact}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="Parcel Contact Person"
                      className="block mb-2 text-sm text-gray-600">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      name="contact_person"
                      id="contact_person"
                      placeholder="Enter parcel Contact Person"
                      required
                      className="input input-bordered input-secondary w-full max-w-xs0"
                      disabled={editOrder ? false : true}
                      value={parcelData.contact_person}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    onClick={() =>
                      setSelectedOrder(null) && setEditOrder(false)
                    }
                    className="btn btn-sm btn-circle btn-ghost fixed  right-0 top-0">
                    ✕
                  </button>
                </form>

                {selectedOrder.status !== "delivered" && (
                  <div className="flex flex-row">
                    <button
                      onClick={(e) =>
                        editOrder
                          ? handleUpdate(e)
                          : handleEditOrder(selectedOrder.id)
                      }
                      className={`${
                        editOrder
                          ? "bg-green-500 hover:bg-green-400"
                          : "bg-blue-500 hover:bg-blue-400"
                      } btn-sm text-white font-bold py-2 px-4 rounded mr-2`}>
                      {editOrder ? "Save" : "Edit Parcel Details"}
                    </button>
                    {editOrder && (
                      <button
                        onClick={() => setEditOrder(false)}
                        className="bg-orange-500 hover:bg-orange-400 btn-sm text-white font-bold py-2 px-4 rounded mr-2">
                        Cancel Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteOrder(selectedOrder.id)}
                      className="bg-red-500 hover:bg-red-400 btn-sm text-white font-bold py-2 px-4 rounded mr-2">
                      Delete Order
                    </button>
                  </div>
                )}
              </div>
            </dialog>
          )}
        </div>
      </div>
    </div>
  );
}
