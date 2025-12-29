import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import {
  FaChevronDown,
  FaDollarSign,
  FaItunes,
  FaLocationArrow,
  FaSearch,
} from "react-icons/fa";
import { MdOutlineTune } from "react-icons/md";
import map from "../../assets/map.png";
import { CiMenuKebab } from "react-icons/ci";
import PropertyCard from "../../components/user/propertyCard";
import { LuExpand, LuListFilter } from "react-icons/lu";
import Filter from "../../components/user/filterBar";
import PropertySmallCard from "../../components/user/propertySmallCard";
import shortProperty from "../../assets/shortProperty.png";
import axios from "axios";
import config from "../../common/config";
import PropertySearch from "../../components/user/search";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import dns from "./../../assets/dns.jpg";

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import "leaflet/dist/leaflet.css";
import { SortDesc, X } from "lucide-react";
import PreBookForm from "../../components/user/PreBookForm";
import { useParams } from "react-router";

// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   LayersControl,
//   ZoomControl,
// } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import MultiMarkerMap from "../../components/user/multiMapCompo";
import { Helmet } from "react-helmet";

// const { BaseLayer } = LayersControl;
const ListingProperties = () => {
  const sliderRef = useRef(null);
  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    // slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    // centerMode: true,
    responsive: [
      {
        breakpoint: 763,
        settings: {
          slidesToShow: 3,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 602,
        settings: {
          slidesToShow: 3,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2.5,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 402,
        settings: {
          slidesToShow: 2,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 338,
        settings: {
          slidesToShow: 2,
          centerPadding: "0",
        },
      },
    ],
  };

  const [properties, setProperties] = useState([]);
  let [updatedProperties, setUpdatedProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewestFirst, setIsNewestFirst] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeTab, setActiveTab] = useState("map");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isOpenMapModel, setIsOpenMapModel] = useState(false);

  const customMarker = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/api/property`);
        console.log("API Response:", response.data); // 🔍 Debugging
        const propertiesData = response.data.data;

        if (!Array.isArray(propertiesData)) {
          console.error("Expected an array, got:", propertiesData);
          return;
        }

        setProperties(propertiesData);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = updatedProperties.filter((property) =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return isNewestFirst ? dateB - dateA : dateA - dateB;
  });

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const [filterBar, setFilterBar] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted === true && isOpen === true) {
      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
      }, 2000);
    }
  }, [isSubmitted, isOpen]);

  const [propertyId, setPropertyId] = useState("");

  // console.log("propertyId", propertyId);

  const [removeFilter, setRemoveFilter] = useState(false);
  console.log("removeFilter", removeFilter);

  console.log("Listing properties", updatedProperties);

  const lat = parseFloat(updatedProperties?.[0]?.latitude);
  const long = parseFloat(updatedProperties?.[0]?.longitude);

  const center = {
    lat: lat, // fallback if invalid
    lng: long,
  };

  console.log("center", center);
  const center2 = {
    lat: 25.2143,
    lng: 55.3258,
  };

  if (lat && long) {
    console.log("Location ===========================", lat, long);
  }

  // const center = { lat: lat, lng: long };
  console.log(center);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const mapContainerRef = useRef();

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH(); // on load
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);

  const containerStyle = {
    width: "100%",
    height: "570px",
    borderRadius: "5px",
    zIndex: 0,
  };

  const [selected, setSelected] = useState(null);
  const mapRef = useRef(null);
  const [googleMapsObj, setGoogleMapsObj] = useState(null);

  const handleLoad = (map) => {
    mapRef.current = map;
    setGoogleMapsObj(window.google.maps); // now you can safely use it
  };

  const customIcon = googleMapsObj
    ? {
        url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // replace with your own icon if needed
        scaledSize: new googleMapsObj.Size(30, 30),
      }
    : null;

  function useScreenSize() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
  }

  const screenWidth = useScreenSize();
  return (
    <section className=" h-full  lg:pt-12 md:pt-12 !-mt-3">
      <Helmet>
        <title>Property Listings | DNS Real State</title>
        <meta
          name="description"
          content="Browse premium residential and commercial properties listed by DNS Real State. Find your dream home or investment opportunity today."
        />
        <meta
          name="keywords"
          content="real estate listings, DNS Real State properties, buy property, rent apartment, villas, commercial spaces"
        />
        <link rel="canonical" href={`https://dnsdxb.com/listing`} />
      </Helmet>

      <div className="2xl:container mx-auto lg:px-10 md:px-5">
        <div className="flex flex-wrap  lg:space-x-4 lg:space-y-4">
          <div className="ListingHeader">
            <div className="">
              <span className="!text-[12px] lg:hidden md:hidden flex items-center">
                <LuListFilter
                  onClick={() => setFilterBar(!filterBar)}
                  size={40}
                  color="#222"
                  className="lg:h-12 md:h-12 h-10  xl:hidden lg:w-9 md:w-9 w-8 xl:absolute   rounded-md   cursor-pointer"
                />
                <span className="pl-1">
                  Showing {updatedProperties.length} Results
                </span>
              </span>
              <Filter
                filterBar={filterBar}
                setFilterBar={setFilterBar}
                setUpdatedProperties={setUpdatedProperties}
                updatedProperties={updatedProperties}
                setProperties={setProperties}
                properties={properties}
              />
              <div
                onClick={() => setFilterBar(false)}
                className={`  ${
                  filterBar ? "flex" : "hidden"
                }  fixed top-0 right-0 left-0 bottom-0  z-10 h-screen`}
              ></div>

              <div className=" space-x-4 lg:flex md:flex   hidden ">
                <div className=" gap-3 flex flex-wrap relative ">
                  <PropertySearch
                    removeFilter={removeFilter}
                    DropDownMob={"pl-4 !py-2 h-[50px]"}
                    setUpdatedProperties={setUpdatedProperties}
                    updatedProperties={updatedProperties}
                    setShowDropdown={setShowDropdown}
                    showDropdown={showDropdown}
                    setActiveTab={setActiveTab}
                    activeTab={activeTab}
                    setProperties={setProperties}
                    properties={properties}
                    setIsNewestFirst={setIsNewestFirst}
                    isNewestFirst={isNewestFirst}
                    map={true}
                  />
                </div>
              </div>
            </div>
            <div className="lg:hidden  md:hidden  flex  shadow-[0px_5px_10px_rgba(0,0,0,0.1)]">
              <a
                className={`lg:px-7 lg:py-3 px-5 py-1.5 lg:text-[16px] text-[10px] flex items-center gap-3 transition-all cursor-pointer shadow-[0px_5px_10px_rgba(0,0,0,0.1)] rounded-l-md  ${
                  activeTab === "map"
                    ? "bg-[#204A7A] !text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setActiveTab("map")}
              >
                Map
              </a>
              <a
                className={`lg:px-7 lg:py-3 px-5 py-1.5 lg:text-[16px] text-[10px] flex items-center gap-3 transition-all cursor-pointer rounded-r-md shadow-[0px_5px_10px_rgba(0,0,0,0.1)] ${
                  activeTab === "list"
                    ? "bg-[#204A7A] !text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setActiveTab("list")}
              >
                List
              </a>
            </div>
          </div>
        </div>

        <div
          id="ListingItems"
          className="flex flex-1 lg:flex-row flex-col my-5 mt-16  gap-6"
        >
          <div
            className={` relative ${
              activeTab === "map" ? "lg:flex-1/3" : "lg:flex-1 -mx-5"
            }`}
          >
            <div
              className={`w-full rounded-md ${
                activeTab === "map" ? "" : "hidden"
              }`}
            >
              <MultiMarkerMap
                center={center}
                markers={updatedProperties.map((property) => ({
                  title: property.title,
                  description: property.description,
                  lat: property.latitude,
                  lng: property.longitude,
                  price: property.price,
                  location: property.location,
                  image: property.image[0]?.image,
                }))}
              />
            </div>

            <div className="absolute lg:hidden md:hidden gap-4  bottom-4 left-1/2 -translate-x-1/2 w-full  flex flex-col justify-center ">
              <div
                className={`mt-10  relative mx- ${
                  activeTab === "map" ? "" : "hidden"
                }`}
              >
                <Slider ref={sliderRef} {...settings}>
                  {updatedProperties.length > 1 &&
                    updatedProperties?.map((pro, index) => (
                      <div key={index} className="slick-slide mx-20">
                        <div className="flex">
                          <PropertySmallCard {...pro} />
                        </div>
                      </div>
                    ))}
                </Slider>
              </div>
            </div>
          </div>

          <div
            id="ListingContent"
            className={`
          ${activeTab === "map" ? "lg:flex-1/2" : "lg:w-full"}`}
          >
            <div className=" gap-3 flex ">
              <div className="bg-white border border-gray-100 w-full lg:h-12 md:h-12 sm:h-10 h-10 shadow-[0px_5px_10px_rgba(0,0,0,0.1)] flex items-center lg:gap-5 md:gap-4 gap-3 py-3 px-5 rounded-md">
                <FaSearch size={20} />
                <input
                  type="text"
                  className="!w-full flex border-none outline-none lg:text-xl md:text-lg sm:text-md text-md"
                  placeholder="Search"
                  value={searchQuery} // Ensure input reflects the current state
                  onChange={(e) => {
                    const query = e.target.value.toLowerCase();
                    setSearchQuery(query); // Update search query state

                    const filteredProperties = properties.filter((property) =>
                      property.title.toLowerCase().includes(query)
                    );

                    setUpdatedProperties(filteredProperties); // Update state properly
                  }}
                />
              </div>

              {/* Sort Button for Toggle Sorting */}
              <a
                className="bg-white px-3 py-3 lg:h-12 md:h-12 sm:h-10 h-10  flex items-center gap-3 rounded-[5px] shadow-[0px_5px_10px_rgba(0,0,0,0.1)] cursor-pointer"
                onClick={() => setIsNewestFirst(!isNewestFirst)}
              >
                <p className="lg:flex md:flex hidden">
                  {isNewestFirst ? "Newest" : "Oldest"}
                </p>
                <p>
                  <SortDesc />
                </p>
              </a>

              {/* <FaChevronDown /> */}
            </div>
            <div className="lg:flex md:flex  hidden gap-5 justify-between xl:mt-3 ml-1 lg:mt-1 ">
              <div>
                <label className="text-[26px]">Available Properties</label>
                <p className="text-[14px] font-semibold -mt-2 text-[#7A9DC3]">
                  Found: {updatedProperties.length}
                </p>
              </div>
            </div>
            <div
              style={{
                height:
                  activeTab === "map" && screenWidth >= 1024
                    ? "calc(var(--vh, 1vh) * 65)"
                    : undefined,
              }}
              className={`grid ${
                activeTab === "map"
                  ? "lg:grid-cols-2 lg:overflow-auto"
                  : "lg:grid-cols-3"
              }  md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 lg:mt-4 md:mt-4 mt-4   ListingGri  `}
            >
              {updatedProperties.length > 0 ? (
                updatedProperties.map((pro) => (
                  <div key={pro.id}>
                    <PropertyCard
                      {...pro}
                      setIsOpen={setIsOpen}
                      setPropertyId={setPropertyId}
                      setIsSubmitted={setIsSubmitted}
                    />
                  </div>
                ))
              ) : (
                <p>No Properties Available</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}

      {isOpen && (
        <div className="fixed inset-0  z-40 flex justify-center items-center ">
          {!isSubmitted ? (
            <div className="bg-white h-ful  dateDialog lg:max-w-[800px] md:max-w-[750px] w-full sm:max-w-[500px] overflow-scroll rounded-lg shadow-lg lg:px-5 lg:pb-5 md:pb-5 md:px-5 sm:pb-3 pb-3 px-3  sm:px-3 z-20 mt-20 relative">
              <div
                className="fixed cancelButto lg:max-w-[760px] pt-7 pb-5 md:max-w-[715px] sm:max-w-[470px] max-w-[95vw]     w-full  text-black   flex items-center justify-between h-6 "
                onClick={() => setIsOpen(false)}
              >
                <span />
                <X className="!bg-[#2f5fa7] cursor-pointer hover:scale-115 transition-all duration-300   rounded-md !text-white " />
              </div>
              <PreBookForm id={propertyId} setIsSubmitted={setIsSubmitted} />
            </div>
          ) : (
            <div className="bg-white flex flex-col justify-center items-center py-10 px-14 shadow-lg z-50 rounded-[5px]">
              <img src={dns} alt="logo" className="w-32 h-auto" />
              <p className="text-center font-bold text-5xl mb-3">Thank you! </p>
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

      <div
        onClick={() => setShowDropdown(false)}
        className={`${
          showDropdown ? "absolute" : " "
        }   top-0 right-0 left-0 bottom-0`}
      ></div>
    </section>
  );
};

export default ListingProperties;
