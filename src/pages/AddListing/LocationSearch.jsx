import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

function LocationSearch() {
  const [pinLocation, setPinLocation] = useState(null);
  const mapRef = useRef(null);
  const handleClick = (e) => {
    console.log(e);
    setPinLocation(e.latlng);
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
      whenCreated={(map) => (mapRef.current = map)}
      onClick={handleClick}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {pinLocation && <Marker position={pinLocation} />}
    </MapContainer>
  );
}

export default LocationSearch;
