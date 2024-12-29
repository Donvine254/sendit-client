"use client";
import React, { useState } from "react";
import { Upload } from "lucide-react";
import { QuoteFormData } from "@/types";
import { regions } from "@/constants";
import { Input } from "@/components/ui/input";
import Image from "next/image";
export default function QuoteForm() {
  const [formData, setFormData] = useState<QuoteFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    pickupRegion: "",
    pickupDistrict: "",
    pickupAddress: "",
    deliveryRegion: "",
    deliveryDistrict: "",
    deliveryAddress: "",
    description: "",
    weight: 0,
    parcelImage: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        parcelImage: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form data:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white max-w-5xl mx-auto shadow-lg rounded-lg p-8 space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          1. Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label
              htmlFor="firstName"
              className="block font-semibold text-muted-foreground">
              First Name
            </label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter First Name"
              required
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="lastName"
              className="block font-semibold text-muted-foreground">
              Last Name
            </label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter Last Name"
              required
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block font-semibold text-muted-foreground">
              Email Address (optional)
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="phone"
              className="block font-semibold  text-muted-foreground">
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
                className="rounded-l-none"
                placeholder="Enter phone number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
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
            <select
              id="pickupRegion"
              name="pickupRegion"
              value={formData.pickupRegion}
              onChange={handleInputChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              required>
              <option value="">Select Region</option>
              {regions.map((region) => (
                <option key={region.county} value={region.county}>
                  {region.county}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label
              htmlFor="pickupDistrict"
              className="block font-semibold text-muted-foreground">
              District
            </label>
            <select
              id="pickupDistrict"
              name="pickupDistrict"
              value={formData.pickupDistrict}
              onChange={handleInputChange}
              disabled={!formData.pickupRegion}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              required>
              <option value="">Select a region</option>
              {regions
                .find((region) => region.county === formData.pickupRegion)
                ?.subcounties.map((subcounty) => (
                  <option key={subcounty} value={subcounty}>
                    {subcounty}
                  </option>
                ))}
            </select>
          </div>
          <div className="md:col-span-2 space-y-1">
            <label
              htmlFor="pickupAddress"
              className="block font-semibold text-muted-foreground">
              Detailed Address
            </label>
            <textarea
              id="pickupAddress"
              name="pickupAddress"
              value={formData.pickupAddress}
              onChange={handleInputChange}
              rows={2}
              className=" block w-full rounded-md border border-input bg-background placeholder:text-muted-foreground focus-visible:outline-none shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-3 py-2 text-base md:text-sm"
              placeholder="Street name and nearby landmark"
              required
            />
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
            <select
              id="deliveryRegion"
              name="deliveryRegion"
              value={formData.deliveryRegion}
              onChange={handleInputChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              required>
              <option value="">Select Region</option>
              {regions.map((region) => (
                <option key={region.county} value={region.county}>
                  {region.county}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label
              htmlFor="deliveryDistrict"
              className="block font-semibold text-muted-foreground">
              District
            </label>
            <select
              id="deliveryDistrict"
              name="deliveryDistrict"
              value={formData.deliveryDistrict}
              onChange={handleInputChange}
              disabled={!formData.deliveryRegion}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              required>
              <option value="">Select a region</option>
              {regions
                .find((region) => region.county === formData.deliveryRegion)
                ?.subcounties.map((subcounty) => (
                  <option key={subcounty} value={subcounty}>
                    {subcounty}
                  </option>
                ))}
            </select>
          </div>

          <div className="md:col-span-2 space-y-1">
            <label
              htmlFor="deliveryAddress"
              className="block font-semibold text-muted-foreground">
              Detailed Address
            </label>
            <textarea
              id="deliveryAddress"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleInputChange}
              rows={2}
              className="block w-full rounded-md border border-input bg-background placeholder:text-muted-foreground focus-visible:outline-none shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3 py-2 text-base md:text-sm"
              placeholder="Street name and nearby landmark"
              required
            />
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          4. Additional Information
        </h2>
        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block font-semibold text-muted-foreground">
            Parcel Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            required
            className="block w-full rounded-md border border-input bg-background placeholder:text-muted-foreground focus-visible:outline-none shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-3 py-2 text-base md:text-sm"
            placeholder="What are you sending..."
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
            name="weight"
            min="0.1"
            placeholder="Weight in Kgs"
            step="0.1"
            value={formData.weight || ""}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground">
            Parcel Image (Optional)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-500 transition-colors">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="parcelImage"
                  className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                  <span>Upload a file</span>
                  <input
                    id="parcelImage"
                    name="parcelImage"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          Request Quote
        </button>
      </div>
    </form>
  );
}
