import React from "react";
import QueryForm from "../../../components/user/QueryForm";
import bgImage from "../../../assets/bg.jpg"; // adjust path as needed

import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";
export default function ContactUs() {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Content wrapper */}
      <div className="relative  py-10 z-10 min-h-screen max-w-[1320px] mx-auto px-5 flex flex-col lg:flex-row items-center lg:gap-10 md:gap-6 justify-center p-4 md:p-10">
        <div className="w-full bg-[#2f5fa7b4] h-[100%] rounded-md lg:w-1/2 text-white bg-opacity-60 p-6 md:p-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold leading-snug">
            Ready to find your dream home or sell your property?
          </h2>
          <p className="text-gray-100 !font-semibold text-lg">
            Your dream home in Dubai is just a message away. Complete the form,
            and let us understand your needs to find the perfect match for you.
          </p>
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 ">
                <FaPhone className="text-[#fff] text-md" />
                <strong>Make A Call :</strong>
              </div>
              <span className="text-lg !text-[#fff] cursor-pointer">
                +971-527186972
              </span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 ">
                <FaWhatsapp className="text-[#fff] text-xl" />
                <strong>Send A Message :</strong>
              </div>
              <a
                href="https://wa.me/971527186972"
                className="text-lg !text-[#fff] underline"
              >
                +971-527186972
              </a>
            </div>
            <div className="flex items-center  gap-4 mb-4">
              <div className="flex items-center gap-2 ">
                <FaEnvelope className="text-[#fff] text-md " />
                <strong>Email US :</strong>
              </div>
              <a
                href="mailto:inquiry@dnsdxb.com"
                className="text-lg !text-[#fff] underline"
              >
                inquiry@dnsdxb.com
              </a>
            </div>

            <div className="flex items-start gap-4 mb-4">
              <div className="flex items-start gap-2 ">
                <FaMapMarkerAlt className="text-[#fff] text-lg mt-1" />
                <div className="flex gap-[3px]">
                  <strong>Address </strong>
                  <strong> :</strong>
                </div>
              </div>
              <span className="text-lg !text-[#fff] cursor-default">
                PO BOX NO. 12391, 102, Burlington Tower, Business Bay, Dubai, U.A.E.
              </span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full bg-whit shadow-l rounded-md lg:w-1/2 mt-10 md:mt-0   space-y-4">
          <QueryForm />
        </div>
      </div>
    </section>
  );
}
