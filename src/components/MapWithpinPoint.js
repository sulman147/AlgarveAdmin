// import React, { useRef } from "react";
// import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";

// const MapWithPinPoint = () => {
//   const markerRef = useRef(null);
//   const handleClick = (e) => {
//     const { lat, lng } = e.latlng;
//     console.log(`Latitude: ${lat}, Longitude: ${lng}`);
//     if (markerRef.current) {
//       markerRef.current.setLatLng(e.latlng);
//     }
//   };

//   const LocationMarker = () => {
//     useMapEvents({
//       click: handleClick,
//     });

//     return <Marker position={[0, 0]} ref={markerRef} />;
//   };

//   return (
//     <div style={{ height: "400px", width: "100%" }}>
//       <MapContainer
//         center={[0, 0]}
//         zoom={3}
//         style={{ height: "100%", width: "100%" }}
//       >
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <LocationMarker />
//       </MapContainer>
//     </div>
//   );
// };

// export default MapWithPinPoint;

import React, { useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapWithPinPoint = ({ choseLocation }) => {
  const position = [37.112, -8.25]; // Coordinates for the initial map position
  const markerRef = useRef(null);
  const handleClick = (e) => {
    const { lat, lng } = e.latlng;
    alert(
      `Thanx for selecting your location latitude = ${lat} , longitude = ${lng} `
    );
    choseLocation(`${lat},${lng}`);
    console.log(`Latitude: ${lat}, Longitude: ${lng}`);
    if (markerRef.current) {
      markerRef.current.setLatLng(e.latlng);
    }
    
  };

  const LocationMarker = () => {
    useMapEvents({
      click: handleClick,
    });

    return <Marker position={[0, 0]} ref={markerRef} />;
  };
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
      />
      <LocationMarker />
      {/* <Marker position={position}>
        <Popup>A marker indicating a specific location on the map.</Popup>
      </Marker> */}
    </MapContainer>
  );
};

export default MapWithPinPoint;
