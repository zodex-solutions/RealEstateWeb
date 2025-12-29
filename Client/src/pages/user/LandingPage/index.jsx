import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchBar from "./searchbar";
import PropertyValuation from "./propertyValuation";
import Hero from "./hero";

import OffPlanProperty from "./BrowseoffPlanProperty";
import Features from "./featutes";
// import FAQAccordion from "./faq";
import InterestOptions from "./interestOptions";
import FAQWithForm from "./faq";
import Testimonials from "./testrimonials";
import HelpSection from "./help";
import LatestProjects from "./latestProject";
import Partners from "./partners";
import AboutUs from "./AboutUs";
import BlogSection from "./BlogSection";
import AllPropertyImages from "../../../components/user/allPropertyImages";
import config from "../../../common/config";
import axios from "axios";
import DateCompo from "../../../components/user/date";
import Divider from "../../../components/user/divider";
import LottieAnimation from "./imagejson";
import MapView from "../../../components/user/map";
import { ToastContainer } from "react-toastify";
import MapComponent from "../../../components/user/mapComponent";
import ContactUs from "./ContactUs";
import CurrencyConverter from "./currencyConverter";
// import PriceDisplay from "../../../components/common/display";
import DevImages from "./developersImages";
import { Helmet } from "react-helmet";

const LandingPage = () => {
  const [allPropertiesData, setAllPropertiesData] = useState([]);
  const [allProperties, setAllProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/api/property`);
        setAllProperties(response.data.data);
        const formattedData = response.data.data.map((property) => ({
          images: property.image.map((img) => img.image),
          seo_title: property.seo_title || "No Title",
          community: property.communities || "No Community",
          types: property.property_type.title,
          statuses: property.property_status.title,
          developer: property.developers || "No Developer",
          createdAt: property.createdAt || "No createdAt",
          location: property.location || "No location",
          price: property.price || "No Price",
          beds: property.beds || "No Beds",
          title: property.title || "No Title",
          off_plan: property.off_plan || "No Off Plan",
        }));

        // console.log("formattedData", formattedData);
        setAllPropertiesData(formattedData);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error fetching properties:", error);
        }
      }
    };

    fetchProperties();
  }, []);

  const [date, setDate] = useState(null);

  return (
    <div className="font-sans !z-50">
      <Helmet>
        <title>DNS RealEstate | Buy, Sell & Invest in Dubai Properties</title>
        <meta
          name="description"
          content="Find your dream home or next investment with DNS RealEstate. Explore luxury apartments, villas, and commercial properties across Dubai's top locations with expert guidance."
        />
        <link rel="canonical" href="https://dnsdxb.com/" />
      </Helmet>

      <Hero />
      {/* <div className="relative h-[337px] "> */}
      {/* <PropertyValuation allPropertiesData={allPropertiesData} /> */}
      {/* </div> */}
      <InterestOptions />
      <Features />

      <OffPlanProperty />
      <h2 className="heading text-center mb-4 mt-5">LATEST PROJECTS</h2>
      <Divider />
      <LatestProjects allPropertiesData={allProperties} />
      <Partners />
      {/* <Testimonials /> */}
      <ContactUs />
      {/* <FAQWithForm /> */}
      <AboutUs />
      <HelpSection />
      <BlogSection />
      <ToastContainer className="!z-50 mt-14" />
    </div>
  );
};

export default LandingPage;
