import React from "react";

import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1 className="font-bold text-center text-2xl my-2">What We Offer</h1>
      <div className="m-2 mx-2 md:mx-4 card-grid-container lg:mx-20">
        <div className="card max-w-[400px] w-[350px] xsm:w-full border bg-base-100  shadow-xl mt-4 h-[380px] hover:bg-base-200">
          <div className="card-body items-center text-center">
            <h2 className="font-bold text-2xl text-blue-600">Regular</h2>
            <h1 className="font-bold text-xl align-start">
              KSH 350/ <span className="text-base ">delivery</span>
            </h1>
            <ul className="text-start p-2 text-base">
              <li>✔️ Same Day Delivery within Nairobi</li>
              <li>✔️ Item tracking</li>
              <li>✔️ &lt;30 Minutes Pickup</li>
              <li>✔️ Non-Perishable Goods</li>
              <li>✔️ 0-20kgs</li>
              <li>✔️ Door Delivery</li>
              <li>✔️ Fresh Guarantee</li>
            </ul>
            <div className="card-actions">
              <Link href="/deliveries" className="btn btn-primary">
                Send Parcel
              </Link>
            </div>
          </div>
        </div>
        
        <div className="card max-w-[400px] w-[350px] xsm:w-full border shadow-xl mt-4 h-[380px] bg-primary text-white hover:bg-accent">
          <div className="card-body items-center text-center">
            <h2 className="font-bold text-2xl text-white">
              Cargo <span className="badge badge-accent">HOT</span>
            </h2>
            <h1 className="font-bold text-xl align-start">
              KSH 750/ <span className="text-base ">delivery</span>
            </h1>
            <ul className="text-start p-2 text-base">
              <li>✔️ Item tracking</li>
              <li>✔️ &lt;20 Minutes Pickup</li>
              <li>✔️ Non-Perishable Goods</li>
              <li>✔️ Maximum 100kgs per parcel</li>
              <li>✔️ Promo and Special Discounts</li>
              <li>✔️ Door Delivery</li>
            </ul>
            <div className="card-actions">
              <Link href="/deliveries" className="btn btn-neutral">
                Send Parcel
              </Link>
            </div>
          </div>
        </div>
        <div className="card max-w-[350px] w-[350px] xsm:w-full border bg-base-100  shadow-xl mt-4 h-[380px] hover:bg-base-200">
          <div className="card-body items-center text-center">
            <h2 className="font-bold text-2xl text-blue-600">Same Day</h2>
            <h1 className="font-bold text-xl align-start">
              KSH 500/ <span className="text-base ">delivery</span>
            </h1>
            <ul className="text-start p-2 text-base">
              <li>✔️ Same Day Delivery</li>
              <li>✔️ Item tracking</li>
              <li>✔️ &lt;10 Minutes Pickup</li>
              <li>✔️ Perishable and Non-Perishable Goods</li>
              <li>✔️ 0-30kgs</li>
              <li>✔️ Door Delivery</li>
              <li>✔️ Fresh Guarantee</li>
            </ul>
            <div className="card-actions">
              <Link href="/deliveries" className="btn btn-primary">
                Send Parcel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
