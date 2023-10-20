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
  margin: "auto",
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
 
  const [directions, setDirections] = useState();

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
    setDeliveryLocation
  } = useAppContext();

  //function to handle change in inputs
  function handleChange(e) {
    const { name, value } = e.target;

    setParcelData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          setOrderData((prev)=>({
            ...prev,
            distance:result.routes[0]?.legs[0]?.distance?.text,
            duration:result.routes[0]?.legs[0]?.duration?.text 
          }))
    
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
            <div className="m-2 py-2">
              <label htmlFor="pickup_notes" className="block mb-2 text-sm ">
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
                  className="block mb-2 text-sm text-gray-600">
                  Receiver Name{" "}
                  <span className="text-red-600 font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="receiver_name"
                  id="receiver_name"
                  value={parcelData.receiver_name}
                  onChange={handleChange}
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
                  value={parcelData.receiver_contact}
                  onChange={(value) => 
                    setParcelData((prev) => ({
                      ...prev,
                      receiver_contact: value,
                    }))
                  }
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
            <Marker
              position={pickupLocation}
            />
          </>
        )}
        {deliveryLocation && (
          <>
            <Marker
              position={deliveryLocation}           
            />
          </>
        )}
        {directions && <DirectionsRenderer directions={directions}  />}
      </GoogleMap>
    </div>
  ) : (
    <>
      <Loading />
    </>
  );
}
