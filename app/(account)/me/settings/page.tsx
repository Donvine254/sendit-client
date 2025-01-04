import { sessionUser } from "@/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { InfoIcon } from "lucide-react";
import { Metadata } from "next";
import React from "react";
import ShippingAddressForm from "./shipping-address";
import { shippingAddress } from "@prisma/client";
import { getShippingAddress } from "@/lib/actions";
import NotificationPreferences from "./notification-preferences";
import DangerZone from "./danger-zone";

export const metadata: Metadata = {
  title: "Sendit Courier- My Account | Settings",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};
export const dynamic = "force-dynamic";

export default async function Settings() {
  const { getUser } = getKindeServerSession();
  const user = (await getUser()) as sessionUser;
  const address = (await getShippingAddress(user.id)) as shippingAddress;
  return (
    <div className="mt-4 p-4 md:p-6 w-full bg-white rounded-md shadow">
      <h1 className="text-lg font-semibold my-2">Basic Information</h1>
      <div
        role="alert"
        className="w-full border p-2 rounded-md bg-blue-100 border-blue-400 text-blue-700">
        <p className="flex items-center justify-start gap-1 xsm:gap-2">
          <InfoIcon className="h-6 w-6 sm:h-4 sm:2-4 text-blue-600" />
          <span className="text-xs md:text-sm text-blue-600">
            If you registered using Facebook or Google, you cannot edit your
            user details.
          </span>
        </p>
      </div>
      <div className="space-y-2 my-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="block font-semibold text-muted-foreground">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              defaultValue={user.given_name}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-base cursor-not-allowed"
              readOnly
              aria-disabled
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="block font-semibold text-muted-foreground">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              defaultValue={user.family_name}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-base cursor-not-allowed"
              readOnly
              aria-disabled
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block font-semibold text-muted-foreground">
              Username
            </label>
            <input
              type="text"
              name="username"
              defaultValue={user.username || "**********"}
              readOnly
              aria-disabled
              className="rounded-md border border-input bg-background px-3 py-2 text-base cursor-not-allowed w-full"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block font-semibold text-muted-foreground">
              Email
            </label>
            <input
              type="text"
              name="email"
              defaultValue={user.email}
              readOnly
              aria-disabled
              className="rounded-md border border-input bg-background px-3 py-2 text-base cursor-not-allowed w-full"
            />
          </div>
        </div>
      </div>
      <hr />
      <h1 className="text-lg font-semibold my-2">Shipping Address</h1>
      <p className="text-gray-600 mb-6">
        Please enter your address details below.
      </p>
      <ShippingAddressForm user={user} address={address} />
      <hr />
      <h1 className="text-lg font-semibold my-2">Notifications</h1>
      <p className="text-gray-600 mb-6">
        Update your notification preferences.
      </p>
      <NotificationPreferences />
      <hr />
      <DangerZone userId={user.id} />
    </div>
  );
}
