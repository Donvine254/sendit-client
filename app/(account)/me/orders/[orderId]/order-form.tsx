"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileSpreadsheet, Printer } from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import React from "react";
import { toast } from "sonner";

type Props = {
  order: any | [];
};
declare const inkHtml: any;
export default function Orderform({ order }: Props) {
  const handlePrint = async () => {
    const print = inkHtml;
    print(document.getElementById("print-div"));
  };
  const handleExportExcel = () => {
    const csvContent = `Order ID,Description,Status,Price,Weight,Customer Name,Pickup Address,Pickup Phone,Recipient Name,Delivery Address,Delivery Phone,Created At
  ${order.id},"${order.description}",${order.status.toLowerCase()},"KSH${
      order.price
    }",${order.weight},"${order.pickupAddress.fullName}","${
      order.pickupAddress.address
    }, ${order.pickupAddress.district}, ${
      order.pickupAddress.region
    }","254${order.pickupAddress.phone.toString()}","${
      order.deliveryAddress.fullName
    }","${order.deliveryAddress.address}, ${order.deliveryAddress.district}, ${
      order.deliveryAddress.region
    }","254${order.deliveryAddress.phone.toString()}",${new Date(
      order.createdAt
    ).toLocaleDateString()}`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `order-${order.id}.csv`;
    link.click();
  };

  return (
    <div className="bg-white max-w-5xl mx-auto shadow-lg rounded-lg">
      <Script src="https://unpkg.com/ink-html/dist/index.js"></Script>
      <section className="p-8 space-y-6" id="print-div">
        {/* Personal Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            1. Customer Information
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
                className="border-2 "
                readOnly
                aria-disabled
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
                className="border-2 "
                readOnly
                aria-disabled
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
                <div className="flex h-10 w-fit rounded-l-md border-2 border-r-0 border-input bg-background px-2">
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
                  defaultValue={`+254${order.pickupAddress?.phone}`}
                  className="border-2 rounded-l-none border-l-1 "
                  aria-disabled
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
                aria-disabled
                className="border-2"
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
                aria-disabled
                className="border-2"
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
                aria-disabled
                className="border-2"
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
                className="border-2"
                aria-disabled
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
                aria-disabled
                readOnly
                className="border-2"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="phone"
                className="block font-semibold  text-muted-foreground">
                Phone Number
              </label>
              <div className="flex items-center group">
                <div className="flex h-10 w-fit rounded-l-md border-2 border-r-0 border-input bg-background px-2">
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
                  defaultValue={`+254${order.deliveryAddress?.phone}`}
                  className="border-2 rounded-l-none border-l-1 "
                  aria-disabled
                />
              </div>
            </div>
          </div>
        </div>
        {/* Delivery Address */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            4. Shipping Address
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
                aria-disabled
                className="border-2 disabled:text-gray-700"
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
                aria-disabled
                className="border-2 disabled:text-gray-700"
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
                aria-disabled
                className="border-2 disabled:text-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            5. Parcel Information
          </h2>
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block font-semibold text-muted-foreground">
              Parcel Description
            </label>
            <Input
              type="text"
              defaultValue={order.description}
              readOnly
              aria-disabled
              aria-describedby="description"
              className=" border-2 disabled:text-gray-700"
            />
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
              aria-disabled
              defaultValue={order.weight}
              className=" border-2 disabled:text-gray-700"
              readOnly
            />
          </div>
          <div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "KSH",
                  }).format(order.price - order.price * 0.16)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">VAT</span>
                <span>
                  {" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "KSH",
                  }).format(order.price * 0.16)}
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3 font-semibold">
                <span>Total</span>
                <span>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "KSH",
                  }).format(order.price)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex justify-end items-center gap-4 bg-blue-50 p-8 rounded-b-lg">
        <Button
          variant="outline"
          title="print"
          disabled={order.status === "CANCELLED"}
          className="justify-start hover:bg-blue-600 hover:text-white disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
          onClick={handlePrint}>
          {" "}
          <Printer className="h-4 w-4" /> Print
        </Button>
        <Button
          variant="secondary"
          title="export to excel"
          disabled={order.status === "CANCELLED"}
          onClick={() => {
            toast.success("Processing file...", { position: "top-center" });
            handleExportExcel();
          }}
          className="bg-gray-800 hover:bg-black text-white justify-start disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed">
          {" "}
          <FileSpreadsheet className="h-4 w-4" /> Export
        </Button>
      </div>
    </div>
  );
}
