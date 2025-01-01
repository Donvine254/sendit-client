import { sessionUser } from "@/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { InfoIcon, User } from "lucide-react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sendit Courier- My Account | Settings",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};
export const dynamic = "force-dynamic";

export default async function Settings() {
  const { getUser } = getKindeServerSession();
  const user = (await getUser()) as sessionUser;
  return (
    <div className="mt-4 p-2 md:p-6 w-full bg-white rounded-md shadow">
      <h1 className="text-xl font-semibold text-gray-900 inline-flex gap-1">
        <User className="h-5 w-5 mb-2" />
        Personal Information
      </h1>
      <p className="text-muted-foreground text-sm flex items-center gap-1">
        <InfoIcon className="h-3 w-3" />
        <span>
          If you registered using Facebook or Google, you cannot edit your user
          details.
        </span>
      </p>
      <div className="space-y-2 my-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              defaultValue={user.given_name}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-base"
              readOnly
              aria-disabled
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="lastName"
              className="block font-semibold text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              defaultValue={user.family_name}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-base"
              readOnly
              aria-disabled
            />
          </div>
        </div>
        <div className="space-y-1">
          <label htmlFor="email" className="block font-semibold text-gray-700">
            Email
          </label>
          <input
            type="text"
            name="email"
            defaultValue={user.email}
            readOnly
            aria-disabled
            className="rounded-md border border-input bg-background px-3 py-2 text-base"
          />
        </div>
      </div>
    </div>
  );
}
