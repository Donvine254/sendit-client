"use client";
import React, { useCallback, useState, useRef, useMemo } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

import { useAppContext } from "@/context/context";
import Loading from "./loading";
import PickupLocation from "./pickuplocation";
import DeliveryLocation from "./deliverylocation";
import toast from "react-hot-toast";

//styles for the map container
const containerStyle = {
  width: "100%",
  height: "500px",
  margin: "auto",
};

const libraries = ["places"];
export default function Map({ mapToRender, valid, setValid }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });
  const center = useMemo(() => ({ lat: -1.29, lng: 36.81 }), []);
  const zoom = 1;
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  const [directions, setDirections] = useState();
  //state to validate phone input

  const {
    currentUser,
    parcelData,
    setParcelData,
    phone_number,
    setPhone_number,
    setOrderData,
    pickupLocation,
    setPickupLocation,
    deliveryLocation,
    setDeliveryLocation,
  } = useAppContext();

  //function to handle change in inputs
  const [useContact, setUseContact] = useState(false);
  //function to set contact_person to user number
  function handleUseContact() {
    setUseContact(!useContact);
    if (useContact) {
      setParcelData((prev) => ({
        ...prev,
        contact_person: currentUser.phone_number,
      }));
    }
    else if(!useContact){
      setParcelData((prev) => ({
        ...prev,
        contact_person: "",
      }));
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;

    setParcelData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  //function to validate phone input
  function handlePhoneInput(value, user) {
    if (value) {
      if (user === "receiver") {
        setParcelData((prev) => ({
          ...prev,
          receiver_contact: value,
        }));
      } else {
        setParcelData((prev) => ({
          ...prev,
          contact_person: value,
        }));
        setPhone_number(value)
      }
      setValid(isValidPhoneNumber(value));
    }
    else return false
  }
  

  function handleBlur() {
    if (!valid) {
      toast.error("Invalid phone number");
    }
  }

  const onLoad = useCallback(function callback(map) {
    const nairobiBounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(-1.296056, 36.826397),
      new window.google.maps.LatLng(-1.330702, 37.001718)
    );
    map.fitBounds(nairobiBounds);
    mapRef.current = map;
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  const fetchDirections = (destination) => {
    if (!pickupLocation || !destination) {
      toast.error("Invalid pickup or delivery location");
    }
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: pickupLocation,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
          setOrderData((prev) => ({
            ...prev,
            distance: result.routes[0]?.legs[0]?.distance?.text,
            duration: result.routes[0]?.legs[0]?.duration?.text,
          }));
        }
      }
    );
  };

  return isLoaded ? (
    <div className="w-full flex flex-col lg:flex-row  justify-evenly gap-10 py-2">
      <div className="p-2 self-start w-full gap-10 border pb-5">
        {mapToRender === "pickup" ? (
          <form className="py-2 lg:h-[480px]">
            <p className="text-lg font-bold py-2 text-center">
              Add Pickup Address
            </p>
            <PickupLocation
              setPickupLocation={(position) => {
                setPickupLocation(position);
                mapRef.current?.panTo(position);
              }}
              setParcelData={setParcelData}
            />
            <div className="mt-4 py-2">
              {!currentUser?.phone_number ? (
                <>
                  <label htmlFor="phone_number" className="block mb-2 text-lg font-bold">
                    What is your phone number?
                  </label>
                  <PhoneInput
                    value={phone_number}
                    onChange={(value) => handlePhoneInput(value)}
                    onBlur={handleBlur}
                    defaultCountry="KE"
                    className={`input input-bordered input-secondary ${
                      !valid ? "input-error" : ""
                    }`}
                  />
                  {!valid && (
                    <p className="text-error-content my-2">
                      Please enter a valid phone number
                    </p>
                  )}
                </>
              ) : (
                <>
                  <label
                    htmlFor="contact_person"
                    className="block mb-2 text-lg font-bold">
                    Contact Person:
                  </label>
                  <label
                    htmlFor="contact_info"
                    className="my-2 cursor-pointer flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="contact-info"
                      checked={useContact}
                      className="checkbox checkbox-primary"
                      onChange={handleUseContact}
                    />
                    <span className="text-error font-bold">Use my contact info</span>
                  </label>

                  {!useContact? (
                    <>
                      <PhoneInput
                        value=""
                        onChange={(value) => handlePhoneInput(value)}
                        onBlur={handleBlur}
                        defaultCountry="KE"
                        className={`input input-bordered input-secondary ${
                          !valid ? "input-error" : ""
                        }`}
                      />
                      {!valid && (
                        <p className="text-error-content my-2">
                          Please enter a valid phone number
                        </p>
                      )}
                    </>
                  ):<></>}
                </>
              )}
            </div>
            <div className="my-2 py-2">
              <label
                htmlFor="pickup_notes"
                className="block mb-2 text-lg font-bold ">
                Pickup Notes
              </label>
              <textarea
                rows="3"
                name="pickup_notes"
                id="pickup_notes"
                value={parcelData.pickup_notes}
                onChange={handleChange}
                placeholder="pickup notes"
                className="w-full textarea textarea-primary"
                required></textarea>
            </div>
          </form>
        ) : (
          <>
            <p className="text-lg font-bold py-2 text-center">
              Add Delivery Address
            </p>
            <DeliveryLocation
              setDeliveryLocation={(position) => {
                setDeliveryLocation(position);
                mapRef.current?.panTo(position);
                fetchDirections(position);
              }}
              setParcelData={setParcelData}
            />
            <form>
              <div className="mt-4 py-2">
                <label
                  htmlFor="receiver_name"
                  className="block mb-2 text-lg font-bold">
                  Receiver Name{" "}
                  <span className="text-red-600 font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="receiver_name"
                  id="receiver_name"
                  pattern="[A-Za-z-' ]+"
                  minLength="4"
                  maxLength="50"
                  title="name cannot be less than four characters"
                  value={parcelData.receiver_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="input input-bordered input-secondary w-full max-w-xs0"
                />
                {parcelData.receiver_name.length > 1 &&
                  parcelData.receiver_name.length < 4 && (
                    <p className="text-error my-2">
                      *Please enter a valid name
                    </p>
                  )}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="receiver_name"
                  className="block mb-2 text-lg font-bold">
                  Receiver Contact{" "}
                  <span className="text-red-600 font-bold">*</span>
                </label>
                <PhoneInput
                  value={parcelData.receiver_contact}
                  onChange={(value) => handlePhoneInput(value, "receiver")}
                  onBlur={handleBlur}
                  defaultCountry="KE"
                  className={`input input-bordered ${
                    !valid ? "input-error" : ""
                  }`}
                />
                {!valid && (
                  <p className="text-error my-2">
                    * Please enter a valid phone number
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="delivery_notes"
                  className="block mb-2 text-sm text-lg font-bold">
                  Delivery Notes
                </label>
                <textarea
                  rows="3"
                  name="delivery_notes"
                  id="delivery_notes"
                  value={parcelData.delivery_notes}
                  onChange={handleChange}
                  placeholder="delivery notes"
                  className="w-full textarea textarea-primary"
                  required></textarea>
              </div>
            </form>
          </>
        )}
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}>
        {pickupLocation && (
          <>
            <Marker position={pickupLocation} />
          </>
        )}
        {deliveryLocation && (
          <>
            <Marker position={deliveryLocation} />
          </>
        )}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  ) : (
    <>
      <Loading />
    </>
  );
}
