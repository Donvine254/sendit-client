import { AddressFormData } from "@/types";
import React from "react";

const regions = ["Nairobi", "Embu", "Thika", "Nakuru"];

interface AddressFormProps {
  title: string;
  data: AddressFormData;
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={data.fullName}
          onChange={(e) => onChange({ ...data, fullName: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="region"
            className="block text-sm font-medium text-gray-700">
            Region
          </label>
          <select
            id="region"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={data.region}
            onChange={(e) => onChange({ ...data, region: e.target.value })}
            required>
            <option value="">Select a region</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="district"
            className="block text-sm font-medium text-gray-700">
            District
          </label>
          <input
            type="text"
            id="district"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={data.district}
            onChange={(e) => onChange({ ...data, district: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700">
          Detailed Address
        </label>
        <textarea
          id="address"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
