"use client";
import React, { useState } from "react";
import { useAppContext } from "@/context/context";

import { OrderDetails, PickupDetails, DeliveryDetails } from "./steps";
import { calculatePrice, calculateVAT } from "../lib/calculatePrice";
import { createParcel } from "../lib";
import { useRouter } from 'next/navigation'

export default function DeliveryPage() {
  const { parcelData, setOrderData, setCreatedParcel } = useAppContext();
  const [errors, setErrors]=useState();
  const [currentStep, setCurrentStep] = useState(1); // Initial step
  const router = useRouter();
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleSubmit = () => {
    let price = calculatePrice(parcelData.weight);
    let VAT = calculateVAT(price);

    let totalPrice = price + VAT;

    setOrderData((prev) => ({
      ...prev,
      price: totalPrice,
    }));
    createParcel(parcelData, router, setOrderData, setCreatedParcel, setErrors);
  };
  let disabled = false;

  switch (currentStep) {
    case 1:
      disabled = !parcelData.weight || parcelData.description === "";
      break;
    case 2:
      disabled = parcelData.pickup_address === "";
      break;
    case 3:
      disabled =
        parcelData.delivery_address === "" ||
        parcelData.receiver_name === "" ||
        parcelData.receiver_contact === "";
      break;
    default:
      disabled = false; // Enable the "Next" button for other cases
      break;
  }
  return (
    <section className="w-full">
      <ul className="steps w-full">
        <li
          data-content={currentStep >= 1 ? "✓" : "✕"}
          className={
            currentStep >= 1 ? "step step-primary" : "step step-ghost"
          }></li>
        <li
          data-content={currentStep >= 2 ? "✓" : "✕"}
          className={
            currentStep >= 2 ? "step step-primary" : "step step-ghost"
          }></li>
        <li
          data-content={currentStep >= 3 ? "✓" : "✕"}
          className={
            currentStep >= 3 ? "step step-primary" : "step step-ghost"
          }></li>
      </ul>
     
      {/* Conditionally render the step based on the current step */}
      {currentStep === 1 && <OrderDetails />}
      {currentStep === 2 && <PickupDetails />}
      {currentStep === 3 && <DeliveryDetails />}
      {errors && <ErrorList errors={errors}/>}
      <div className="flex items-center justify-center gap-5 lg:gap-10 lg:w-1/2 mx-5 lg:mx-auto mt-2 lg:mt-4">
        {currentStep > 1 && (
          <button
            className="btn btn-outline hover:btn-ghost"
            onClick={handleBack}>
            Back
          </button>
        )}
        {currentStep < 3 ? (
          <button
            className="btn btn-primary"
            onClick={handleNext}
            disabled={disabled}>
            Next
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={disabled}>
            Confirm Order
          </button>
        )}
      </div>
      
    </section>
  );
}
//sub-component for rendering errors:
export const ErrorList = ({ errors }) => {
  return (
    <ul className="mx-5 bg-[#F87272]  p-2 border rounded-lg">
      {Object.keys(errors).map((key) => {
        return errors[key].map((errorMessage, index) => (
          <li key={index} className="flex flex-col items-start  md:flex-row md:items-center gap-2 my-1">
          <span className="capitalize font-bold flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{key}:</span><span > {errorMessage}</span>
          </li>
        ));
      })}
    </ul>
  )
};