"use client";
import { ChangeEvent, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { submitAddress } from "@/lib/actions";
import Image from "next/image";
import { regions } from "@/constants";
import { ActionResponse, sessionUser } from "@/types";
const initialState: ActionResponse = {
  success: false,
  message: "",
};
export default function ShippingAddressForm({ user }: { user: sessionUser }) {
  const [state, action, isPending] = useActionState(
    submitAddress,
    initialState
  );
  return (
    <form action={action} className="space-y-6" autoComplete="on">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="font-semibold  text-gray-700">
              Full Name
            </label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              required
              defaultValue={`${user.given_name} ${user.family_name}`}
              autoComplete="name"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block font-semibold  text-gray-700">
              Phone Number
            </label>
            <div className="flex items-center group">
              <div className="flex h-10 w-fit rounded-l-md border border-input bg-background px-2 group-focus-within:ring-2 group-focus-within:ring-offset-background group-focus-within:ring-ring">
                <Image
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1735344660/logos/flag-kenya_sei3av.svg"
                  width={48}
                  height={48}
                  alt="kenyan flag"
                />
              </div>
              <Input
                type="tel"
                id="phone"
                name="phone"
                minLength={9}
                maxLength={9}
                pattern="^[1-9][0-9]{8}$"
                className="rounded-l-none"
                defaultValue={user.phone_number || ""}
                placeholder="Enter phone number"
                title="Phone number must be 9 digits and cannot start with 0"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1 space-y-2">
            <div className="space-y-1">
              <label
                htmlFor="region"
                className="block font-semibold text-gray-700">
                Region
              </label>
              <select
                id="region"
                name="region"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  const district = document.getElementById(
                    "district"
                  ) as HTMLSelectElement;
                  if (e.target.value !== "") {
                    district.removeAttribute("disabled");
                    const subcounties =
                      regions.find((region) => region.county === e.target.value)
                        ?.subcounties || [];
                    district.innerHTML = `<option value="">Select a district</option>`;
                    // Add new options
                    subcounties.forEach((subcounty) => {
                      const option = document.createElement("option");
                      option.value = subcounty;
                      option.textContent = subcounty;
                      district.appendChild(option);
                    });
                  } else {
                    district.setAttribute("disabled", "true");
                    district.value = "";
                  }
                }}
                required>
                <option value="">Select a region</option>
                {regions.map((region) => (
                  <option key={region.county} value={region.county}>
                    {region.county}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <label
              htmlFor="district"
              className="block font-semibold text-gray-700">
              Sub County
            </label>
            <select
              id="district"
              name="district"
              disabled
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              required>
              <option value="">Select your subcounty</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="streetAddress">Street Address</label>
          <textarea
            id="address"
            name="address"
            placeholder="Enter your street address"
            required
            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none  focus:ring-2 focus:ring-black"
            rows={2}
          />
        </div>
      </div>

      {state?.message && (
        <Alert variant={state.success ? "default" : "destructive"}>
          {state.success && <CheckCircle2 className="h-4 w-4" />}
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-end gap-4">
        <Button type="reset" variant="outline" disabled={isPending}>
          Reset
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Address"}
        </Button>
      </div>
    </form>
  );
}
