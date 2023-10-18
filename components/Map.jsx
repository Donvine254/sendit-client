"use client";
import React, { useCallback, useState, useRef, useMemo } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import { useAppContext } from "@/context/context";
import Loading from "./loading";
import PickupLocation from "./pickuplocation";
import DeliveryLocation from "./deliverylocation";
import toast from "react-hot-toast";

//styles for the map container  
const containerStyle = {
  width: "100%",
  height: "500px",
  margin:"auto"
};

const libraries = ["places"];
export default function Map({ mapToRender }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });
  const center = useMemo(() => ({ lat: -1.29, lng: 36.81 }), []);
  const zoom = 1;
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [pickupLocation, setPickupLocation] = useState();
  const [deliveryLocation, setDeliveryLocation] = useState();
  const [directions, setDirections] = useState();
  const [distance, setDistance] = useState(0);
  const { currentUser } = useAppContext();

  const [phone_number, setPhone_number] = useState(null);
  const [receiver_contact, setReceiver_contact]= useState(null);

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
          setDistance(result?.routes[0]?.legs[0]?.distance?.text ?? 0);
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
            />
            {!currentUser?.phone_number ? (
              <div className="mt-4 py-2">
                <label htmlFor="phone_number" className="block mb-2 text-sm ">
                  What is your phone number?
                </label>
                <PhoneInput
                  value={phone_number}
                  onChange={setPhone_number}
                  defaultCountry="KE"
                  className="input input-bordered input-secondary"
                />
              </div>
            ) : (
              <></>
            )}
            <div className="mb-2 py-2">
              <label htmlFor="pickup_notes" className="block mb-2 text-sm ">
                Pickup Notes
              </label>
              <textarea
                rows="3"
                name="pickup_notes"
                id="pickup_notes"
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
            />
            <form>
              <div className="mt-4 py-2">
                <label
                  htmlFor="receiver_name"
                  className="block mb-2 text-sm text-gray-600">
                  Receiver Name{" "}
                  <span className="text-red-600 font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="receiver_name"
                  id="receiver_name"
                  placeholder="John Doe"
                  required
                  className="input input-bordered input-secondary w-full max-w-xs0"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="receiver_name"
                  className="block mb-2 text-sm text-gray-600">
                  Receiver Contact{" "}
                  <span className="text-red-600 font-bold">*</span>
                </label>
                <PhoneInput
                  value={receiver_contact}
                  onChange={setReceiver_contact}
                  defaultCountry="KE"
                  className="input input-bordered input-secondary"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="delivery_notes" className="block mb-2 text-sm ">
                  Delivery Notes
                </label>
                <textarea
                  rows="3"
                  name="delivery_notes"
                  id="delivery_notes"
                  placeholder="delivery notes"
                  className="w-full textarea textarea-primary"
                  required></textarea>
              </div>
            </form>
          </>
        )}

        {/* <p className="chat-bubble chat-bubble-primary text-base font-bold mx-4 mb-2 w-fit text-white">Distance: {directions?.routes[0]?.legs[0]?.distance?.text ?? "0km"}. This journey will take approximately {directions?.routes[0]?.legs[0]?.duration?.text ?? "0 minutes"}</p> */}
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
            <Marker
              position={pickupLocation}
              icon={
                "https://res.cloudinary.com/dipkbpinx/image/upload/v1697650099/flag-svgrepo-com_1_zz3zvp.svg"
              }
            />
          </>
        )}
        {deliveryLocation && (
          <>
            <Marker position={deliveryLocation} icon={"https://res.cloudinary.com/dipkbpinx/image/upload/v1697650214/green-flag_wbpv1t.svg"} />
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
