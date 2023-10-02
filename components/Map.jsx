"use client";
import React, { useCallback, useState, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";

import Loading from "./loading";
import Places from "./Places";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: -1.292066,
  lng: 36.821946,
};
const libraries=["places"]
export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries
  });
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    mapRef.current = map
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className="container">
         <Places
          pickupLocation={(position) => {
            setPickupLocation(position);
            mapRef.current?.panTo(position);
          }}
          deliveryLocation={(position) => {
            setPickupLocation(position);
            mapRef.current?.panTo(position);
          }}
        />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={0}
        onLoad={onLoad}
        onUnmount={onUnmount}>
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
      </GoogleMap>
    </div>
  ) : (
    <>
      <Loading />
    </>
  );
}
