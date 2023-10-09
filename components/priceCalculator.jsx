"use client";
import React, { useState } from "react";
import Autocomplete from "react-google-autocomplete";
import toast from "react-hot-toast";

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
  const [weight, setWeight] = useState(0);
  async function handleClick() {
    toast.success("processing", {
      icon: "⌛",
      timer: 3000,
    });
    const originEntries = Object.entries(origin);
    const destinationEntries = Object.entries(destination);
    const originIsEmpty = originEntries.some(([key, value]) => !value);
    const destinationIsEmpty = destinationEntries.some(
      ([key, value]) => !value
    );
    if (originIsEmpty || destinationIsEmpty || weight===0) {
        toast.error("Please fill in all the required fields.");
      } else {
        console.log("Perform calculation with:", origin, destination, parcelWeight);
      }
  }
  return (
    <div className="shadow-lg border border-slate-400 p-2 md:p-4 mt-2 bg-base-100">
      <h1 className="text-xl font-bold my-2">Price Calculator</h1>
      {/* render google places autocomplete */}
      <div className="flex flex-col md:flex-row gap-2 ">
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
          type="text"
          placeholder="&#128717;Parcel weight"
          style={style}
          required
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="my-2 "
        />
        <button
          type="button"
          className="btn btn-primary xsm:w-full"
          onClick={handleClick}
          disabled={!origin.address || !destination.address || weight === 0}>
          Calculate Price
        </button>
      </div>
      <p className="bg-slate-200 my-2 p-2 rounded-md text-start md:my-4">
        Total Price: <span className="font-bold">Ksh 0</span>
      </p>
    </div>
  );
}
