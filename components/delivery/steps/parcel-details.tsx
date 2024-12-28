import { Input } from "@/components/ui/input";
import { ParcelFormData } from "@/types";
import React from "react";

interface ParcelDetailsProps {
  data: ParcelFormData;
  onChange: (data: ParcelFormData) => void;
  onNext: () => void;
}

const ParcelDetails = ({ data, onChange, onNext }: ParcelDetailsProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white md:bg-transparent p-4 md:p-0 rounded-md md:rounded-none shadow md:shadow-none">
      <div>
        <label
          htmlFor="description"
          className="block  font-semibold text-gray-700">
          Package Description
        </label>
        <textarea
          id="description"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border bg-white"
          placeholder="Describe what you're sending..."
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="weight" className="block  font-semibold text-gray-700">
          Weight (kg)
        </label>
        <Input
          type="number"
          id="weight"
          min="0.1"
          placeholder="Weight in Kgs"
          step="0.1"
          value={data.weight || ""}
          onChange={(e) =>
            onChange({ ...data, weight: parseFloat(e.target.value) })
          }
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Next Step
        </button>
      </div>
    </form>
  );
};

export default ParcelDetails;
