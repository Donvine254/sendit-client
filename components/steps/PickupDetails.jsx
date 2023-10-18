"use client";
import React, {useState} from "react";
import Map from "../Map";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import { useAppContext } from "@/context/context";
export default function PickupDetails() {
  const { currentUser } = useAppContext();
 
  const [phone_number, setPhone_number]=useState(null)
  console.log(currentUser)
  return (
    <div className="mx-5">
        <Map/>
      {/* <div>
        <form>
           <PickupLocation setPickupLocation={setPickupLocation}/> 
          {!currentUser?.phone_number ? (
            <div className="mb-2">
              <label htmlFor="phone_number" className="block mb-2 text-sm ">
                What is your phone number?
              </label>
              <PhoneInput value={phone_number} onChange={setPhone_number} defaultCountry="KE" className="input input-bordered input-secondary" />
            </div>
          ) : (
            <></>
          )}
          <div className="mb-2">
            <label htmlFor="pickup_notes" className="block mb-2 text-sm ">
              Pickup Notes
            </label>
            <textarea
              rows="5"
              name="pickup_notes"
              id="pickup_notes"
              placeholder="pickup notes"
              className="w-full textarea textarea-primary"
              required></textarea>
          </div>
        </form>
      </div>
      <div>
        
      </div> */}
    </div>
  );
}
