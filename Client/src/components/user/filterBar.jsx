import {
  BadgeCheck,
  Bike,
  ChartNoAxesCombined,
  ChartNoAxesCombinedIcon,
  ChevronDown,
  ChevronLeftCircleIcon,
  ChevronLeftIcon,
  Contact,
  LayoutDashboard,
  User,
  X,
} from "lucide-react";
import { FaLocationDot } from "react-icons/fa6";
import { FaSlidersH } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaDollarSign, FaLocationArrow } from "react-icons/fa";
import PropertySearch from "./search";
import axios from "axios";
import config from "../../common/config";
// Add Property ,

const Filter = ({
  setFilterBar,
  filterBar,
  setProperties,
  properties,
  setUpdatedProperties,
  updatedProperties,
}) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const islargeScreen = useMediaQuery({ query: "(max-width: 767px)" });

  function handleClose() {
    {
      isSmallScreen
        ? setFilterBar(false)
        : islargeScreen
        ? setFilterBar(true)
        : null;
    }
  }
  useEffect(() => {
    {
      isSmallScreen
        ? setFilterBar(false)
        : islargeScreen
        ? setFilterBar(false)
        : null;
    }
  }, [isSmallScreen, islargeScreen]);

  const [openDropdown, setOpenDropdown] = useState(null);
  // const [openDropdown, setOpenDropdown] = useState(null);
  const [activeTab, setActiveTab] = useState("map");

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const navigate = useNavigate();

  const [filterBarVisible, setFilterBarVisible] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  console.log("Filtered properties =============", updatedProperties);

  const [removeFilter, setRemoveFilter] = useState(false);
  console.log("removeFilter", removeFilter);

  useEffect(() => {
    if (removeFilter === true) {
      const timer = setTimeout(() => {
        setRemoveFilter(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [removeFilter]);

  useEffect(() => {
    const storedFilters = localStorage.getItem("selectedFilters");

    if (storedFilters) {
      const parsedFilters = JSON.parse(storedFilters);
      console.log("Selected Filters:", parsedFilters);
    } else {
      console.log("No filters found in localStorage.");
    }
  }, []);

  return (
    <div
      className={`max-w-[100vw] w-[305px] z-50 ml-[px]  bg-[#ffffff]  mt-4 border border-gray-200 rounded-[5px]  fixed duration-500 transition-all  shadow-2xl
        ${filterBar ? "-ml-2.5" : "-translate-x-[300px] shadow-2xl hidden"}`}
    >
      <aside className=" w-full justify-between bg- flex-col bg-transparnt  h-full  flex p-2">
        {/* Filter Options */}
        <div>
          <div className="flex justify-between">
            <h2 className="text-[18px] ">Filters</h2>
            <X onClick={() => setFilterBar(false)} />
          </div>

          <div className="flex flex-wrap gap-2 my-2 ">
            <PropertySearch
              removeFilter={removeFilter}
              DropDownMob={"pl-3  h-10 text-sm"}
              setShowDropdown={setShowDropdown}
              showDropdown={showDropdown}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
              setProperties={setProperties}
              properties={properties}
              map={false}
              setUpdatedProperties={setUpdatedProperties}
              updatedProperties={updatedProperties}
            />
          </div>

          {/* Price Range */}
          <div className="my-4 ">
            <label className="block text-[12px] font-medium mb-">Price</label>
            <div className="flex justify-between text-gray-600 text-sm items-center">
              <span className="text-[7px]">AED 150,000</span>
              <input
                type="range"
                min="150000"
                max="15000000"
                className=" w-full accent-blue-900"
              />
              <span className="text-[7px]">AED 15,000,000</span>
            </div>
          </div>
        </div>

        {/* Add Filter Button */}
        <div className="flex justify-end items-end ">
          <a
            onClick={() => {
              localStorage.removeItem("selectedFilters");

              localStorage.removeItem("sea_front");
              localStorage.removeItem("unfurnished");
              localStorage.removeItem("metro");
              localStorage.removeItem("comerical");
              localStorage.removeItem("off_plan");
            }}
            href="/listing"
            className="w-[108px px-3 !text-white bg-[#204A7A] flex items-center !rounded-[5px] justify-center h-[29px] !font-semibold !py-0   text-[12px]"
          >
            Remove Filter
          </a>
        </div>
      </aside>
    </div>
  );
};

export default Filter;
