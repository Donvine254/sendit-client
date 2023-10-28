"use client";
import React, { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import Image from "next/image";
import UploadButtonPage from "@/components/uploadButton";
import { patchPhoneNumber } from "@/lib";
import { useAppContext } from "@/context/context";
import toast from "react-hot-toast";
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
          {currentUser?.picture ? (
            <Image
              src={currentUser?.picture}
              width={80}
              height={80}
              priority
              alt={currentUser?.name}
              className="h-20 w-20 md:h-24 md:w-24 rounded-full ring-2 ring-blue-800 ring-offset-base-100 ring-offset-2 md:mx-auto"></Image>
          ) : (
            <>
              <div className="h-20 w-20 md:h-24 md:w-24 flex items-center justify-center accent text-white rounded-full ring-2 ring-red-300 ring-offset-2  md:mx-auto text-4xl ">
                {currentUser?.name?.[0].toUpperCase()}
              </div>
            </>
          )}

          <p className="text-base mt-5">Update Profile Picture</p>
          <UploadButtonPage setCurrentUser={setCurrentUser} id={currentUser?.user_id} />
        </div>
        <form className="flex-1">
          <h1 className="text-xl md:text-2xl font-bold md:text-center">
            Hello {currentUser?.name}!
          </h1>
          <div className="py-2">
            <label htmlFor="name" className="">
              <p className="text-gray-600">Name</p>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={currentUser?.name}
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
              value={currentUser?.email}
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
                <PhoneInput
                  onChange={(value) => handlePhoneInput(value)}
                  value={phone_number?phone_number.toString():phone_number}
                  placeholder={!currentUser?.phone_number? "What is your phone number?":""}
                  disabled={!isEditing}
                  defaultCountry="KE"
                  className={`bg-base-100 w-full py-1 border-b-2 focus:outline-none ${
                    !valid ? "input-error" : ""
                  } ${isEditing ? "input input-bordered input-primary" : ""}`}
                />
                {!valid && (
                  <p className="text-error my-2">
                    *Please enter a valid phone number
                  </p>
                )}
          </div>
          <div className="flex items-center justify-center my-2">
            <button
              type="submit"
              className={`btn hero-btn ${!isEditing ? "hidden" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                toast.success("processing request.....");
                patchPhoneNumber(currentUser, phone_number, setCurrentUser);
                setIsEditing(false);
              }}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
