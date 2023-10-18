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
const containerStyle = {
  width: "100%",
  height: "400px",
};

const libraries = ["places"];
export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });
  const center = useMemo(() => ({ lat: -1.29, lng: 36.81 }), []);
  const zoom = 1
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [pickupLocation, setPickupLocation] = useState();
  const [deliveryLocation, setDeliveryLocation] = useState();
  const [directions, setDirections] = useState();
  const [distance, setDistance]= useState(0)
  const { currentUser } = useAppContext();
 
  const [phone_number, setPhone_number]=useState(null)

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
          setDistance(result?.routes[0]?.legs[0]?.distance?.text ?? 0)
        }
      }
    );
  };
  
  return isLoaded ? (
    <div className="w-full flex-col md:flex-row  justify-between">
      <div className="p-2 self-start lg:w-1/2 gap-10">
        {!currentUser?.phone_number ? (
            <div className="mb-2">
              <label htmlFor="phone_number" className="block mb-2 text-sm ">
                What is your phone number?
              </label>
              <PhoneInput value={phone_number} onChange={setPhone_number} defaultCountry="KE" className="input input-bordered input-secondary" />
            </div>
          ) : (
            <></>
          )}
          <div className="mb-2">
            <label htmlFor="pickup_notes" className="block mb-2 text-sm ">
              Pickup Notes
            </label>
            <textarea
              rows="5"
              name="pickup_notes"
              id="pickup_notes"
              placeholder="pickup notes"
              className="w-full textarea textarea-primary"
              required></textarea>
          </div>
        <PickupLocation
          setPickupLocation={(position) => {
            setPickupLocation(position);
            mapRef.current?.panTo(position);
          }}
        />
        {/* <DeliveryLocation
          setDeliveryLocation={(position) => {
            setDeliveryLocation(position);
            mapRef.current?.panTo(position);
            fetchDirections(position);
          }}
        />
        <p className="chat-bubble chat-bubble-primary text-base font-bold mx-4 mb-2 w-fit text-white">Distance: {directions?.routes[0]?.legs[0]?.distance?.text ?? "0km"}. This journey will take approximately {directions?.routes[0]?.legs[0]?.duration?.text ?? "0 minutes"}</p> */}
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl:false,
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
