"use client";
import React from "react";
import "react-phone-number-input/style.css";

import Swal from "sweetalert2";
import Image from "next/image";
export default function page() {
  const environment = process.env.NODE_ENV;
  const redirectUrl =
    environment === "development"
      ? "http://localhost:3000"
      : "https://senditcourrier.vercel.app";
  function handleChange() {
    console.log("something is cooking");
  }
  function handleSubmit() {
    Swal.fire({
      icon: "success",
      title: "Message sent successfully",
      text: "Thank you! Your message has been submitted successfully. We will reply to you soon!",
      showCloseButton: true,
      confirmButtonColor: "#0056F1",
      timer: 3000,
    });
  }
  return (
    <div className="font-serif">
        <h1 className="my-3 xsm:my-0 text-3xl font-semibold  py-2 text-center">
          Quote Request
        </h1>
        <p className="font-light text-xl text-center py-2">
          Fill out the form below to request a quote. We will get back to you
          within 24hrs of requesting your request. Thank you for your patience
        </p>
         <form
            action="https://api.web3forms.com/submit"
            method="POST"
            id="form"
            onSubmit={handleSubmit}
            className="w-full border p-2 border-primary lg:mx-auto lg:w-1/2">
            <input
              type="hidden"
              name="access_key"
              value="134e33ca-5eb3-4993-bd97-5a12f68fb77a"
            />
            <input type="hidden" name="redirect" value={redirectUrl} />
            <input
              type="hidden"
              name="subject"
              value="You have a new quote request at senditcourrier.com"></input>
            <input type="hidden" name="from_name" value="sendit"></input>
            <input type="checkbox" name="botcheck" id="" className="hidden" />
            <div className="flex items-center gap-5 w-full ">
              <div className="mb-1 w-1/2">
                <label htmlFor="pickup address" className="block mb-2">
                  Send From <span className="text-red-600 font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="pickup address"
                  id="pickup address"
                  placeholder="Pickup Address"
                  required
                  className="input input-bordered input-primary w-full"
                />
              </div>
              <div className="mb-1 w-1/2">
                <label htmlFor="delivery address" className="block mb-2">
                  Deliver To <span className="text-red-600 font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="delivery address"
                  id="delivery address"
                  placeholder="Delivery Address"
                  required
                  className="input input-bordered input-primary w-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-5 w-full">
              <div className="mb-2 w-1/2 ">
                <label
                  htmlFor="weight"
                  className=" block mb-2 text-sm text-gray-600 ">
                  Weight
                </label>

                <input
                  type="number"
                  name="weight"
                  max={100}
                  placeholder="Weight"
                  className="input input-bordered input-secondary w-full"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="value"
                  className="block mb-2 text-sm text-gray-600 ">
                  Value
                </label>

                <input
                  type="number"
                  name="value"
                  placeholder="Parcel Value"
                  className="input input-bordered input-secondary w-full"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block mb-2 text-sm ">
                Description <span className="text-red-600 font-bold">*</span>
              </label>

              <textarea
                rows="5"
                name="description"
                id="description"
                placeholder="Enter other parcel descriptions. e.g the parcel is perishable"
                className="w-full textarea textarea-primary"
                required></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-gray-600">
                Email Address <span className="text-red-600 font-bold">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
                required
                className="input input-bordered input-secondary w-full max-w-xs0"
              />
            </div>
            <div className="">
              <button
                type="submit"
                className="btn btn-outline btn-primary w-full">
                Submit
              </button>
            </div>
          </form>
    </div>
  );
}
