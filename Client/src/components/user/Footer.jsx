import {
  FaPhoneAlt,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaRegCopyright,
  FaTiktok,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";

// import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex } from "react-icons/fa";
import { FaLocationPin, FaTruckFast } from "react-icons/fa6";
import { ChevronUp, Locate, Map } from "lucide-react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
  FaCcDiscover,
  FaGooglePay,
  FaApplePay,
  FaStripe,
  FaCcDinersClub,
} from "react-icons/fa";
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
} from "react-icons/fa";

import whatsapp from "../../assets/wp.png";
import { use, useEffect, useState } from "react";
import config from "../../common/config";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Footer() {
  const [services, setServices] = useState([]);
  // console.log("services : ===========", services);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/api/services`);
        setServices(response.data);

        // console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchServices();
  }, []);

  const [contactDetails, setContactDetails] = useState([]);
  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/api/footer-contact`
        );
        if (response.data && response.data.data) {
          setContactDetails(response.data.data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchContactDetails();
  }, []);
  const [showTopBtn, setShowTopBtn] = useState(false);
  // const [footer, setFooter] = useState([]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const QuickLinks = [
    { title: "Developers", path: "/developers" },
    // { title: "Projects", path: "/listing" },
    // { title: "Off-Plan", path: "/off-Plan" },
    // { title: "Services", path: "/" },
    { title: "Blogs", path: "/blogs" },
    { title: "Careers", path: "/careers" },
    { title: "Privacy Policy", path: "/privacy-policy" },
    { title: "Terms & Conditions", path: "/terms&condition" },
  ];

  const AdditionalLinks = [
    { title: "About Us", path: "/about" },
    { title: "Contact Us", path: "/contact-us" },
    { title: "Buy", path: "/listing/BUY" },
    { title: "Rent", path: "/listing/RENT" },
    // { title: "Sell", path: "/listing/SELL" }, // Uncomment if needed
  ];
  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  // console.log("first =     footer --------------", contactDetails);
  const navigate = useNavigate();
  return (
    <section className="bg-[#2F5FA7] text-white pb-[20px] pt-7  ">
      <footer className="">
        {/* Service Cards */}

        <div className="max-w-7xl mx-auto px-5 ">
          <div className=" grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 place-items-center gap-3 ">
            {services.length > 0 &&
              services.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#2F5FA7] FooterServices w-full border-2 flex border-white rounded-lg items-center justify-start  p-2 gap-4 shadow-md"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <img className="h-12" src={item.image} alt={item.title} />
                      <h4 className="font-semibold text-[16px]">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-[10px]">{item.short_desc}</p>
                  </div>
                </div>
              ))}
          </div>

          {/* Footer Links */}

          <div className="fle gri grid-container  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  grid-cols-1  flex-wrap justify-between gap-8  pb-10 lg:pt-10  text-left ">
            <div className="lg:min-w-[280px] md:min-w-[280px]  pr-10 cursor-default">
              <div className="mb-4 flex items-center gap-4">
                <a className="subheading lg:min-w-[310px] md:min-w-[310px] !font-bold !text-white">
                  DNS Real Estate
                </a>
              </div>
              <p className="!text-[14px]">
                DNS Real Estate is a premier property buying and selling
                platform dedicated to helping individuals, families, and
                investors find their ideal real estate solutions with ease,
                transparency, efficiency, reliability, and expert guidance in
                every transaction.
              </p>
            </div>
            <div className="sm:ml-10  ">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <div className="border-b-2 w-[60px] border-white"></div>
              <ul className="mt-5 space-y-3.5 text-[14px] text-[#DDDDDD] list-disc list-inside">
                {QuickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      onClick={() => {
                        goTop();
                        navigate(link.path);
                      }}
                      className="!text-[#DDDDDD] cursor-pointer hover:!text-white"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="">
              <h3 className="text-lg font-semibold">Additional Links</h3>
              <div className="border-b-2 w-[72px] border-white"></div>
              <ul className="mt-5 space-y-3.5 text-[14px] text-[#DDDDDD] list-disc list-inside">
                {AdditionalLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      onClick={() => {
                        goTop();
                        navigate(link.path);
                      }}
                      className="!text-[#DDDDDD] cursor-pointer hover:!text-white"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className=" lg:w-[20vw]  md:w-[90vw]  FooterGet">
              {contactDetails && (
                <div>
                  <h3 className="text-lg font-semibold">Get In Touch</h3>
                  <div className="border-b-2 w-[60px] border-white"></div>
                  <div className="mt-5 space-y-4">
                    <p className="flex items-center gap-2 text-[14px] !text-[#DDDDDD] cursor-pointer">
                      <span>
                        <FaPhoneAlt color="white" />
                      </span>
                      <a
                        href={`tel:${contactDetails.phone}`}
                        className="hover:underline !text-[#DDDDDD] !text-[14px]"
                      >
                        {contactDetails.phone}
                      </a>
                    </p>
                    <p className="flex items-center gap-2 text-[14px] text-[#DDDDDD]">
                      <span>
                        <MdEmail size={18} color="white" />
                      </span>
                      <a
                        href={`mailto:${contactDetails.mail}`}
                        className="hover:!underline !text-[#DDDDDD] cursor-pointer !text-[14px]"
                      >
                        {contactDetails.mail}
                      </a>
                    </p>
                    <div className="">
                      <div className="flex items-start gap-2 ">
                        <span>
                          <FaMapMarkerAlt
                            color="white"
                            className="mt-[2px] !text-[19px]"
                          />
                        </span>
                        <a
                          className="flex cursor-default items-center gap-2  !text-[#DDDDDD] whitespace-wrap !text-[14px]"
                          dangerouslySetInnerHTML={{
                            __html: contactDetails.address,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Payment Methods */}

          <div className="flex flex-wrap  items-center justify-center gap-4 text-2xl my-6">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcPaypal />
            <FaCcAmex />
            <FaCcDiscover />
            <div className="bg-white rounded-[1.5px] max-h-4.5 px-[2px] flex items-center">
              <FaGooglePay className="text-[#2F5FA7]" />
            </div>
            <div className="bg-white rounded-[1.5px] max-h-4.5 px-[2px] flex items-center">
              <FaApplePay className="text-[#2F5FA7]" />
            </div>
            <div className="bg-white rounded-[1.5px] max-h-4.5 px-[2px] flex items-center">
              <FaStripe className="text-[#2F5FA7]" />
            </div>
            <FaCcDinersClub />
          </div>
        </div>

        <div className="border-b-[.5px] border-gray-100/50"></div>
        {/* Social Media */}

        <div className="mt-6 flex flex-wrap gap-4 justify-center ">
          <a
            target="_black"
            href="https://www.facebook.com/share/166V9h7bXp/?mibextid=LQQJ4d"
            className="!text-white text-2xl"
          >
            <FaFacebook />
          </a>
          <a
            target="_black"
            href="https://www.instagram.com/dns.realestate?igsh=dWdzaDRnc29qcnR0"
            className="!text-white  text-2xl"
          >
            <FaInstagram />
          </a>
          {/* <a href="#" className="!text-white text-2xl">
            <FaPinterest />
          </a> */}
          <a
            target="_black"
            href="https://www.linkedin.com/company/dns-real-estate-l-l-c/"
            className="!text-white text-2xl"
          >
            <FaLinkedin />
          </a>
          <a href="#" className="!text-white text-2xl">
            <FaYoutube />
          </a>
          {/* <a href="#" className="!text-white text-2xl">
            <FaXing />
          </a> */}
          <a
            target="_black"
            href="https://www.tiktok.com/@dns.realestate?_t=ZS-8vWcpjI1qbK&_r=1"
            className="!text-white text-2xl"
          >
            <FaTiktok size={22} />
          </a>
        </div>

        {/* Footer Bottom */}
        <p className="text-center  cursor-default flex w-[100vw] items-center justify-center gap-1 lg:text-[14px] md:text-[14px] !text-[12px] mt-6 ">
          <FaRegCopyright className="text-[13px] " />
          DNS Real Estate ⦿ All Rights Reserved.
        </p>
      </footer>

      <a
        href="https://wa.me/971527186972"
        title="Whatsapp Api Link"
        target="_black"
        className="flex justify-center !z-30 items-center lg:h-14 lg:w-14 md:h-12 md:w-12 h-10 w-10 fixed right-3.5 bottom-[14px] rounded-md cursor-pointer"
      >
        <img src={whatsapp} alt={"Whatsapp"} title="Social Icon Image" />
      </a>
    </section>
  );
}
