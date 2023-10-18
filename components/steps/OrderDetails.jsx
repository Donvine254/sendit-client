"use client";
import React from "react";
import { useAppContext } from "@/context/context";
export default function OrderDetails() {
  const { parcelData, setParcelData } = useAppContext();
  function handleChange(e) {
    const { name, value } = e.target;

    setParcelData((prev) => ({
      ...prev,
      [name]: value, 
    }));
  }
  return (
    <form className="mx-5 lg:w-1/2 lg:mx-auto py-2">
      <p className="text-lg font-bold py-2 text-center">Add Parcel Details</p>
      <div className="mb-6">
        <label htmlFor="description" className="block mb-2 text-sm ">
          What are you sending <span className="text-red-600 font-bold">*</span>
        </label>
        <textarea
          rows="3"
          name="description"
          value={parcelData.description}
          onChange={handleChange}
          id="description"
          placeholder="parcel description"
          className="w-full textarea textarea-primary"
          required></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="weight" className="block mb-2 text-sm text-gray-600">
          Weight <span className="text-red-600 font-bold">*</span>
        </label>
        <input
          type="number"
          name="weight"
          id="weight"
          value={!parcelData.weight? "" : parcelData.weight}
          onChange={handleChange}
          max={100}
          placeholder="weight"
          required
          className="input input-bordered input-secondary w-full max-w-xs0"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="value" className="block mb-2 text-sm text-gray-600">
          Value <span className="text-red-600 font-bold">*</span>
        </label>
        <input
          type="number"
          name="value"
          id="number"
          placeholder="value"
          required
          className="input input-bordered input-secondary w-full max-w-xs0"
        />
      </div>
    </form>
  );
}
