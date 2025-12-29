import axios from "axios";
import React, { use, useEffect, useRef, useState } from "react";
import config from "../../common/config";
import PropertyCardCompo from "./propertyCardCompo";
import Slider from "react-slick";

const SmallPropertyComponent = ({ Status, matchingDev }) => {
  const sliderRef = useRef(null);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    responsive: [
      { breakpoint: 2560, settings: { slidesToShow: 4, centerPadding: "0" } },
      { breakpoint: 1356, settings: { slidesToShow: 3, centerPadding: "0" } },
      { breakpoint: 1044, settings: { slidesToShow: 2, centerPadding: "0" } },
      { breakpoint: 695, settings: { slidesToShow: 1, centerPadding: "0" } },
    ],
  };

  const filteredProperties = matchingDev?.filter(
    (property) =>
      property?.property_status?.title?.toLowerCase() === Status?.toLowerCase()
  );

  console.log("ProFilter =========", filteredProperties);

  return (
    <div className="mt-10 mx-10 relative SliderMargin">
      {filteredProperties.length <= 1 ? (
        <p>No properties available for {Status}</p>
      ) : (
        <Slider ref={sliderRef} {...settings}>
          {filteredProperties.map((property, index) => (
            <div key={property._id || index} className="slick-slide">
              <PropertyCardCompo property={property} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default SmallPropertyComponent;
