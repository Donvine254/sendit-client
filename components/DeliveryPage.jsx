"use client";
import React, { useState } from "react";
import { useAppContext } from "@/context/context";
import toast from "react-hot-toast";
import { OrderDetails, PickupDetails, DeliveryDetails } from "./steps";
import { calculatePrice, calculateVAT } from "../lib/calculatePrice";
import { createParcel } from "../lib";
import { useRouter } from "next/navigation";

export default function DeliveryPage() {
  const { parcelData, orderData, setOrderData } = useAppContext();
  const [currentStep, setCurrentStep] = useState(1); // Initial step
  const { navigate } = useRouter();
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
    toast.success("processing your request...");
    let price = calculatePrice(parcelData.weight);
    let VAT = calculateVAT(price);

    let totalPrice = price + VAT;

    setOrderData((prev) => ({
      ...prev,
      price: totalPrice,
    }));
    console.log(parcelData, orderData);
    createParcel(parcelData, navigate);)
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
