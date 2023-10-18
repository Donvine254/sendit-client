"use client";

import React from "react";
import Image from "next/image";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { MdLocationPin } from "react-icons/md";
export default function PickupLocation({ setPickupLocation, setParcelData }) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();
    //set parcelData delivery address to val
    setParcelData((prev) => ({
      ...prev,
      pickup_address: val,
    }));
    const address = { address: val };
    const results = await getGeocode(address);
    const { lat, lng } = await getLatLng(results[0]);
    const latLng = new window.google.maps.LatLng(lat, lng);
    setPickupLocation(latLng);
  };
  return (
    <>
      <p className="font-bold text-base flex items-center gap-2">
        <Image src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697650099/flag-svgrepo-com_1_zz3zvp.svg" width={20} height={20} alt="pickup flag" />{" "}
        Pickup Address
      </p>
      <div className="w-full mt-2 relative">
        <input
          type="search"
          className="input input-secondary focus:outline-none w-full mb-2"
          value={value}
          disabled={!ready}
          placeholder="Tatu City"
          onChange={(e) => setValue(e.target.value)}
        />
        <ul
          className="bg-base-100  items-start flex flex-col text-base m-0 pt-1 justify-start py-2 border z-50 w-full"
          style={{ position: "absolute", top: "100%" }}>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <li
                key={place_id}
                value={description}
                onClick={() => handleSelect(description)}
                className="mr-2 hover:bg-primary hover:text-white hover:rounded-md  capitalize w-full text-start p-2 flex items-center">
                <MdLocationPin /> {description}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
