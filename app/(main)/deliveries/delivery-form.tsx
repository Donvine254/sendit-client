"use client";

import React, { useState } from "react";

import StepIndicator from "@/components/delivery/step-indicator";
import { AddressFormData, ParcelFormData, sessionUser } from "@/types";
import ParcelDetails from "@/components/delivery/steps/parcel-details";
import PickupAddress from "@/components/delivery/steps/pickup-address";
import DeliveryAddress from "@/components/delivery/steps/delivery-address";
import OrderSummary from "@/components/delivery/steps/order-summary";
import { shippingAddress } from "@prisma/client";

const STEPS = [
  { title: "Parcel Details", description: "Describe your package" },
  { title: "Pickup Address", description: "Where we collect from" },
  { title: "Delivery Address", description: "Where we deliver to" },
  { title: "Review", description: "Confirm your order" },
];
type Props = {
  user: sessionUser;
  address: shippingAddress;
};
const DeliveryForm = ({ user, address }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [parcelData, setParcelData] = useState<ParcelFormData>({
    description: "",
    weight: 0,
  });
  const [pickupAddress, setPickupAddress] = useState<AddressFormData>({
    fullName:
      address?.fullName ||
      `${user?.given_name}${" "}${user?.family_name}` ||
      "",
    phone: address?.phone || "",
    email: address?.email || user?.email || "",
    region: address?.region || "",
    district: address?.district || "",
    address: address?.address || "",
  });
  const [deliveryAddress, setDeliveryAddress] = useState<AddressFormData>({
    fullName: "",
    phone: "",
    email: "",
    region: "",
    district: "",
    address: "",
  });

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const calculatePrice = () => {
    const basePrice = 500;
    const weightPrice = parcelData.weight * 100;
    const regionFee = pickupAddress.region !== deliveryAddress.region ? 300 : 0;

    return basePrice + weightPrice + regionFee;
  };

  return (
    <div className="min-h-screen  bg-gradient-to-tr from-blue-200 via-gray-100 to-blue-200 py-6 md:py-10">
      <div className="max-w-3xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="md:bg-white md:rounded-lg md:shadow-lg">
          <div className="p-2 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">
              Create Delivery Order
            </h1>
            <StepIndicator steps={STEPS} currentStep={currentStep} />
            <div className="mt-10 md:mt-8">
              {currentStep === 0 && (
                <ParcelDetails
                  data={parcelData}
                  onChange={setParcelData}
                  onNext={handleNext}
                />
              )}
              {currentStep === 1 && (
                <PickupAddress
                  data={pickupAddress}
                  onChange={setPickupAddress}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {currentStep === 2 && (
                <DeliveryAddress
                  data={deliveryAddress}
                  onChange={setDeliveryAddress}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {currentStep === 3 && (
                <OrderSummary
                  parcelData={parcelData}
                  pickupAddress={pickupAddress}
                  deliveryAddress={deliveryAddress}
                  price={calculatePrice()}
                  onBack={handleBack}
                  user={user}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;
