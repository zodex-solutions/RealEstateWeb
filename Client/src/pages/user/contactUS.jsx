import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaLinkedin,
  FaYoutube,
  FaXing,
  FaTiktok,
} from "react-icons/fa";
import QueryForm from "../../components/user/QueryForm";
import bannerimage from "../../assets/bannerimage.png";
import { BsWhatsapp } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io5";
import { RiWhatsappFill } from "react-icons/ri";
import ContactQueryForm from "../../components/user/ContactQueryForm";
import { Helmet } from "react-helmet";

const ContactUs = () => {
  return (
    <div className="bg-white text-black min-h-screen flex flex-col items-center overflo">
      <Helmet>
        <title>Contact Us | DNS RealEstate Dubai</title>
        <meta
          name="description"
          content="Get in touch with DNS RealEstate for expert guidance on Dubai property buying, selling, or investment. We're here to help you with all your real estate needs."
        />
        <link rel="canonical" href="https://dnsdxb.com/contact-us" />
      </Helmet>

      <section className="relative w-full lg:mb-10 md:mb-10 bg-gradient-to-b py-10 -mt-3 from-[#2e0e0f] to-[#241c2c] text-white min-h-[350px] flex items-center justify-center">
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-60 z-10 "></div>
        <img
          src={bannerimage}
          alt="Handshake"
          className="absolute inset-0 w-full h-full object-cover z-0 "
        />
        <div className="relative z-20 text-center max-w-7xl px-4">
          <h1 className="heading text-[#fff] mb-6">
            Contact Us - DNS Real Estate
          </h1>
          <p className=" leading-relaxed mb-8 max-w-4xl ">
            Have questions or need guidance? Reach out to DNS Real Estate — our
            experienced team is here to assist you with property inquiries,
            investment advice, or any real estate services you need.
          </p>
        </div>
      </section>

      <div className="max-w-[1320px]    mx-auto grid xl:grid-cols-[35vw_1fr] lg:grid-cols-[35vw_1fr] grid-cols-1  lg:mb-10 md:mb-10  md:px-5 lg:px-5 fle flex-col lg:flex-row gap-5 w-full">
        <div className="w-full ">
          <div className="w-full  min-w-[35vw]  top-20 lg:w- flex flex-col justify-between lg:bg-gray-100 md: bg-gray-100  p-6 lg:rounded-lg md:rounded-lg md:shadow-md lg:shadow-md">
            <div className="">
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <FaPhone className="text-[#2f5fa7] text-xl" />
                </div>{" "}
                <span className="!text-lg">+971-527186972</span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div>
                  <RiWhatsappFill className="text-[#2f5fa7] text-[22px]" />
                </div>
                <a
                  href="https://wa.me/971527186972"
                  className="!text-lg text-[#2f5fa7] underline"
                >
                  WhatsApp: +971-527186972
                </a>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div>
                  <FaEnvelope className="text-[#2f5fa7] text-xl" />
                </div>{" "}
                <a
                  href="mailto:inquiry@dnsdxb.com"
                  className="!text-lg text-[#2f5fa7] underline"
                >
                  inquiry@dnsdxb.com
                </a>
              </div>

              <div className="flex items-start  gap-4 mb-4">
                <div>
                  <FaMapMarkerAlt className="text-[#2f5fa7] !text-[22px] mt-1" />
                </div>
                <span className="!text-lg">
                  DNS Real Estate LLC, 2503-022, 25th Floor, IRIS Bay, Business
                  Bay, Dubai, UAE
                </span>
              </div>
            </div>
            <div className="mt-20 flex flex-wrap gap-4 justify-end">
              <a
                target="_black"
                href="https://www.facebook.com/share/166V9h7bXp/?mibextid=LQQJ4d"
                className=" text-2xl !text-[#2f5fa7]"
              >
                <FaFacebook />
              </a>
              <a
                target="_black"
                href="https://www.instagram.com/dns.realestate?igsh=dWdzaDRnc29qcnR0"
                className="  text-2xl !text-[#2f5fa7]"
              >
                <FaInstagram />
              </a>
              {/* <a href="#" className=" text-2xl !text-[#2f5fa7]">
                      <FaPinterest />
                      </a> */}
              <a
                target="_black"
                href="https://www.linkedin.com/company/dns-real-estate-l-l-c/"
                className=" text-2xl !text-[#2f5fa7]"
              >
                <FaLinkedin />
              </a>
              <a href="#" className=" text-2xl !text-[#2f5fa7]">
                <FaYoutube />
              </a>
              {/* <a href="#" className=" text-2xl !text-[#2f5fa7]">
                      <FaXing />
                      </a> */}
              <a
                target="_black"
                href="https://www.tiktok.com/@dns.realestate?_t=ZS-8vWcpjI1qbK&_r=1"
                className=" text-2xl !text-[#2f5fa7]"
              >
                <FaTiktok size={22} />
              </a>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-  rounded-lg shadow-md">
          <ContactQueryForm />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
