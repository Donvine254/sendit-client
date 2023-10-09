import React from "react";

import Image from "next/image";
import { AiOutlineCheck } from "react-icons/ai";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1 className="font-bold text-center text-2xl my-2">What We Offer</h1>
      <p className="py-2 text-center text-base">The Rates might vary depending on weight, value of your goods, perishability and delivery location.</p>
      <div className="card-grid-container">
        <div className="pricing-card bg-base-100">
          <h1 className="font-bold text-2xl text-blue-600 text-center my-2">
            Regular
          </h1>
          <h2 className="font-bold text-xl align-start">
            KSH 350/ <span className="text-base ">delivery</span>
          </h2>
          <ul className="text-start py-4 text-base">
            <li className="card-list">
              <AiOutlineCheck /> Same Day Delivery within Nairobi
            </li>
            <li className="card-list">
              <AiOutlineCheck /> Item Tracking
            </li>
            <li className="card-list">
              <AiOutlineCheck /> &lt;30 Minutes Pickup
            </li>
            <li className="card-list">
              <AiOutlineCheck /> Non-Perishable Goods
            </li>
            <li className="card-list">
              <AiOutlineCheck /> 0-20kgs
            </li>
            <li className="card-list">
              <AiOutlineCheck />
              Door Delivery
            </li>
            <li className="card-list">
              <AiOutlineCheck />
              Fresh Guarantee
            </li>
          </ul>
          <div className="flex items-center justify-center">
            <Link
              href="/deliveries"
              className="btn btn-primary group-hover:btn-primary my-2">
              Send Parcel
            </Link>
          </div>
        </div>

        <div className="pricing-card bg-primary text-white">
          <h1 className="font-bold text-2xl text-center my-2">
            Cargo <span className="badge badge-accent">HOT</span>
          </h1>
          <h2 className="font-bold text-xl align-start">
            KSH 750/ <span className="text-base ">delivery</span>
          </h2>
          <ul className="text-start py-4 text-base">
            <li className="card-list">
              <AiOutlineCheck />
              Same Day Delivery in Selected Towns
            </li>
            <li className="card-list">
              <AiOutlineCheck />
              Item Tracking
            </li>
            <li className="card-list">
              <AiOutlineCheck />
              &lt;20 Minutes Pickup
            </li>
            <li className="card-list">
              <AiOutlineCheck /> Non-Perishable Goods
            </li>
            <li className="card-list">
              <AiOutlineCheck /> Maximum 100kgs per parcel
            </li>
            <li className="card-list">
              <AiOutlineCheck /> Promo and Special Discounts
            </li>
            <li className="card-list">
              <AiOutlineCheck /> Door Delivery
            </li>
          </ul>

          <div className="flex items-center justify-center">
            <Link
              href="/deliveries"
              className="btn btn-neutral my-2">
              Send Parcel
            </Link>
          </div>
        </div>
        <div className="pricing-card bg-base-100">
          <h1 className="font-bold text-2xl text-blue-600 text-center my-2">
            Same Day
          </h1>
          <h2 className="font-bold text-xl align-start">
            KSH 500/ <span className="text-base ">delivery</span>
          </h2>
          <ul className="text-start py-4 text-base">
            <li className="card-list">
              <AiOutlineCheck /> Same Day Delivery
            </li>
            <li className="card-list">
              <AiOutlineCheck /> Item tracking
            </li>
            <li className="card-list">
              <AiOutlineCheck /> &lt;10 Minutes Pickup
            </li>
            <li className="card-list">
              <AiOutlineCheck />
              Perishable and Non-Perishable Goods
            </li>
            <li className="card-list">
              <AiOutlineCheck /> 0-30kgs
            </li>
            <li className="card-list">
              <AiOutlineCheck />
              Door Delivery
            </li>
            <li className="card-list">
              <AiOutlineCheck />
              Fresh Guarantee
            </li>
          </ul>
          <div className="flex items-center justify-center">
            <Link
              href="/deliveries"
              className="btn btn-primary my-2">
              Send Parcel
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
