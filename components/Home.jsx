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
      {/* callout card */}
      <div className="flex flex-col md:flex-row items-center gap-10 bg-base-100 my-2 mx-5">
        <div className="flex-1">
          <div className="mockup-phone border-primary group">
            <div className="camera"></div>
            <div className="display">
              <div className="">
                {" "}
                <Image
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697733102/bike_jso1cp.jpg"
                  alt="callout-image"
                  width={3000}
                  height={2000}
                  className="md:my-2 md:mx-1 grayscale group-hover:grayscale-0 transition ease-in-out"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 p-2 mx-2 self-center h-full">
          <h1 className="text-2xl lg:text-3xl font-bold">
            Deliver your parcel without ever leaving your home
          </h1>
          <div className="py-4 text-xl font-light lg:py-6 md:leading-loose">
            <p>
              Join over 1000 customers who trust sendit for timely, reliable and
              efficient delivery services.
            </p>
            <p>Be assured by using sendit services today!</p>
            <div className="flex items-center justify-center">
              <Link href="/deliveries" className="btn btn-primary hero-btn-1">
                Send Parcel Now!
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* How delivery works */}
      <DeliveryProcess />
      {/* We are hiring section */}
      <section className="w-full my-2">
        <div className="bg-primary hover:bg-transparent group  border rounded-lg grid auto-rows-fr md:grid-cols-2 mx-5">
          <div className="p-2 mx-5 flex flex-col items-center my-auto lg:gap-5 text-white h-fit group-hover:text-black">
            <div className="ribbon-container"><h2 className="ribbon my-5 text-center shadow-lg w-full">
              <span className="font-bold text-3xl md:text-4xl my-2 lg:my-0 p-3 ribbon-content">We are hiring!</span>
            </h2></div>
            
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
              className=" h-fit lg:h-full w-full object-contain object-center md:rounded-lg"
            />
          </div>
        </div>
      </section>
    </>
  );
}
