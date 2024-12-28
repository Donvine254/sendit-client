import React from "react";

import { Package } from "lucide-react";
import { AddressFormData, ParcelFormData, sessionUser } from "@/types";
import { toast } from "sonner";
import { createOrder } from "@/lib/actions";

interface OrderSummaryProps {
  parcelData: ParcelFormData;
  pickupAddress: AddressFormData;
  deliveryAddress: AddressFormData;
  price: number;
  onBack: () => void;
  user: sessionUser;
}

const OrderSummary = ({
  parcelData,
  pickupAddress,
  deliveryAddress,
  price,
  user,
  onBack,
}: OrderSummaryProps) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = {
      userId: user.id,
      description: parcelData.description,
      weight: parcelData.weight,
      pickupAddress: pickupAddress,
      deliveryAddress: deliveryAddress,
      price: price,
    };
    try {
      const res = await createOrder(orderData);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const AddressDisplay = ({
    title,
    data,
  }: {
    title: string;
    data: AddressFormData;
  }) => (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <div className="text-sm text-gray-600">
        <p>{data.fullName}</p>
        <p>{data.phone}</p>
        <p>{data.email}</p>
        <p>
          {data.region}, {data.district}
        </p>
        <p>{data.address}</p>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white md:bg-blue-50 p-6 rounded-lg space-y-6">
        <div className="flex items-center space-x-3">
          <Package className="h-6 w-6 text-blue-600" />
          <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
        </div>
        <div className="border-t border-gray-300 pt-4">
          <dl className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <AddressDisplay title="Pickup Address" data={pickupAddress} />
              <AddressDisplay title="Delivery Address" data={deliveryAddress} />
            </div>

            <div>
              <dt className="font-semibold text-gray-900">Package Details</dt>
              <dd className="mt-2 text-sm text-gray-600">
                <p className="capitalize">
                  Description: {parcelData.description}
                </p>
                <p>Weight: {parcelData.weight} kg</p>
              </dd>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Total Price</dt>
                <dd className="font-medium text-blue-600">
                  KES {price.toLocaleString()}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Back
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default OrderSummary;
