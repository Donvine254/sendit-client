"use client";
import React, { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import Image from "next/image";
import UploadButtonPage from "@/components/uploadButton";
import { updateUserDetails } from "@/lib";
import { useAppContext } from "@/context/context";
export default function Settings({ currentUser }) {
  const { phone_number, setPhone_number, setCurrentUser } = useAppContext();
  const [valid, setValid] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  function handlePhoneInput(value) {
    if (value) {
      setPhone_number(value);
      setValid(isValidPhoneNumber(value));
    } else return false;
  }
  return (
    <div className="w-full lg:mt-10 lg:w-2/3 lg:mx-auto p-2">
      {/* parent div for the flexbox */}
      <div className="md:flex gap-5 lg:gap-10 p-2 ">
        <div className="py-4 sm:flex xsm:flex flex-col items-center w-full md:w-fit justify-center">
          <Image
            src={currentUser.picture}
            width={80}
            height={80}
            alt={currentUser.name}
            className="h-20 w-20 md:h-24 md:w-24 rounded-full ring-2 ring-blue-800 ring-offset-base-100 ring-offset-2 md:mx-auto"></Image>
          <p className="text-base mt-5">Update Profile Picture</p>
          <UploadButtonPage setCurrentUser={setCurrentUser}/>
        </div>
        <form className="flex-1">
          <h1 className="text-xl md:text-2xl font-bold md:text-center">
            Hello {currentUser.name}!
          </h1>
          <div className="py-2">
            <label htmlFor="name" className="">
              <p className="text-gray-600">Name</p>
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
          <div className="py-2">
            <label
              htmlFor="phone"
              className="flex justify-between items-center">
              <p className="text-gray-600">Phone</p>
              <button
                className="text-primary hover:font-bold"
                onClick={() => setIsEditing(!isEditing)}
                type="button">
                Edit
              </button>
            </label>
            {currentUser.phone_number ? (
              <input
                type="number"
                name="phone"
                id="phone"
                value={currentUser.phone_number}
                disabled
                className="w-full py-1 border-b-2 bg-base-100"
              />
            ) : (
              <>
                <PhoneInput
                  value={phone_number}
                  onChange={(value) => handlePhoneInput(value)}
                  placeholder="What is your phone number?"
                  disabled={!isEditing}
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
              </>
            )}
          </div>
          <div className="flex items-center justify-center my-2">
            <button
              type="submit"
              className={`btn hero-btn ${!isEditing ? "hidden" : ""}`}
              onClick={() =>
                updateUserDetails(currentUser, phone_number, setCurrentUser)
              }>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
