import React from "react";

export default function Orderdetails({ order, role }) {
  return (
    <div>
      {/* pickup info card */}
      <div className="border shadow-lg">
        <h1 className="text-2xl font-bold text-center">Pickup Information</h1>
        <div className="font-semibold md:flex md:items-center md:gap-10">
          <span>Order ID: 000{order?.id}</span>
          <p className="hidden md:block">
            Created on: {order?.created_at_date}
          </p>
          <h2 className="font-bold">
            From:{" "}
            <span className="font-light">{order?.parcel?.pickup_address}</span>
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
          <p>
            <span className="font-bold">Contact Person: </span>
            {order?.sender.name}, {order?.sender.phone_number}
          </p>
          <p>
            <span className="font-bold">Pickup Notes: </span>
            {order?.parcel.pickup_notes}
          </p>
        </div>
      </div>
      {/* delivery details card */}
    </div>
  );
}
