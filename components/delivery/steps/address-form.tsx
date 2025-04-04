import { Input } from "@/components/ui/input";
import { regions } from "@/constants";
import { AddressFormData } from "@/types";
import Image from "next/image";
import React from "react";

interface AddressFormProps {
  title: string;
  data: AddressFormData;
  // eslint-disable-next-line
  onChange: (data: AddressFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const AddressForm = ({ data, onChange, onNext, onBack }: AddressFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white md:bg-transparent p-4 md:p-0 rounded-md md:rounded-none shadow md:shadow-none">
      <div className="space-y-1">
        <label htmlFor="fullName" className="block font-semibold text-gray-700">
          Full Name
        </label>
        <Input
          type="text"
          id="fullName"
          minLength={5}
          value={data.fullName}
          placeholder="Enter Full Name"
          pattern="^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$"
          title="Full Name must include two names with letters and spaces"
          onChange={(e) => onChange({ ...data, fullName: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="phone" className="block font-semibold  text-gray-700">
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
              minLength={9}
              maxLength={9}
              pattern="^[1-9][0-9]{8}$"
              className="rounded-l-none"
              placeholder="Enter phone number"
              title="Phone number must be 9 digits and cannot start with 0"
              value={data.phone}
              onChange={(e) => onChange({ ...data, phone: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="block font-semibold text-gray-700">
            Email Address (optional)
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            pattern="[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+(\.[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+)*@[a-zA-Z0-9_][\-a-zA-Z0-9_]*(\.[\-a-zA-Z0-9_]+)*\.[cC][oO][mM](:[0-9]{1,5})?"
            title="Provide a valid email address"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="region" className="block font-semibold text-gray-700">
            Region
          </label>
          <select
            id="region"
            name="region"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            value={data.region}
            onChange={(e) => onChange({ ...data, region: e.target.value })}
            required>
            <option value="">Select a region</option>
            {regions.map((region) => (
              <option key={region.county} value={region.county}>
                {region.county}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="district"
            className="block font-semibold text-gray-700">
            District
          </label>
          <select
            id="district"
            name="district"
            disabled={!data.region}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            value={data.district}
            onChange={(e) => onChange({ ...data, district: e.target.value })}
            required>
            <option value="">Select a region</option>
            {regions
              .find((region) => region.county === data.region)
              ?.subcounties.map((subcounty) => (
                <option key={subcounty} value={subcounty}>
                  {subcounty}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="space-y-1">
        <label htmlFor="address" className="block font-semibold text-gray-700">
          Detailed Address
        </label>
        <textarea
          id="address"
          name="address"
          rows={3}
          minLength={5}
          className=" block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border bg-white"
          placeholder="Street name and nearby landmark"
          value={data.address}
          onChange={(e) => onChange({ ...data, address: e.target.value })}
          required
        />
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
          Next Step
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
