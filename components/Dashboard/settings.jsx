"use client";
import React, { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import Image from "next/image";
import UploadButtonPage from "@/components/uploadButton";
export default function Settings({ currentUser }) {
  const [valid, setValid] = useState(true);
  function handlePhoneInput(value) {
    if (value) {
      setValid(isValidPhoneNumber(value));
    } else return false;
  }
  return (
    <div className="w-full lg:mt-10 lg:w-2/3 lg:mx-auto p-5">
      {/* parent div for the flexbox */}
      <div className="md:flex gap-5 lg:gap-10 border p-2 ">
        <div className="py-4 sm:flex flex-col items-center w-full md:w-fit justify-center">
          <Image
            src={currentUser.picture}
            width={80}
            height={80}
            className="h-16 w-16 md:h-20 md:w-20 rounded-full ring-2 ring-blue-800 ring-offset-base-100 ring-offset-2 md:mx-auto"></Image>
          <p className="text-base mt-5">Update Profile Picture</p>
          <UploadButtonPage />
        </div>
        <form className="flex-1">
          <h1 className="text-xl md:text-2xl font-bold md:text-center">
            Hello {currentUser.name}!
          </h1>
          <div className="py-2">
            <label htmlFor="name" className="flex justify-between items-center">
              <p className="text-gray-600">Name</p>
              <button className="text-primary hover:font-bold" type="button">
                Edit
              </button>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={currentUser.name}
              disabled
              className="w-full py-1 border-b-2 bg-base-100"
            />
          </div>
          <div className="py-2">
            <label htmlFor="email" className="">
              <p className="text-gray-600">Email</p>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={currentUser.email}
              disabled
              className="w-full py-1 border-b-2 bg-base-100"
            />
          </div>
          {currentUser.phone_number ? (
            <div className="py-2">
              <label
                htmlFor="phone"
                className="flex justify-between items-center">
                <p className="text-gray-600">Phone</p>
                <button className="text-primary hover:font-bold" type="button">
                  Edit
                </button>
              </label>
              <input
                type="number"
                name="phone"
                id="phone"
                value={currentUser.phone_number}
                disabled
                className="w-full py-1 border-b-2 bg-base-100"
              />
            </div>
          ) : (
            <div className="py-2">
              <label
                htmlFor="phone"
                className="flex justify-between items-center">
                <p className="text-gray-600">Phone</p>
                <button className="text-primary hover:font-bold" type="button">
                  Edit
                </button>
              </label>
              <PhoneInput
                value={currentUser.phoneNumber ?? ""}
                onChange={(value) => handlePhoneInput(value)}
                placeholder="What is your phone number?"
                disabled
                defaultCountry="KE"
                className={`bg-base-100 w-full py-1 border-b-2 focus:outline-none ${
                  !valid ? "input-error" : ""
                }`}
              />
              {!valid && (
                <p className="text-error-content my-2">
                  Please enter a valid phone number
                </p>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
