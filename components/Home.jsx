import Link from "next/link";
import React from "react";

import { FaLongArrowAltRight } from "react-icons/fa";
import Image from "next/image";
import DeliveryProcess from "./DeliveryProcess";
export default function HomeComponent() {
  return (
    <>
      <div className=" w-full bg-base-100 my-2 overflow-hidden border-b-2 font-serif">
        <div className="flex items-center justify-between mx-5 xsm:mx-1">
          {" "}
          <h1 className="font-bold text-2xl md:text-3xl text-center">
            Special Features That Make You Happy
          </h1>
          <Link
            className="xsm:hidden btn hero-btn btn-outline hover:text-white flex items-center"
            href="/pricing">
            <FaLongArrowAltRight /> See More
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
                All cargo and parcel are insured againist any loss or damage
                that might occur during transit.
              </p>
            </div>
          </div>
        </div>
        <Link
          className="hidden btn btn-primary xsm:flex items-center mx-2 my-2"
          href="/pricing">
          <FaLongArrowAltRight /> See More
        </Link>
      </div>
      {/* How delivery works */}
      <DeliveryProcess />
      {/* We are hiring section */}
      <section className="w-full my-2">
        <div className="bg-primary hover:bg-transparent group  border rounded-lg grid auto-rows-fr md:grid-cols-2 mx-5">
          <div className="p-2 mx-5 flex flex-col items-center my-auto lg:gap-5 text-white h-fit group-hover:text-black">
            <div className="ribbon-container mb-2">
              <h2 className="ribbon lg:my-5 text-center shadow-lg w-[90%] sm:w-1/2 md:w-[70%] ">
                <span className="font-bold text-2xl lg:text-4xl my-2 lg:my-0 ribbon-content">
                  We are hiring!
                </span>
              </h2>
            </div>

            <p className="my-2 lg:leading-loose lg:text-2xl">
              Are you looking to supplement your income as a driver? You are
              passionate about innovation and enjoy working with people? Then
              you&apos;ve come to the right place.
            </p>
            <Link
              href="/careers"
              className="btn hero-btn group-hover:bg-[#0056F1] group-hover:text-white font-bold self-center">
              Join Us Today!
            </Link>
          </div>
          <div className="image-wrapper hidden md:block">
            <Image
              src="https://t4.ftcdn.net/jpg/02/92/33/63/360_F_292336327_qSqYCuOGtnaNXXGmgp8lZrZJC9VoIDHz.jpg"
              width={540}
              height={360}
              alt="delivery-person"
              className=" h-fit lg:h-full w-full object-cover object-center md:rounded-lg"
            />
          </div>
        </div>
      </section>
    </>
  );
}
