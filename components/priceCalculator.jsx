"use client";
import React, { useState, useRef } from "react";
import Autocomplete from "react-google-autocomplete";
import toast from "react-hot-toast";
import { getDistance, calculatePrice } from "@/lib/calculatePrice";
const style = {
  width: "100%",
  border: "1px solid #E2E8F0",
  height: "48px",
  padding: "10px",
  margin: "0 0px",
  borderRadius: "6px",
  backgroundColor: "#E2E8F0",
  outlineColor: "#0056F1",
};
export default function PriceCalculator() {
  const [origin, setOrigin] = useState({
    address: "",
    location: {},
  });
  const [destination, setDestination] = useState({
    address: "",
    location: {},
  });
  const weightRef = useRef(null);
  const [price, setPrice] = useState(0);
  async function handleSubmit(e) {
    e.preventDefault();
    const weight = weightRef.current.value;
    toast.success("processing", {
      icon: "⌛",
    });
    const originEntries = Object.entries(origin);
    const destinationEntries = Object.entries(destination);
    const originIsEmpty = originEntries.some(([key, value]) => !value);
    const destinationIsEmpty = destinationEntries.some(
      ([key, value]) => !value
    );
    if (originIsEmpty || destinationIsEmpty || weight === 0) {
      toast.error("Please fill in all the required fields.");
    } else {
      //   getDistance(origin.address, destination.address, weight);
      setPrice(() => calculatePrice(weight));
      weightRef.current.value=null;
      toast.success("done!");
    }
  }
  return (
    <div className="shadow-lg border border-slate-400 p-2 md:p-4 mt-2 bg-base-100">
      <h1 className="text-xl font-bold my-2">Price Calculator</h1>
      {/* render google places autocomplete */}
      <form
        className="flex flex-col md:flex-row gap-2 "
        onSubmit={handleSubmit}>
        <Autocomplete
          className="my-2"
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
          placeholder="&#128204; From:"
          style={style}
          aria-required
          onPlaceSelected={(place) =>
            setOrigin({
              address: place.formatted_address,
              location: place.geometry.location,
            })
          }></Autocomplete>
        <Autocomplete
          className="my-2"
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
          placeholder="	&#10148; To:"
          aria-required
          style={style}
          onPlaceSelected={(place) =>
            setDestination({
              address: place.formatted_address,
              location: place.geometry.location,
            })
          }></Autocomplete>
        <input
          type="number"
          name="weight"
          ref={weightRef}
          placeholder="&#128717;Parcel weight"
          style={style}
          required
          max={100}
          className="my-2 "
        />
        <button
          type="submit"
          className="btn btn-primary xsm:w-full"
          disabled={
            !origin.address ||
            !destination.address ||
            weightRef.current.value === 0
          }>
          Calculate Price
        </button>
      </form>
      <div className="bg-slate-200 my-2 p-2 rounded-md text-start md:my-4 ">
        <div className="flex items-center justify-between">
          <p>Price:</p>
          <p className="font-bold">Ksh {price}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>VAT:</p>
          <p className="font-bold">Ksh {(0.16 * price).toFixed(2)}</p>
        </div>
      </div>
      <div className="divider"></div>
      <div className="flex items-center justify-between font-bold my-1 text-xl">
        <p>Total Price:</p>
        <p>Ksh {(1.16 * price).toFixed()}</p>
      </div>
      <div className="divider"></div>
    </div>
  );
}
