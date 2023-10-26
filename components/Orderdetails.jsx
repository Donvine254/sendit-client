"use client";

import React, { useState } from "react";

import { IoPricetagSharp } from "react-icons/io5";

import { MdOutlineLocationOn } from "react-icons/md";
import { AiOutlineArrowDown } from "react-icons/ai";
import { FaLocationArrow } from "react-icons/fa6";
import { sendEmail } from "@/lib/mailer";
import toast from "react-hot-toast";
import { editOrder } from "@/lib";
export default function OrderDetails({
  order,
  role,
  handleClick,
  currentUser,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [parcelData, setParcelData] = useState(null);
  function handleSubmit(e) {
    e.preventDefault();
  }

  const handleEditChange = (e) => {
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
        toast.success("order updated successfully");
        const emailData = {
          subject: "Your Parcel Details Have Changed!",
          message:
            "Hello there, this is just to let you know that your parcel details have been updated. Kindly login to see the changes.",
        };
        sendEmail(emailData);
        window.location.reload(false);
      })
      .catch((error) => {
        toast.error("Error updating order: ", error);
      });
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <div className="border p-2 shadow-lg my-2">
        <h1 className="py-2 font-semibold text-xl text-primary">
          Parcel Details
        </h1>
        <p>
          <span className="font-bold">Order ID: </span>
          000{order?.id}
        </p>
        <div className="flex items-center mb-2 gap-2">
          <span className="font-bold flex items-center gap-2">
            <span className="text-xl mr-2">⚖️</span>
            Weight in Kgs:{" "}
          </span>
          <input value={order?.parcel?.weight} disabled name="weight" />
        </div>
        <div className="flex items-center mb-2 gap-2">
          <span className="font-bold flex items-center gap-2">
            <span className="text-xl mr-2">🛣️</span>
            Distance:{" "}
          </span>
          <p> {order?.distance}</p>
        </div>
        <div className="flex items-center mb-2 gap-2">
          <span className="font-bold flex items-center gap-2">
            <span className="text-xl mr-2">⏳</span>
            Duration:{" "}
          </span>
          <p> {order?.duration}</p>
        </div>
        <div className="flex items-center mb-2 gap-2">
          <span className="font-bold flex items-center gap-2">
            <IoPricetagSharp className="text-xl text-primary mr-2" />
            Price:{" "}
          </span>
          <p> KES {order?.price}</p>
        </div>
        <div className="badge badge-primary py-2 text-xl">{order?.status}</div>
      </div>
      <hr />
      {/* route details card */}
      <div className="border p-2 shadow-lg my-2">
        <h1 className="py-2 font-semibold text-xl text-primary">
          Route Details
        </h1>
        <div className="flex items-center mb-2 gap-2">
          <span className="font-bold flex items-center gap-2">
            {" "}
            <MdOutlineLocationOn className="text-xl mr-2" />
            Pick-up location:{" "}
          </span>
          <p>{order?.parcel?.pickup_address}</p>
        </div>
        <div className="flex items-center mb-2">
          <AiOutlineArrowDown className="text-xl mr-2" />
        </div>
        <div className="flex items-center mb-2 gap-2">
          <span className="font-bold flex items-center gap-2">
            {" "}
            <FaLocationArrow className="text-xl mr-2" />
            Delivery location:{" "}
          </span>
          <p>{order?.parcel?.delivery_address}</p>
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="delivery_notes" className="block font-bold ">
            Pickup Notes:
          </label>
          <input
            className="bg-base-100"
            name="pickup_notes"
            value={order?.parcel?.pickup_notes}
            disabled
          />
        </div>
      </div>
      <hr />
      {/* receiver details card */}
      <div className="border p-2 shadow-lg my-2">
        <h1 className="py-2 font-semibold text-xl text-primary">
          Receiver Details
        </h1>
        <p className="capitalize py-2">
          <span className="font-bold">Name: </span>{" "}
          {order?.parcel?.receiver_name}
        </p>
        <p className="py-2">
          <span className="font-bold">Contact: </span>
          <input
            value={order?.parcel?.receiver_contact}
            disabled
            name="receiver contact"
          />
        </p>
        <div className="flex items-center gap-4">
          <label htmlFor="delivery_notes" className="block font-bold ">
            Delivery Notes:
          </label>
          <input
            className="bg-base-100"
            name="delivery_notes"
            value={order?.parcel?.delivery_notes}
            disabled
          />
        </div>

        {order.rider_id && (
          <div>
            <h1 className="mb-5 font-semibold">Rider Details</h1>
            <p className="font-normal mb-7 capitalize">
              {order?.rider?.name ?? "No rider"}
            </p>
            <p className="font-normal mb-7">
              {order?.rider?.phone_number ?? "No rider"}
            </p>
          </div>
        )}
      </div>
      {role === "user" && order.status === "pending" && (
        <div className="flex items-center justify-center gap-5 my-2 bg-base-200 border py-4">
          <button
            className="btn btn-neutral"
            onClick={() => {
              setParcelData(order.parcel), setIsEditing(true);
            }}>
            Edit
          </button>

          <button className="btn btn-warning">Cancel</button>
        </div>
      )}
      {isEditing && parcelData && (
        <dialog id="order_modal" className="modal modal-open mx-auto">
          <div className="modal-box max-w-5xl w-full">
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-sm btn-circle btn-ghost fixed  right-0 top-0">
              ✕
            </button>
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
                  className="input input-bordered input-secondary w-full "
                  value={parcelData.description}
                  onChange={handleEditChange}
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
                  disabled={isEditing ? false : true}
                  value={parcelData.weight}
                  onChange={handleEditChange}
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
                  disabled
                  value={parcelData.pickup_address}
                  onChange={handleEditChange}
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
                  disabled={isEditing ? false : true}
                  value={parcelData.pickup_notes}
                  onChange={handleEditChange}
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
                  disabled
                  value={parcelData.delivery_address}
                  onChange={handleEditChange}
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
                  disabled={isEditing ? false : true}
                  value={parcelData.receiver_name}
                  onChange={handleEditChange}
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
                  disabled={isEditing ? false : true}
                  value={parcelData.receiver_contact}
                  onChange={handleEditChange}
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
                  disabled
                  value={parcelData.contact_person}
                  onChange={handleEditChange}
                />
              </div>
            </form>
            {order.status !== "delivered" && (
              <div className="flex items-center justify-center py-2 gap-5 ">
                <button
                  onClick={(e) => handleUpdate(e)}
                  className="btn bg-green-500 btn-sm text-white hover:btn-primary">
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-error btn-sm text-white">
                  Cancel
                </button>
              </div>
            )}
          </div>
        </dialog>
      )}
      {role === "rider" && order?.status === "pending" && (
        <button
          className="btn btn-primary"
          onClick={() => editOrder(order, currentUser, assign)}>
          Deliver Order
        </button>
      )}

      {role === "rider" && order?.status === "on-transit" && (
        <button
          className="btn btn-primary"
          onClick={() => editOrder(order, currentUser, delivery)}>
          Mark Delivered
        </button>
      )}
      <div className="divider mt-7 mb-5"></div>
      <div className="flex items-center justify-center">
        <button className="btn btn-ghost" onClick={handleClick}>
          Back
        </button>
      </div>
    </form>
  );
}
