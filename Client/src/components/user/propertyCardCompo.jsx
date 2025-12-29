import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEnvelope, FaPhone, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";
import { useNavigate } from "react-router";
import PriceDisplay from "../common/display";

const PropertyCardCompo = ({ property }) => {
  if (!property) {
    return <div>Loading property details...</div>;
  }
  const subject = "Your Subject Here";
  const body = "Hello, I would like to discuss...";

  const navigate = useNavigate();
  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <div
      onClick={() => {
        navigate(`/property/${property?.seo_title}`);
        goTop();
      }}
      className="bg-[#AAB9D61A] shadow-lg rounded-[5px] overflow-hidden mx-3 p-3"
    >
      {/* Property Image */}
      <img
        src={property?.image?.[0]?.image || "fallback-image.jpg"}
        alt="Property"
        className="rounded-[5px] w-full h-48 object-cover mb-4"
      />

      {/* Property Title */}
      <h4 className="text-lg font-semibold">{property?.title || "No Title"}</h4>

      {/* Location */}
      <div className="flex items-start justify-start  text-[#2F5885] text-sm font-medium mt-1">
        <SlLocationPin className=" w-10 mt-1" size={17} />
        <p className="line-clamp-2">{property?.location || "No Location"}</p>
      </div>

      {/* Details */}
      <div className="flex flex-col space-y-2">
        <p className="text-sm font-light flex gap-3 mt-2">
          <span className="font-semibold">Price :</span>
          <PriceDisplay
            amount={property?.price?.toString().replace(/,/g, "")}
          />
          {/* {property?.price || "N/A"} */}
        </p>
        <p className="text-sm font-light flex gap-3">
          <span className="font-semibold">Consultant:</span>{" "}
          {property?.consultant?.name || "Unknown"}
        </p>
      </div>

      <div className="flex justify-between gap-3 w-full bg-red  !items-center mt-2  ">
        {/* <div className="flex gap-3"> */}
        {property?.consultant?.phone && (
          <a
            href={`tel:${property?.consultant?.phone}`}
            className="ProPhoneElement p-2 !bg-transparent !border-2 border-[#A9B9D6]  !rounded-full"
          >
            <FaPhone className="text-gray-600" />
          </a>
        )}
        {property?.consultant?.email && (
          <a
            href={`mailto:${
              property?.consultant?.email
            }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
              body
            )}`}
            className="ProEnvElement p-2 !bg-transparent !border-2 border-[#A9B9D6]  !rounded-full"
          >
            <FaEnvelope className="text-gray-600" />
          </a>
        )}

        {property?.consultant?.phone && property?.consultant?.country_code && (
          <a
            href={`https://wa.me/${property?.consultant?.country_code}${property?.consultant?.phone}`}
            className="ProEnvElement !bg-[#C6D5E6] !text-[#2F5885] justify-center flex w-[100%]  items-center px-2 py-1 gap-4 !bg-transparen !border-2 border-[#A9B9D6]  !rounded-md"
          >
            <IoLogoWhatsapp size={20} className="!text-[#2F5885]" />
            WhatsApp
          </a>
        )}
        {/* </div> */}
      </div>
      {/* Call & WhatsApp Buttons */}
      {/* <div className="mt-4 rounded-lg flex gap-2"> */}
      {/* {property?.consultant?.phone && (
          <a
            href={`tel:${property?.consultant?.phone}`}
            className="flex items-center text-[10px] gap-2 h-[27px] justify-center bg-[#C6D5E6] cursor-pointer hover:scale-[102%] transition-all !text-[#2F5885] !hover:text-black rounded-[5px] shadow-sm w-full"
          >
            <FaPhoneAlt size={13} className="text-[#2F5885]" />
            Call
          </a>
        )}

        {property?.consultant?.phone && property?.consultant?.country_code && (
          <a
            href={`https://wa.me/${property?.consultant?.country_code}${property?.consultant?.phone}`}
            className="flex items-center text-[10px] gap-2 h-[27px] cursor-pointer hover:scale-[102%] transition-all bg-[#C6D5E6] !text-[#2F5885] justify-center !hover:text-black rounded-[5px] shadow-sm w-full"
          >
            <IoLogoWhatsapp size={15} className="text-[#2F5885]" />
            WhatsApp
          </a>
        )} */}

      {/* Three Dots Button (Optional) */}
      {/* <a className="flex items-center gap-2 h-[27px] cursor-pointer hover:scale-[102%] transition-all bg-[#C6D5E6] !text-[#2F5885] px-2 !hover:text-black rounded-[5px] shadow-sm">
          <BsThreeDotsVertical className="text-[#2F5885]" />
        </a> */}
      {/* </div> */}
    </div>
  );
};

export default PropertyCardCompo;
