"use client";
import React, { useCallback, useState, useRef, useMemo } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

import Loading from "./loading";
import PickupLocation from "./pickuplocation";
import DeliveryLocation from "./deliverylocation";
import toast from "react-hot-toast";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const libraries = ["places"];
export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });
  const center = useMemo(() => ({ lat: -1.29, lng: 36.81 }), []);
  const zoom = useMemo(() => 1);
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [pickupLocation, setPickupLocation] = useState();
  const [deliveryLocation, setDeliveryLocation] = useState();
  const [directions, setDirections] = useState();
  const [distance, setDistance]= useState(0)

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
      toast.error("no delivery location");
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
          console.log(directions)
          setDistance(directions?.routes[0]?.legs[0]?.distance?.text ?? 0)
        }
      }
    );
  };

  return isLoaded ? (
    <div className="container">
      <div className="container shadow-lg bg-base-100">
        <PickupLocation
          setPickupLocation={(position) => {
            setPickupLocation(position);
            mapRef.current?.panTo(position);
          }}
        />
        <DeliveryLocation
          setDeliveryLocation={(position) => {
            setDeliveryLocation(position);
            mapRef.current?.panTo(position);
            fetchDirections(position);
          }}
        />
        <p className="chat-bubble chat-bubble-primary text-base font-bold mx-4 my-5 w-fit text-white">Distance: {directions?.routes[0]?.legs[0]?.distance?.text ?? 0}. This journey will take approximately {directions?.routes[0]?.legs[0]?.duration?.text ?? 0}</p>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}>
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
