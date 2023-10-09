import React from "react";

import Image from "next/image";
import { AiOutlineCheck } from "react-icons/ai";
import Link from "next/link";
import PriceCalculator from "@/components/priceCalculator";

export default function Page() {
  return (
    <>
      <h1 className="font-bold text-center text-2xl my-2 font-serif">
        What We Offer
      </h1>
      <p className="py-3 px-2 text-base font-serif bg-slate-200 flex items-center mx-2 rounded-lg gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>
          The Rates might vary depending on weight, value of your goods,
          perishability and delivery location.
        </span>
      </p>
      <div className="card-grid-container font-serif">
        <div className="pricing-card bg-base-100">
          <h1 className="font-bold text-2xl text-blue-600 text-center my-2 bg-yellow-400 py-2 rounded-lg">
            Regular
          </h1>
          <h2 className="font-bold text-xl align-start">
            KSH 350/ <span className="text-base ">delivery</span>
          </h2>
          <ul className="text-start py-2 text-base divide-y-2">
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
          <h1 className="font-bold text-2xl text-center my-2 bg-slate-200 py-2 rounded-lg text-black">
            Cargo <span className="badge badge-accent">HOT</span>
          </h1>
          <h2 className="font-bold text-xl align-start">
            KSH 750/ <span className="text-base ">delivery</span>
          </h2>
          <ul className="text-start py-2 text-base divide-y-2 divide-dotted">
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
            <Link href="/deliveries" className="btn btn-neutral my-2">
              Send Parcel
            </Link>
          </div>
        </div>
        <div className="pricing-card bg-base-100">
          <h1 className="font-bold text-2xl text-blue-600 text-center my-2 bg-yellow-400 py-2 rounded-lg">
            Same Day
          </h1>
          <h2 className="font-bold text-xl align-start">
            KSH 500/ <span className="text-base ">delivery</span>
          </h2>
          <ul className="text-start py-2 text-base divide-y-2">
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
            <Link href="/deliveries" className="btn btn-primary my-2">
              Send Parcel
            </Link>
          </div>
        </div>
      </div>
     <div className="font-serif py-3 px-2">
     <h1 className="text-2xl  my-2 text-center font-bold">Not Satisfied? </h1>
     <p className="text-xl">Use our price calculator to estimate the cost of sending your parcel</p>
     <PriceCalculator/>
     </div>
    </>
  );
}
