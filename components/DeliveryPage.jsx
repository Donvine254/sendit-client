"use client";
import React, { useState } from "react";
import { useAppContext } from "@/context/context";
import toast from "react-hot-toast";
import { OrderDetails, PickupDetails, DeliveryDetails } from "./steps";

export default function DeliveryPage() {
const {parcelData}= useAppContext()
  const [currentStep, setCurrentStep] = useState(1); // Initial step

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
    console.log(parcelData)
  };

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
          <button className="btn btn-outline hover:btn-ghost" onClick={handleBack}>
            Back
          </button>
        )}
        {currentStep < 3 ? (
          <button className="btn btn-primary" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleSubmit}>
            Confirm Order
          </button>
        )}
      </div>
    </section>
  );
}
