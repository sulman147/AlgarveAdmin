import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import axios from "axios";

const LocationSearch = () => {
  const [map, setMap] = useState(null);
  const [searchBox, setSearchBox] = useState(null);
  const [location, setLocation] = useState(null);

  const onLoad = (map) => {
    setMap(map);
  };
  const libraries = ["drawing", "places"];
  const onSearchBoxLoad = (ref) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const { lat, lng } = place.geometry.location;

      setLocation({ latitude: lat(), longitude: lng() });
    }
  };

  const fetchLocation = async () => {
    if (location) {
      const { latitude, longitude } = location;
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCmetjcRkhU-YVCih1awYxGj7PxPRM_B5U`
        );
        console.log(response.data.results[0].formatted_address);
      } catch (error) {
        console.log("Error fetching location:", error);
      }
    }
  };

  return (
    <div>
      <LoadScript
        googleMapsApiKey="AIzaSyCmetjcRkhU-YVCih1awYxGj7PxPRM_B5U"
        libraries={["places"]}
      >
        <GoogleMap
          mapContainerStyle={{ height: "400px", width: "800px" }}
          zoom={10}
          center={{ lat: 0, lng: 0 }}
          onLoad={onLoad}
        >
          <StandaloneSearchBox
            onLoad={onSearchBoxLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              placeholder="Enter location"
              style={{ width: "800px", height: "50px", zindex: "10" }}
            />
          </StandaloneSearchBox>
        </GoogleMap>
      </LoadScript>
      <button onClick={fetchLocation} disabled={!location}>
        Get Location
      </button>
    </div>
  );
};

export default LocationSearch;
