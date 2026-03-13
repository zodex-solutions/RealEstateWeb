import React, { useState, useCallback, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  height: "400px",
  width: "100%",
  borderRadius: "5px",
  zIndex: 0,
  position: "relative",
};

const MapComponent = ({ lat, long, propertyData }) => {
  // console.log(lat, long);

  const defaultCenter = {
    lat: parseFloat(lat),
    lng: parseFloat(long),
  };

  const [selected, setSelected] = useState(null);
  const [map, setMap] = useState(null);
  const [mapType, setMapType] = useState("roadmap");


  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const switchToSatellite = () => {
    if (map) {
      map.setMapTypeId("satellite");
      setMapType("satellite");
    }
  };

  const switchToRoadmap = () => {
    if (map) {
      map.setMapTypeId("roadmap");
      setMapType("roadmap");
    }
  };

  const mapOptions = {
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
  };

  return (
    <div style={{ position: "relative" }}>
      <LoadScript googleMapsApiKey="AIzaSyCfnICEIh_3fWyeTVTTde0JmlANcO7GM9M">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={16}
          options={mapOptions}
          onLoad={handleMapLoad}
        >
          <Marker position={defaultCenter} />
          {selected && (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => setSelected(null)}
            >
              <div>{selected.label}</div>
            </InfoWindow>
          )}
         
        </GoogleMap>
      </LoadScript>

      {/* Custom Controls */}
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 0 }}>
        {mapType !== "satellite" ? (
          <button
            onClick={switchToSatellite}
            style={{
              padding: "8px 12px",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              marginBottom: "8px",
              color: "black",
            }}
          >
            Satellite
          </button>
        ) : (
          <button
            onClick={switchToRoadmap}
            style={{
              padding: "8px 12px",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              marginBottom: "8px",
              color: "black",
            }}
          >
            Roadmap
          </button>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
