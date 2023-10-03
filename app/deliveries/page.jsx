
import React from "react";


import Map from "../../components/Map";

export default function page() {
  return (
    <div className="bg-base-100 m-2 p-5">
      <h1 className="text-center my-2 font-bold text-2xl md:text-4xl">Create a Delivery order</h1>
      <p className="text-base my-2 ">Use our effortless delivery order to place an order,  Sendit will handle the rest</p>
      <section className="w-full h-fit">
        <Map/>
      </section>
    </div>
  );
}
