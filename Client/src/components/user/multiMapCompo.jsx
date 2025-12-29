import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import PriceDisplay from "../common/display";

const containerStyle = {
  height: "570px",
  width: "100%",
  borderRadius: "5 px",
  zIndex: 0,
  position: "relative",
};

const MultiMarkerMap = ({ markers, center }) => {
  console.log("Markers", markers);

  const defaultCenter = markers.length
    ? { lat: parseFloat(markers[0].lat), lng: parseFloat(markers[0].lng) }
    : { lat: 0, lng: 0 };

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
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
  };

  return (
    //
    <div style={{ position: "relative" }}>
      <LoadScript googleMapsApiKey="AIzaSyCfnICEIh_3fWyeTVTTde0JmlANcO7GM9M">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          options={mapOptions}
          onLoad={handleMapLoad}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{
                lat: parseFloat(marker.lat),
                lng: parseFloat(marker.lng),
              }}
              onClick={() => setSelected(marker)}
            />
          ))}

          {selected && (
            <InfoWindow
              position={{
                lat: parseFloat(selected.lat),
                lng: parseFloat(selected.lng),
              }}
              onCloseClick={() => setSelected(null)}
            >
              <div>
                <img src={selected.image} className="w-20  absolute top-3 " />
                <p className="mt-4 text-xl !font-semibold">{selected.title}</p>
                {/* <p>{selected.price}</p> */}
                <PriceDisplay
                  amount={selected?.price?.toString().replace(/,/g, "")}
                  css=" text-black font-medium  text-[14px] "
                />
                <p>{selected.location}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      {/* Map Type Switcher */}
      <div
        // className="absolute lg:!top-2 md:top-4 sm:!top-4 left-[10px] z-10"
        style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}
      >
        {mapType !== "satellite" ? (
          <button onClick={switchToSatellite} style={controlStyle}>
            Satellite
          </button>
        ) : (
          <button onClick={switchToRoadmap} style={controlStyle}>
            Roadmap
          </button>
        )}
      </div>
    </div>
  );
};

const controlStyle = {
  padding: "8px 12px",
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  borderRadius: "4px",
  cursor: "pointer",
  color: "black",
};

export default MultiMarkerMap;
