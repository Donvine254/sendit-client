import Link from "next/link";
import React from "react";

export default function HomeComponent() {
  return (
    <div className=" w-full bg-base-100 mt-2 overflow-hidden">
      <div className="flex items-center justify-between mx-5 xsm:mx-1">
        {" "}
        <h1 className="font-bold text-2xl md:text-3xl text-center">
          Special Features That Make You Happy
        </h1>
        <Link
          className="xsm:hidden btn btn-primary flex items-center"
          href="/pricing">
          &#x27F6; See More
        </Link>
      </div>

      <div className="home-card-container mt-1">
        {/* first card */}
        <div className="flex  border-b-4 md:border-r-4 md:border-b-0 border-primary h-[240px]">
          <div className="card-body items-center text-center">
            <h1 className="card-title text-2xl">$</h1>
            <h2 className="font-bold">Transparent Pricing</h2>
            <p>
              Our price calculator lets you determine the price of your order
              before you even make an order. No hidden charges!
            </p>
          </div>
        </div>
        {/* second card */}
        <div className="flex border-b-4 lg:border-r-4 md:border-b-0 border-primary h-[240px]">
          <div className="card-body items-center text-center">
            <h1 className="card-title text-2xl">&#9889;</h1>
            <h2 className="font-bold">Fast Delivery</h2>
            <p>
              <span className="text-primary font-semibold">
                Usitense kama mzigo imefika!{" "}
              </span>{" "}
              We deliver your order before you start worrying about it.
            </p>
          </div>
        </div>
        {/* Third card */}
        <div className="flex  border-b-4 md:border-r-4 md:border-b-0 border-primary h-[240px]">
          <div className="card-body items-center text-center">
            <h1 className="card-title text-2xl">&#128179;</h1>
            <h2 className="font-bold">Pay on Delivery</h2>
            <p>
              We allow you the flexibility of paying only after the recipient
              confirms the delivery has been made.
            </p>
          </div>
        </div>
        {/* fourth card */}
        <div className="flex  border-b-4 lg:border-r-4 md:border-b-0 border-primary h-[240px]">
          <div className="card-body items-center text-center">
            <h1 className="card-title text-2xl">&#128737;</h1>
            <h2 className="font-bold">Cargo Insurance</h2>
            <p>
              All cargo and parcel are insured any loss or damage during
              transit.
            </p>
          </div>
        </div>
      </div>
      <Link
        className="hidden btn btn-primary xsm:flex items-center mx-2 my-2"
        href="/pricing">
        &#x27F6; See More
      </Link>
    </div>
  );
}
