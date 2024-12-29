import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

type Props = {
  order: any | [];
};

export default function Orderform({ order }: Props) {
  return (
    <form className="bg-white max-w-5xl mx-auto shadow-lg rounded-lg p-8 space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          1. Sender Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label
              htmlFor="firstName"
              className="block font-semibold text-muted-foreground">
              Full Names
            </label>
            <Input
              type="text"
              id="firstName"
              readOnly
              defaultValue={order.pickupAddress?.fullName}
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block font-semibold text-muted-foreground">
              Email Address
            </label>
            <Input
              type="email"
              id="email"
              defaultValue={order.pickupAddress?.email}
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="phone"
              className="block font-semibold  text-muted-foreground">
              Phone Number
            </label>
            <div className="flex items-center group">
              <div className="flex h-10 w-fit rounded-l-md border border-input bg-background px-2">
                <Image
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1735344660/logos/flag-kenya_sei3av.svg"
                  width={48}
                  height={48}
                  alt="kenyan flag"
                />
              </div>
              <Input
                type="tel"
                readOnly
                defaultValue={order.pickupAddress?.phone}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pickup Address */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          2. Pickup Address
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label
              htmlFor="pickupRegion"
              className="block font-semibold text-muted-foreground">
              Region
            </label>
            <Input
              type="text"
              defaultValue={order.pickupAddress?.region}
              readOnly
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="pickupDistrict"
              className="block font-semibold text-muted-foreground">
              District
            </label>
            <Input
              type="text"
              defaultValue={order.pickupAddress?.district}
              readOnly
            />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label
              htmlFor="pickupAddress"
              className="block font-semibold text-muted-foreground">
              Detailed Address
            </label>
            <Input
              type="text"
              defaultValue={order.pickupAddress?.address}
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          3. Recipient Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label
              htmlFor="firstName"
              className="block font-semibold text-muted-foreground">
              Full Names
            </label>
            <Input
              type="text"
              id="firstName"
              readOnly
              defaultValue={order.pickupAddress?.fullName}
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block font-semibold text-muted-foreground">
              Email Address
            </label>
            <Input
              type="email"
              id="email"
              defaultValue={order.deliveryAddress?.email}
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="phone"
              className="block font-semibold  text-muted-foreground">
              Phone Number
            </label>
            <div className="flex items-center group">
              <div className="flex h-10 w-fit rounded-l-md border border-input bg-background px-2">
                <Image
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1735344660/logos/flag-kenya_sei3av.svg"
                  width={48}
                  height={48}
                  alt="kenyan flag"
                />
              </div>
              <Input
                type="tel"
                readOnly
                defaultValue={order.deliveryAddress?.phone}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Delivery Address */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          3. Delivery Address
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label
              htmlFor="deliveryRegion"
              className="block font-semibold text-muted-foreground">
              Region
            </label>
            <Input
              type="text"
              defaultValue={order.deliveryAddress?.region}
              readOnly
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="deliveryDistrict"
              className="block font-semibold text-muted-foreground">
              District
            </label>
            <Input
              type="text"
              defaultValue={order.deliveryAddress?.district}
              readOnly
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label
              htmlFor="deliveryAddress"
              className="block font-semibold text-muted-foreground">
              Detailed Address
            </label>
            <Input
              type="text"
              defaultValue={order.deliveryAddress?.address}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          4. Parcel Information
        </h2>
        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block font-semibold text-muted-foreground">
            Parcel Description
          </label>
          <Input type="text" defaultValue={order.description} readOnly />
        </div>
        <div className="my-1">
          <label
            htmlFor="weight"
            className="block font-semibold text-muted-foreground">
            Weight (kg)
          </label>
          <Input
            type="number"
            id="weight"
            name="weight"
            placeholder="Weight in Kgs"
            defaultValue={order.weight}
            readOnly
          />
        </div>
        <p>Price Information</p>
      </div>
    </form>
  );
}
