"use client";

import React, { useState } from "react";

import { IoPricetagSharp } from "react-icons/io5";

import { MdOutlineLocationOn } from "react-icons/md";
import { AiOutlineArrowDown } from "react-icons/ai";
import { FaLocationArrow } from "react-icons/fa6";

export default function OrderDetails({ order, role, handleClick }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  function handleChange(name, value) {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <div className="border p-2 shadow-lg my-2">
        <h1 className="py-2 font-semibold text-xl text-primary">
          Parcel Details
        </h1>
        <p>
          <span className="font-bold">Order ID: </span>
          {order?.id}
        </p>
        <div className="flex items-center mb-2 gap-2">
          <span className="font-bold flex items-center gap-2">
            <span className="text-xl mr-2">⚖️</span>
            Weight in Kgs:{" "}
          </span>
          <input
            value={order?.parcel?.weight}
            disabled
            name="weight"
            onChange={handleChange}
          />
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
            onChange={handleChange}
            name="receiver contact"
          />
          {order?.parcel?.receiver_contact}
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
      {role === "user" && (
        <div className="flex items-center justify-center gap-5 my-2 bg-base-200 border py-4">
          <button className="btn btn-neutral">Edit</button>
          <button className="btn btn-warning">Cancel</button>
        </div>
      )}
      {role === "rider" && (
        <button className="btn btn-primary">Deliver Order</button>
      )}
      <div className="divider mt-7 mb-5"></div>
      <div className="flex items-center justify-center">
        <button className="btn btn-ghost">Back</button>
      </div>
    </form>
  );
}
