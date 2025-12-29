import React, { useEffect, useMemo, useRef, useState } from "react";
import main from "../../assets/main.png";
import image1 from "../../assets/image1.png";
import map from "../../assets/pmap.png";
import image3 from "../../assets/image3.png";
import { IoIosMail } from "react-icons/io";
import { FaCalendarAlt, FaChevronLeft } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io";
import PropertyCard from "../../components/user/propertyCard";
import QR from "../../assets/QR.png";
import Slider from "react-slick";
import property from "../../assets/property.png";
import user from "../../assets/user.png";
import plane from "../../assets/planee.png";
import WhatsApp from "../../assets/whatsapp.png";
import download from "../../assets/download.png";
import share from "../../assets/Share.png";
import Cal from "../../assets/Calendar.png";
import { FcLock } from "react-icons/fc";
import axios from "axios";
import config from "../../common/config";
import { useParams } from "react-router";
import TimeSlotSelector from "../../components/user/timeSlots";
import Calendar from "react-calendar";
import "leaflet/dist/leaflet.css";
import dns from "./../../assets/dns.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import html2pdf from "html2pdf.js";

// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   LayersControl,
//   ZoomControl,
// } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Star, X } from "lucide-react";

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import PreBookForm from "../../components/user/PreBookForm";
import LottieImageCompo from "../../components/common/LottieImages";
import { LuExpand } from "react-icons/lu";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import MapComponent from "../../components/user/mapComponent";
import PriceDisplay from "../../components/common/display";
import DownloadBrochureForm from "../../components/user/downloadForm";
import PropertyROICalculator from "../../components/user/calculator";
import MortgageCalculator from "../../components/user/mortageCalc";
import { Helmet } from "react-helmet";
// Fix for missing default icon in production
const customMarker = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const defaultCenter = {
  lat: 25.2048,
  lng: 55.2708, // Dubai
};
const containerStyle = {
  height: "400px",
  width: "100%",
  borderRadius: "5px",
  zIndex: 0,
  position: "relative",
};
const PropertyPerticular = () => {
  // const { BaseLayer } = LayersControl;
  const [isOpenDownloadDialog, setIsOpenDownloadDialog] = useState(null);

  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      // {
      //   breakpoint: 2560,
      //   settings: {
      //     slidesToShow: 3,
      //     slidesToScroll: 1,
      //   },
      // },
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 1122,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const ImageSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const ImageSettingsVertical = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
        },
      },
    ],
  };
  const [properties, setProperties] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenImageModel, setIsOpenImageModel] = useState(false);
  const [isOpenVideoModel, setIsOpenVideoModel] = useState(false);
  const [value, setValue] = useState(new Date());

  // console.log(properties);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/api/property`);
        setProperties(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProperties();
  }, []);

  const [propertyData, setPropertyData] = useState(null);
  const [propertyStatus, setPropertyStatus] = useState(null); // Store property type data

  // console.log("propertyData :", propertyData);

  const propertyStatusId = propertyData?.property_status; // En

  useEffect(() => {
    if (!propertyStatusId) return; // Prevent API call if propertyTypeId is undefined

    const fetchPropertyStatus = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/api/property-status/${propertyStatusId}`
        );
        // console.log("Property Status Data:", response.data.data);
        setPropertyStatus(response.data.data); // Store fetched property type
      } catch (error) {
        console.error(
          "Error fetching property type:",
          error.response?.data || error.message
        );
      }
    };

    fetchPropertyStatus();
  }, [propertyStatusId]);

  const [propertyType, setPropertyType] = useState(null); // Store property type data

  const propertyTypeId = propertyData?.property_type; // En

  useEffect(() => {
    if (!propertyTypeId) return; // Prevent API call if propertyTypeId is undefined

    const fetchPropertyType = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/api/property-type/${propertyTypeId}`
        );
        // console.log("Property Type Data:", response.data.data);
        setPropertyType(response.data.data); // Store fetched property type
      } catch (error) {
        console.error(
          "Error fetching property type:",
          error.response?.data || error.message
        );
      }
    };

    fetchPropertyType();
  }, [propertyTypeId]);

  const { seoTitle } = useParams();

  const [selectedConsultant, setSelectedConsultant] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (propertyData?.consultant) {
      setLoading(true);
      axios
        .get(`${config.API_URL}/api/consultant/${propertyData.consultant}`)
        .then((response) => {
          setSelectedConsultant(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error fetching consultant details:", error);
          setSelectedConsultant(null);
          setLoading(false);
        });
    } else {
      setSelectedConsultant(null);
    }
  }, [propertyData?.consultant]);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/api/property/seo/${seoTitle}`
        );
        setPropertyData(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPropertyData();
  }, [seoTitle]);

  const [isOpenMapModel, setIsOpenMapModel] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % propertyData.image.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [propertyData ? propertyData.image.length : ""]);

  const subject = "Your Subject Here";
  const body = "Hello, I would like to discuss...";

  const mapStyles = {
    height: "400px",
    width: "100%",
    borderRadius: "x", // Adjust this for rounded corners
    overflow: "hidden", // Ensures the border radius is applied properly
  };

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 800) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [propertyId, setPropertyId] = useState("");

  console.log("propertyId1", propertyId);
  useEffect(() => {
    if (isSubmitted === true && isOpen === true) {
      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
      }, 2000);
    } else if (isSubmitted === true && isOpenDownloadDialog === true) {
      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpenDownloadDialog(false);
      }, 2000);
    }
  }, [isSubmitted, isOpenDownloadDialog]);

  const imageList = propertyData?.image?.length
    ? propertyData.image.filter((item) => !item.image.endsWith(".mp4"))
    : [];

  const videoItem = propertyData?.image?.length
    ? propertyData.image.filter((item) => item.image.endsWith(".mp4"))
    : [];

  // console.log("video", videoItem);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          text: "I found something cool you should see!",
          url: window.location.href, // or any URL you want to share
        });
      } catch (err) {
        console.error("Sharing failed:", err);
      }
    } else {
      alert("Share not supported in this browser.");
    }
  };

  const pdfRef = useRef();

  const handleDownloadPDF = () => {
    const element = pdfRef.current;
    const opt = {
      margin: 0.3,
      filename: "property-details.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  // if (propertyData) {
  //   const youtubeEmbedLink = propertyData?.video.replace("watch?v=", "embed/");
  // }

  const shuffledImages = useMemo(() => {
    if (propertyData?.image?.length) {
      return [...propertyData.image]
        .filter((img) => img.image)
        .sort(() => 0.3 - Math.random());
    }
    return [];
  }, [propertyData?.image]);

  const shuffledImages2 = useMemo(() => {
    if (propertyData?.image?.length) {
      return [...propertyData.image]
        .filter((img) => img.image)
        .sort(() => 0.2 - Math.random());
    }
    return [];
  }, [propertyData?.image]);

  // Google map
  const [selected, setSelected] = useState(null);

  // console.log("selected", selected);
  const handleMarkerClick = () => {
    setSelected({ label: "Dubai", ...defaultCenter });
  };

  const defaultCenter = {
    lat: propertyData?.latitude,
    lng: propertyData?.longitude,
  };

  // ======================
  const [propertyPrice, setPropertyPrice] = useState();
  const [deposit, setDeposit] = useState();
  const [mortgagePeriod, setMortgagePeriod] = useState();
  const [interestRate, setInterestRate] = useState();
  const [netRent, setNetRent] = useState(null);
  const [netROI, setNetROI] = useState(null);

  const calculate = () => {
    const loanAmount = propertyPrice - deposit;
    const annualInterestRate = interestRate / 100;
    const years = mortgagePeriod;

    // Simple annual mortgage payment calculation
    const monthlyInterest = annualInterestRate / 12;
    const numberOfPayments = years * 12;

    // Using mortgage formula: M = P[r(1+r)^n]/[(1+r)^n – 1]
    const monthlyPayment =
      (loanAmount *
        monthlyInterest *
        Math.pow(1 + monthlyInterest, numberOfPayments)) /
      (Math.pow(1 + monthlyInterest, numberOfPayments) - 1);

    const annualPayment = monthlyPayment * 12;

    // For Net Rent, let's assume a rental yield of 6% of property price (you can change logic)
    const estimatedNetRent = propertyPrice * 0.06;

    // Net ROI = (Net Rent / Property Price) * 100
    const estimatedNetROI = (estimatedNetRent / propertyPrice) * 100;

    setNetRent(estimatedNetRent.toFixed(2));
    setNetROI(estimatedNetROI.toFixed(2));
  };

  return (
    <section className=" -mt-5">
      <Helmet>
        <title>{propertyData?.seo_title}</title>
        <meta name="description" content={propertyData?.description} />
        <link
          rel="canonical"
          href={`https://dnsdxb.com/property/${propertyData?.seo_title}`}
        />
      </Helmet>
      {propertyData ? (
        <div className="max-w-[1320px mx-auto ">
          <div className="text-gray-500 lg:!text-sm md:!text-sm !text-[10px] lg:mt-7  md:mt-7 -my-3 lg:px-8 md:px-8 px-5 mb-2">
            <a href="/listing" className="hover:underline">
              Back to Listing
            </a>{" "}
            &gt; Property for &gt; {propertyStatus?.title} &gt;{" "}
            {propertyData?.title}
          </div>
          <div className="lg:grid hidden grid-cols-1 lg:grid-cols-[60vw_1fr] xl:gap-4 lg:gap-4 md:gap-2 gap-2 lg:px-8 md:px-8 px-5">
            <div className="h-full" onClick={() => setIsOpenImageModel(true)}>
              <img
                src={imageList[index % imageList.length]?.image}
                className="w-full h-full object-cover rounded-[5px] transition-opacity duration-500"
                alt="Property"
              />
            </div>

            <div className="grid grid-rows-2 gap-2 h-full">
              {propertyData?.video ? (
                <div className="w-full h-[300px] md:h-[315px] rounded-[5px] overflow-hidden">
                  <iframe
                    width="100%"
                    height="315"
                    src={`${propertyData?.video}?autoplay=1&mute=1&loop=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <img
                  src={imageList[(index + 1) % imageList.length]?.image}
                  className="w-full h-full object-cover rounded-[5px] transition-opacity duration-500"
                  alt="Property"
                />
              )}

              <img
                src={imageList[(index + 2) % imageList.length]?.image}
                className="w-full h-full object-cover rounded-[5px] transition-opacity duration-500"
                alt="Property"
              />
            </div>
          </div>

          <div className="lg:hidden grid grid-cols-1 lg:grid-cols-[60vw_1fr] xl:gap-4 lg:gap-4  md:gap-2  gap-2 lg:px-8 md:px-8 px-5">
            <div
              onClick={() => setIsOpenImageModel(true)}
              className="overflow-hidden"
            >
              <img
                src={imageList[index % imageList.length]?.image}
                className="w-full h-auto  md:h-full object-cover rounded-[5px] hideImage"
              />
            </div>

            <span></span>

            <div className="overflow-hidden ImagePri grid lg:grid-cols-2 md:grid-cols-2 grid-cols-2 gap-2">
              <div
                onClick={() => setIsOpenImageModel(true)}
                className=" -mr-[1.5%] h-[70% overflow-hidden horizontalImageConPro"
              >
                <Slider {...ImageSettings}>
                  {shuffledImages2.map((img, index) => (
                    <div
                      className={
                        "slick-slid  outline-none h-[70%  rounded-[5px] overflow-hidden"
                      }
                    >
                      <img
                        key={img._id}
                        src={img.image}
                        alt="Gallery"
                        className="w-[97%] lg:h-[24vw] md:h-[24vw] sm:h-[24vw] bannerImagePer object-cover rounded-[5px]"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="w-full  w-[97%] lg:h-[24vw] md:h-[24vw] sm:h-[24vw] bannerImagePer rounded-[5px] overflow-hidden">
                {propertyData?.video ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`${propertyData?.video}?autoplay=1&mute=1&loop=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div
                    onClick={() => setIsOpenImageModel(true)}
                    className=" -mr-[1.5%] h-[70% overflow-hidden horizontalImageConPro"
                  >
                    <Slider {...ImageSettings}>
                      {shuffledImages.map((img, index) => (
                        <div
                          key={img._id}
                          className="slick-slide outline-none h-[70%] rounded-[5px] overflow-hidden"
                        >
                          <img
                            src={img.image}
                            alt="Gallery"
                            className="w-[97%] lg:h-[24vw] md:h-[24vw] sm:h-[24vw] bannerImagePer object-cover rounded-[5px]"
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* lg:px-8 md:px-8 px-5 */}
          <div className="grid lg:mt-10 mt-3 PerticularDat lg:grid-cols-[60%_1fr] lg:px-8 md:px-8 px-5  sm:grid-cols-1 grid-cols-1 lg:mb-10 md:mb-10 mb-5  gap-5">
            <div className="overflow-y-scrol h-full ">
              <div className="bg-white  lg:shadow-xl md:shadow-xl sm:shadow-xl  lg:p-5 md:p-5 sm:p-5 rounded-lg ">
                <h2 className="text-[22px] font-bold">{propertyData.title}</h2>
                <div
                  className="text-[14px] mt-2"
                  dangerouslySetInnerHTML={{ __html: propertyData.description }}
                />
                <div className="border-b-2 border-[#7A9DC4] my-4"></div>
                <h2 className="subheading">Amenities</h2>
                <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-1 mb-6">
                  {propertyData.amenities.map((ani, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-betwee gap-2 mt-2 text-[14px]"
                      >
                        <LottieImageCompo
                          url={ani.amenities_img}
                          alt={ani.title}
                          className="lg:h-10 md:h-8 h-7"
                        />

                        <p className="text-[15px] font-medium leading-[1]">
                          {ani.title}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="border-b-2 border-[#7A9DC4] my-4"></div>

                <h2 className="subheading mb-4">Near By</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2">
                  {propertyData.near_by.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-2 mb-2 "
                      >
                        {/* <img
                            src={item.near_by_img}
                            className="lg:w-12 md:h-10 md:w-10 lg:h-12 w-9 h-9"
                          /> */}
                        <LottieImageCompo
                          url={item.near_by_img}
                          alt={item.title}
                          className="lg:w-12 md:h-10 md:w-10 lg:h-12 w-9 h-9"
                        />
                        <div>
                          <h3 className="font-bold lg:text-md md:text-md text-sm leading-[1.2] mb-[1px]">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 lg:text-md md:text-md text-sm leading-[1.1]">
                            Distance: {item.sub_title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <div
                    className="rendered-content  mt-5 mb-5"
                    dangerouslySetInnerHTML={{
                      __html: propertyData.table_content,
                    }}
                  />
                </div>
                <div className="border-b-2 border-[#7A9DC4] my-5"></div>
                <h2 className="subheading">Location</h2>
                <p className="text-[14px] mt-1">
                  {/* FIVE Palm Jumeirah, Palm Jumeirah, Dubai */}
                </p>
                {/* Map */}
                <MapComponent
                  propertyData={propertyData}
                  long={propertyData?.longitude}
                  lat={propertyData?.latitude}
                />

                <div className="border-b-2 border-[#7A9DC4] my-5"></div>

                {/* <MortgageCalculator /> */}
                <PropertyROICalculator price={propertyData?.price} />

                {/* <div className="">
                  <h2 className="subheading pb-3">Mortgage Calculator</h2>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex flex-col max-w-[130px]">
                      <label className="text-sm text-gray-600 mb-1">
                        Property Price
                      </label>
                      <div className="flex gap-2 items-center border border-gray-300 rounded-md px-3 py-2">
                        <input
                          type="number"
                          value={propertyPrice}
                          onChange={(e) =>
                            setPropertyPrice(Number(e.target.value))
                          }
                          className="w-full outline-none bg-transparent"
                        />
                        <span className="text-gray-500">AED</span>
                      </div>
                    </div>

                    <div className="flex flex-col max-w-[130px]">
                      <label className="text-sm text-gray-600 mb-1">
                        Deposit
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                        <input
                          type="number"
                          value={deposit}
                          onChange={(e) => setDeposit(Number(e.target.value))}
                          className="w-full outline-none bg-transparent"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col max-w-[130px]">
                      <label className="text-sm text-gray-600 mb-1">
                        Mortgage Period
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                        <input
                          type="number"
                          value={mortgagePeriod}
                          onChange={(e) =>
                            setMortgagePeriod(Number(e.target.value))
                          }
                          className="w-full outline-none bg-transparent"
                        />
                        <span className="text-gray-500">Years</span>
                      </div>
                    </div>

                    <div className="flex flex-col max-w-[130px]">
                      <label className="text-sm text-gray-600 mb-1">
                        Interest Rate
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                        <input
                          type="number"
                          value={interestRate}
                          onChange={(e) =>
                            setInterestRate(Number(e.target.value))
                          }
                          className="w-full outline-none bg-transparent"
                        />
                        <span className="text-gray-500">%</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex justify-between flex-wrap items-center gap-5">
                    <div className="flex justify-between gap-10">
                      <div>
                        <p className="text-gray-600 text-[14px]">Net Rent</p>
                        <p className="text-[16px]">
                          {netRent !== null ? `AED ${netRent}` : "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-[14px]">NET ROI</p>
                        <p className="text-[16px]">
                          {netROI !== null ? `${netROI}%` : "—"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={calculate}
                        className="!bg-[#7A9DC4] text-white !text-[15px] !px-8 !w-[243px] h-[38px] !py-0 !rounded-[5px] md:w-auto"
                      >
                        Get pre-approve
                      </button>
                    </div>
                  </div>
                </div> */}

                {/*  DLD Permit : */}
                <div className="border-b-2 border-[#7A9DC4] my-5"></div>
                <div className="flex items-center gap-5">
                  <img src={propertyData.old_permit_image} className="h-20" />
                  <div>
                    <h2 className="lg:text-[18px] md:text-[18px] sm:text-[14px] text-[14px] font-semibold">
                      DLD Permit Number:
                    </h2>
                    <p className="lg:text-[15px] md:text-[15px] sm:text-[13px] text-[13px] font-light">
                      {propertyData.old_permit_number}
                    </p>
                    <div
                      className="lg:text-[13px] md:text-[13px] sm:text-[11px] text-[10px] font-light"
                      dangerouslySetInnerHTML={{
                        __html: propertyData.old_permit_description,
                      }}
                    />
                  </div>
                </div>

                {properties.length > 1 && (
                  <h2 className={` subheading mt-6  cursor-pointer`}>
                    Other properties that may interest you
                  </h2>
                )}

                <div className=" mb-5  mt-3 -mr-4 my-3  bg-white mx- relative overflow-hidden">
                  <Slider {...settings}>
                    {properties?.length > 1 &&
                      properties.map((pro) => (
                        <div key={pro.id} className={`slick-slide my-4`}>
                          <div className="pr-4">
                            <PropertyCard
                              {...pro}
                              setIsOpen={setIsOpen}
                              setPropertyId={setPropertyId}
                              setIsSubmitted={setIsSubmitted}
                            />
                          </div>
                        </div>
                      ))}
                  </Slider>
                </div>
              </div>
            </div>

            <div className="relative overflow-y-hidde ">
              <div
                className={`${
                  isFixed ? "lg:fixed top-[80px] lg:max-w-[37.5%] right-8" : ""
                } w-full `}
              >
                <div
                  className={` ml-[5px] bg-white lg:shadow-xl md:shadow-xl sm:shadow-xl  lg:p-5 md:p-5 sm:p-5 rounded-lg  w-full  mx-auto  space-y-3`}
                >
                  <div className="grid grid-cols-2 gap-4 border-b-2 border-[#7A9DC4] pb-3">
                    <div>
                      <h4 className="font-bold lg:text-[15px] md:text-[15px] sm:text-[13px] text-[12px]">
                        REFERENCE NUMBER
                      </h4>
                      <p className="text-gray-700 lg:text-[15px] md:text-[15px] sm:text-[13px] text-[12px]">
                        {propertyData.refernce_number}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold lg:text-[15px] md:text-[15px] sm:text-[13px] text-[12px]">
                        PERMIT NUMBER
                      </h4>
                      <p className="text-gray-700 lg:text-[15px] md:text-[15px] sm:text-[13px] text-[12px]">
                        {propertyData.permit_number}
                      </p>
                    </div>
                  </div>

                  {/* Property Status & Type */}
                  <div className="grid grid-cols-2 gap-4 border-b-2 border-[#7A9DC4] pb-3">
                    <div>
                      <h4 className="font-bold lg:text-[15px] md:text-[15px] sm:text-[13px] text-[12px]">
                        PROPERTY STATUS
                      </h4>
                      <p className="text-gray-700 lg:text-[15px] md:text-[15px] sm:text-[13px] text-[12px]">
                        {propertyStatus ? propertyStatus.title : " "}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold lg:text-[15px] md:text-[15px] sm:text-[13px] text-[12px]">
                        PROPERTY TYPE
                      </h4>
                      <p className="text-gray-700 lg:text-[15px] md:text-[15px] sm:text-[13px] text-[12px]">
                        {propertyType ? propertyType.title : " "}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="pb-5 border-b-2 border-[#7A9DC4]">
                    <h4 className="font-bold">Features</h4>
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 text-gray-700 text-sm mt-2 gap-2">
                      {propertyData.features.map((ani, index) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-betwee gap-2 mt-2 text-[14px]"
                          >
                            <div className="h-7 w-10 flex items-center justify-center">
                              <LottieImageCompo
                                url={ani.features_img}
                                alt={ani.title}
                                className="lg:h-10 md:h-8 h-7"
                              />
                            </div>
                            <p className=" font-medium leading-[1.2]">
                              {ani.title}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="pb-3 border-b-2 gap-5 border-[#7A9DC4] flex justify-between items-center">
                    <h4 className="font-bold flex-[.5px] lg:text-[18px] md:text-[18px] sm:text-[16px] text-[15px] ">
                      PRICE
                    </h4>
                    <div className="flex-[.5px]">
                      <PriceDisplay
                        amount={propertyData?.price
                          ?.toString()
                          .replace(/,/g, "")}
                        css=" font- text-black "
                      />
                    </div>
                  </div>

                  <div className="flex justify-between gap-3 flex-wrap">
                    {selectedConsultant ? (
                      <div className="flex w-ful items-center gap-4 ">
                        <img
                          src={selectedConsultant.profile_pic}
                          alt={selectedConsultant.name}
                          className="lg:h-[75px] md:h-[75px] sm:h-[62px] h-[62px]"
                        />
                        <div>
                          <h3 className="lg:text-[18px] md:text-[18px] sm:text-[16px] text-[15px] font-semibold">
                            {selectedConsultant.name}
                          </h3>
                          <div
                            className="lg:text-[13px] md:text-[13px] sm:text-[11px] text-[10px] "
                            dangerouslySetInnerHTML={{
                              __html: selectedConsultant.description,
                            }}
                          />
                          <p className="lg:text-[13px] md:text-[13px] sm:text-[11px] text-[10px] ">
                            <b>Languages:</b> {selectedConsultant.language}
                          </p>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* Action Buttons */}
                    {selectedConsultant ? (
                      <div className="flex lg:flex-col md:flex-col sm:flex-col gap-2 items-center">
                        <a
                          href={`tel:${selectedConsultant?.phone}`}
                          className="!bg-[#7A9DC4] gap-1 lg:text-lg md:text-lg sm:text-md text-sm lg:h-[38px] lg:w-[108px] md:h-[38px] md:w-[108px] h-[30px] w-[80px] !text-white py-2 rounded-md flex items-center justify-center"
                        >
                          Call <IoIosCall className="text-xl" />
                        </a>

                        <a
                          href={`mailto:${
                            selectedConsultant?.email
                          }?subject=${encodeURIComponent(
                            subject
                          )}&body=${encodeURIComponent(body)}`}
                          className="!bg-[#7A9DC4] lg:text-lg md:text-lg sm:text-md text-sm  gap-1 lg:h-[38px] lg:w-[108px] md:h-[38px] md:w-[108px] h-[30px] w-[80px] !text-white py-2 rounded-md flex items-center justify-center"
                        >
                          Email <IoIosMail className="text-xl" />
                        </a>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <div>
                    <a
                      onClick={() => setIsOpenDownloadDialog(true)}
                      className="cursor-pointer lg:!p-2 md:!p-2 p-2 border border-gray-100 lg:h-[49px] md:h-[45px] sm:h-[40px] h-[35px] !bg-white shadow-md rounded-lg flex items-center justify-center"
                    >
                      <img
                        src={download}
                        className="lg:h-7 md:h-7 h-5"
                        alt="Download"
                      />
                    </a>
                    {/* <div ref={pdfRef}></div> */}
                  </div>

                  <a
                    onClick={() => setIsOpen(true)}
                    className="!p-  lg:!px-5 md:!px-6 px-3 border border-gray-100 lg:h-[49px] md:h-[45px] sm:h-[40px] h-[35px] !bg-white shadow-md rounded-lg flex items-center gap-2"
                  >
                    <span className="text-black  lg:!text-[14px] md:!text-[14px] !text-[12px] font-medium">
                      Book a Viewing
                    </span>
                    <img src={Cal} className="lg:h-7 md:h-7 h-5" />
                  </a>

                  <a
                    onClick={handleShare}
                    className="!p-2 lg:!px-6 border border-gray-100 md:!px-10 lg:h-[49px] md:h-[45px] sm:h-[40px] h-[35px] !bg-white shadow-md rounded-lg flex items-center justify-center"
                  >
                    <img
                      src={share}
                      className="lg:h-12 md:h-12 h-9"
                      alt="Share"
                    />
                  </a>
                  {selectedConsultant && (
                    <a
                      href={`https://wa.me/${selectedConsultant?.country_code}${selectedConsultant?.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="!p-2  lg:!px-6 border border-gray-100 md:!px-6 hover:outline-[#2f5fa7] outline outline-transparent lg:h-[49px] md:h-[45px] sm:h-[40px] h-[35px] !bg-white shadow-md cursor-pointer hover:scale-[101%] !rounded-[5px] flex items-center gap-2"
                    >
                      <span className="text-black lg:!text-[14px] md:!text-[14px] !text-[12px] lg:flex md:flex sm:flex hidden font-medium">
                        WhatsApp
                      </span>
                      <img
                        src={WhatsApp}
                        alt="WhatsApp Icon"
                        className="lg:!h-7 md:!h-7 !h-5"
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {isOpenDownloadDialog && (
            <div className="fixed inset-0  flex justify-center items-center ">
              {!isSubmitted ? (
                <div className="bg-white mx-3 relative dateDialog lg:max-w-[800px md:max-w-[750px w-ful sm:max-w-[500px overflow-scroll rounded-lg shadow-lg lg:px-5 lg:pb-5 md:pb-5 md:px-5 sm:pb-3 pb-3 px-3  sm:px-3 z-20 mt-20 relative">
                  <div
                    className="absolute  pt-7 pb-5  -top-2 right-2 w-full  text-black   flex items-center justify-between h-6 "
                    onClick={() => setIsOpenDownloadDialog(false)}
                  >
                    <span />
                    <X className="!bg-[#2f5fa7] cursor-pointer hover:scale-115 transition-all duration-300   rounded-md !text-white " />
                  </div>
                  <DownloadBrochureForm
                    setIsSubmitted={setIsSubmitted}
                    seoTitle={seoTitle}
                  />
                </div>
              ) : (
                <div className="bg-white flex flex-col justify-center items-center py-10 px-14 shadow-lg z-50 rounded-[5px]">
                  <img src={dns} alt="logo" className="w-32 h-auto" />
                  <p className="text-center font-bold text-5xl mb-3">
                    Thank you!{" "}
                  </p>
                  <p className="text-center font-meduim text-lg">
                    Your request has been submitted.
                  </p>
                  <p className="text-center font-medium text-xl">
                    We will reach you as soon as possible
                  </p>
                </div>
              )}
              {isOpenDownloadDialog ? (
                <div
                  onClick={() => setIsOpenDownloadDialog(false)}
                  className="bg-[rgba(0,0,0,0.6)] bg-opacity0   fixed top-0 right-0 left-0 bottom-0 z-10"
                ></div>
              ) : (
                ""
              )}
            </div>
          )}

          {/* Modal */}
          {isOpen && (
            <div className="fixed inset-0  flex justify-center items-center ">
              {!isSubmitted ? (
                <div className="bg-white h-ful  dateDialog lg:max-w-[800px] md:max-w-[750px] w-full sm:max-w-[500px] overflow-scroll rounded-lg shadow-lg lg:px-5 lg:pb-5 md:pb-5 md:px-5 sm:pb-3 pb-3 px-3  sm:px-3 z-20 mt-20 relative">
                  <div
                    className="fixed cancelButto lg:max-w-[760px] pt-7 pb-5 md:max-w-[715px] sm:max-w-[470px] max-w-[95vw]     w-full  text-black   flex items-center justify-between h-6 "
                    onClick={() => setIsOpen(false)}
                  >
                    <span />
                    <X className="!bg-[#2f5fa7] cursor-pointer hover:scale-115 transition-all duration-300   rounded-md !text-white " />
                  </div>
                  <PreBookForm
                    id={propertyData?._id}
                    setIsSubmitted={setIsSubmitted}
                  />
                </div>
              ) : (
                <div className="bg-white flex flex-col justify-center items-center py-10 px-14 shadow-lg z-50 rounded-[5px]">
                  <img src={dns} alt="logo" className="w-32 h-auto" />
                  <p className="text-center font-bold text-5xl mb-3">
                    Thank you!{" "}
                  </p>
                  <p className="text-center font-meduim text-lg">
                    Your request has been submitted.
                  </p>
                  <p className="text-center font-medium text-xl">
                    We will reach you as soon as possible
                  </p>
                </div>
              )}
              {isOpen ? (
                <div
                  onClick={() => setIsOpen(false)}
                  className="bg-[rgba(0,0,0,0.6)] bg-opacity0   fixed top-0 right-0 left-0 bottom-0 z-10"
                ></div>
              ) : (
                ""
              )}
            </div>
          )}

          {isOpenImageModel && (
            <div className="fixed inset-0   lg:flex md:flex flex sm:flex justify-center items-center ">
              <div className="bg-white mx-4 overflow-hidden  dateDialog max-w-[780px]   rounded-lg shadow-lg z-20 mt-20 relative">
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  effect="slide"
                  fadeEffect={{ crossFade: true }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  navigation={true}
                  modules={[Navigation, Pagination, Autoplay, EffectFade]}
                  className="w-[100%] h-[100%"
                >
                  {imageList?.length > 0 ? (
                    imageList.map((img, index) => (
                      <SwiperSlide key={index} className="relative pb-5">
                        <img
                          src={img.image}
                          alt={`Banner ${index + 1}`}
                          className="w-[100%] rounded transition-opacity object-cover duration-1000 ease-in-out lg:pb-3 md:pb-2 sm:pb-2 pb-3"
                        />
                      </SwiperSlide>
                    ))
                  ) : (
                    <p className="text-center text-gray-400">
                      No images available
                    </p>
                  )}
                </Swiper>

                <div className="flex justify-end gap-2 ">
                  <div
                    className="absolute !z-50 bg-[rgba(255,255,255,0.7)] top-2 right-2  cursor-pointer hover:scale-115 transition-all duration-300   !text-gray-700 rounded-md !hover:bg-gray-400"
                    onClick={() => setIsOpenImageModel(false)}
                  >
                    <X />
                  </div>
                </div>
              </div>

              {isOpenImageModel ? (
                <div
                  onClick={() => setIsOpenImageModel(false)}
                  className="bg-[rgba(0,0,0,0.6)] bg-opacity0   fixed top-0 right-0 left-0 bottom-0 z-10"
                ></div>
              ) : (
                ""
              )}
            </div>
          )}

          {isOpenVideoModel && (
            <div className="fixed inset-0  lg:flex md:flex hidden sm:flex justify-center items-center ">
              <div className="bg-white overflow-hidden mx-5 dateDialog max-w-[780px]   rounded-lg shadow-lg z-20 mt-20 relative">
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  effect="slide"
                  fadeEffect={{ crossFade: true }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  navigation={true}
                  modules={[Navigation, Pagination, Autoplay, EffectFade]}
                  className="w-[100%] h-[100%]"
                >
                  {videoItem?.length > 0 ? (
                    videoItem.map((item, index) => (
                      <SwiperSlide key={index} className="relative pb-5">
                        <video
                          controls
                          autoPlay
                          loop
                          className="h-[100%] rounded transition-opacity object-cover duration-1000 ease-in-out lg:pb-3 md:pb-2 sm:pb-2 pb-3"
                        >
                          <source src={item.image} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </SwiperSlide>
                    ))
                  ) : (
                    <p className="text-center text-gray-400">
                      No Videos available
                    </p>
                  )}
                </Swiper>

                <div className="flex justify-end gap-2 ">
                  <div
                    className="absolute !z-50 bg-[rgba(255,255,255,0.7)] top-2 right-2  cursor-pointer hover:scale-115 transition-all duration-300   !text-gray-700 rounded-md !hover:bg-gray-400"
                    onClick={() => setIsOpenVideoModel(false)}
                  >
                    <X />
                  </div>
                </div>
              </div>

              {isOpenVideoModel ? (
                <div
                  onClick={() => setIsOpenVideoModel(false)}
                  className="bg-[rgba(0,0,0,0.6)] bg-opacity0   fixed top-0 right-0 left-0 bottom-0 z-10"
                ></div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default PropertyPerticular;
