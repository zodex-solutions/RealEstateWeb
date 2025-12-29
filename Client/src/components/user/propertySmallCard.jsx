import React from "react";
import { FaBath, FaBed, FaMap } from "react-icons/fa";
import { useNavigate } from "react-router";
import PriceDisplay from "../common/display";
const PropertySmallCard = ({
  image,
  date,
  title,
  description,
  location,
  link,
  beds,
  shower,
  sqr_foot,
  price,
  seo_title,
}) => {
  const navigate = useNavigate();

  const handelPerticularProperty = (seoTitle) => {
    navigate(`/property/${seoTitle}`);
  };
  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div
      onClick={() => {
        handelPerticularProperty(seo_title);

        goTop();
      }}
      className="SmallCard rounded-md shadow-lg !overflow-hidden bg-white md:p-4 sm:p-3 p-2 w- mx-1.5 !max-w-md"
    >
      {/* Image */}
      <div className="SmallCardImage w-full h- rounded-md overflow-hidden">
        <img
          src={image[0]?.image}
          alt="Property"
          className="w-auto !h-[100% object-fil"
        />
      </div>
      {/* Text Content */}
      <div className="mt-3">
        <h2 className="text-[10px] font-semibold">{title}</h2>
        <p className="text-black text-[8px] line-clamp-1">{location}</p>
        <div className="flex flex-wrap gap-3 text-black text-[11px] whitespace-nowrap overflow-hidden  text-ellipsis">
          <span className="flex items-center gap-1">
            <FaBed /> {beds}
          </span>
          <span className="flex items-center gap-1">
            <FaBath /> {shower}
          </span>
          <span className="flex items-center gap-1">
            <FaMap />
            {sqr_foot}
          </span>
        </div>
        {/* <p className="text-black font-normal text-[10px]"> */}{" "}
        <PriceDisplay
          amount={price?.toString().replace(/,/g, "")}
          css="text-black font-normal text-[10px] "
        />
        {/* AED {price} */}
        {/* </p> */}
      </div>
    </div>
  );
};

export default PropertySmallCard;
