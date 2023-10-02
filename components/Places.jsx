"use client";

import React from "react";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

export default function Places({ setPickupLocation, setDeliveryLocation }) {
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
    const results = await getGeocode(val);
    const { lat, lng } = await getLatLng(results[0]);
    setPickupLocation({ lat, lng });
  };
  const handleDeliverySelect = async (val) => {
    setValue(val, false);
    clearSuggestions();
    const results = await getGeocode(val);
    const { lat, lng } = await getLatLng(results[0]);
    setDeliveryLocation({ lat, lng });
  };
  return (
    <div className="shadow-lg mb-4 p-4 font-mono">
      <ul class="steps steps-vertical mx-4">
        <li class="step step-primary ">
          <div className="flex flex-col items-start justify-start">
            <p className="font-bold text-base my-2">
              Where should we pick up your parcel?
            </p>
            <Combobox onSelect={handleSelect}>
              <ComboboxInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                className="input input-secondary focus:outline-none w-full max-w-xs"
                placeholder="Enter your pickup address"
              />
              <ComboboxPopover className="pl-2">
                <ComboboxList>
                  {status === "OK" &&
                    data.map(({ place_id, description }) => (
                      <ComboboxOption key={place_id} value={description} />
                    ))}
                </ComboboxList>
              </ComboboxPopover>
            </Combobox>
          </div>
        </li>
        <li class="step step-primary ">
          <div className="flex flex-col items-start justify-start">
            <p className="font-bold text-base my-2">
              Where would you like to send it?
            </p>
            <Combobox onSelect={handleDeliverySelect}>
              <ComboboxInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                className="input input-primary w-full max-w-xs focus:outline-none"
                placeholder="Enter your delivery address"
              />
              <ComboboxPopover className="pl-2">
                <ComboboxList>
                  {status === "OK" &&
                    data.map(({ place_id, description }) => (
                      <ComboboxOption key={place_id} value={description} />
                    ))}
                </ComboboxList>
              </ComboboxPopover>
            </Combobox>
          </div>
        </li>
      </ul>
    </div>
  );
}
