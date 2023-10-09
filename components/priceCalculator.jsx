"use client";
import React, { useState } from "react";
import Autocomplete from "react-google-autocomplete";

const style = {
  width: "100%",
  border: "1px solid #E2E8F0",
  height: "40px",
  padding: "10px",
  borderRadius: "5px",
  backgroundColor: "#E2E8F0",
  outline: "none",
};
export default function PriceCalculator() {
  const [origin, setOrigin] = useState({
    address: "",
    lat: 0,
    lng: 0,
  });
  const [destination, setDestination] = useState({
    address: "",
    lat: 0,
    lng: 0,
  });
  return (
    <>
      <h1 className="text-2xl font-bold my-2">Price Calculator</h1>
      {/* render google places autocomplete */}
      <Autocomplete
        className="my-2"
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        placeholder="&#128204; From:"
        style={style}
        onPlaceSelected={(place) =>
          setOrigin({
            address: place.formatted_address,
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
          })
        }></Autocomplete>
      <Autocomplete
        className="my-2"
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        placeholder="	&#10148; To:"
        style={style}
        onPlaceSelected={(place) =>
          setDestination({
            address: place.formatted_address,
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
          })
        }></Autocomplete>
      <input
        type="text"
        placeholder="&#128717;Parcel weight"
        style={style}
        className="my-2 "
      />
      <button type="button" className="btn btn-primary" onClick={handleClick}>
        Calculate Price
      </button>
    </>
  );
}
