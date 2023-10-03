"use client";
import React from "react";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";


export default function DeliveryLocation({ setDeliveryLocation }) {
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
    setDeliveryLocation(latLng);
  };
  return (
    <div className="mb-1 xsm:mb-0 p-4 font-mono">
      <ul className="steps steps-vertical mx-4 xsm:mx-1" data-content="2">
        <li className="step step-primary ">
          <div className="flex flex-col items-start justify-start">
            <p className="font-bold text-base my-2">
              Where would you like to send it?
            </p>
            <input
              type="search"
              className="input input-secondary focus:outline-none w-full max-w-xl mb-2"
              value={value}
              disabled={!ready}
              placeholder="Enter your pickup address"
              onChange={(e) => setValue(e.target.value)}
            />
            <ul className="bg-base-200 w-full items-start flex flex-col text-base m-0 pt-1 justify-start">
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <li
                    key={place_id}
                    value={description}
                    onClick={() => handleSelect(description)}
                    className="btn btn-ghost pt-2">
                    {description}
                  </li>
                ))}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}
