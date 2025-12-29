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

  // console.log("defaultCenter", defaultCenter);
  const [selected, setSelected] = useState(null);
  const [map, setMap] = useState(null);
  const [mapType, setMapType] = useState("roadmap");

  // const handleMarkerClick = () => {
  //   setSelected({
  //     label: propertyData.title,

  //     description: propertyData.description,
  //     ...defaultCenter,
  //   });
  // };

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
          {/* onClick={handleMarkerClick} */}
          {selected && (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => setSelected(null)}
            >
              <div>{selected.label}</div>
            </InfoWindow>
          )}
          {/* {selected && (
            <InfoWindow
              position={{
                lat: parseFloat(selected.lat),
                lng: parseFloat(selected.lng),
              }}
              onCloseClick={() => setSelected(null)}
            >
              <div>
                <img src={pro.image} className="w-20  absolute top-3 " />
                <p className="mt-4 text-xl !font-semibold">{pro.title}</p>
                <p>{pro.price}</p>
                <p>{pro.location}</p>
              </div>
            </InfoWindow>
          )} */}
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
