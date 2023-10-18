"use client";

import React from "react";
import Image from "next/image"
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {MdLocationPin} from "react-icons/md"
export default function PickupLocation({ setPickupLocation }) {
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
    const address = { address: val };
    const results = await getGeocode(address);
    const { lat, lng } = await getLatLng(results[0]);
    const latLng = new window.google.maps.LatLng(lat, lng);
    setPickupLocation(latLng);
  };
  return (
    <>
            <p className="font-bold text-base m-5 flex items-center gap-2">
            <Image src="./flag.svg" width={20} height={20} alt="pickup flag"/> Pickup Address
            </p>
            <div className="m-5 w-full md:w-1/2">
            <input
              type="search"
              className="input input-secondary focus:outline-none w-full mb-2"
              value={value}
              disabled={!ready}
              placeholder="Tatu City"
              onChange={(e) => setValue(e.target.value)}
            />
            <ul
              className="bg-base-100  items-start flex flex-col text-base m-0 pt-1 justify-start py-2 border z-50"
              style={{ position: "absolute", top: "100%" }}>
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <li
                    key={place_id}
                    value={description}
                    onClick={() => handleSelect(description)}
                    className="mr-2 hover:bg-primary hover:text-white hover:rounded-md  capitalize w-full text-start p-2 flex items-center">
                   <MdLocationPin/> {description}
                  </li>
                ))}
            </ul>
            </div>
            
       
    </>
  );
}
