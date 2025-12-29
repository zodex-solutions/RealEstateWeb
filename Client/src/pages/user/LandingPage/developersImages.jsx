import { useEffect, useMemo, useState } from "react";
import { FaSlidersH, FaLocationArrow, FaDollarSign } from "react-icons/fa";
import Divider from "../../../components/user/divider";
import { useNavigate } from "react-router";
import axios from "axios";
import config from "../../../common/config";
import Select from "react-select";

export default function DevImages({ allPropertiesData, developer }) {
  console.log("prop", allPropertiesData);

  const navigate = useNavigate();
  const handelPerticularProperty = (seoTitle) => {
    navigate(`/property/${seoTitle}`);
  };

  const filterKeys = [
    {
      key: "BEDS",
      options: [
        "1 Bed",
        "2 Beds",
        "3 Beds",
        "4 Beds",
        "5 Beds",
        "6 Beds",
        "7 Beds",
        "8 Beds",
        "9 Beds",
        "10 Beds",
      ],
    },
    { key: "LOCATION", options: [] },
    { key: "STATUS", options: [] },
    { key: "TYPE", options: [] },
  ];

  // // State to store dynamic data
  const [propertyType, setPropertyType] = useState([]);
  const [propertyStatus, setPropertyStatus] = useState([]);
  const [locationData, setLocationData] = useState([]);

  // // Initialize filters with default key names
  const [filters, setFilters] = useState(() =>
    Object.fromEntries(filterKeys.map(({ key }) => [key, ""]))
  );

  // // Fetch dynamic filter options
  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/property-type`)
      .then((response) => setPropertyType(response.data.data))
      .catch((error) => console.log(error.message));
  }, []);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/property`)
      .then((response) => setLocationData(response.data.data))
      .catch((error) => console.log(error.message));
  }, []);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/property-status`)
      .then((response) => setPropertyStatus(response.data.data))
      .catch((error) => console.log(error.message));
  }, []);

  // // Generate dynamic menu items
  const menuItems = useMemo(() => {
    return filterKeys.map(({ key, options }) => {
      let dynamicOptions = [];

      if (key === "TYPE") {
        dynamicOptions = propertyType.map((type) => type.title);
      } else if (key === "STATUS") {
        dynamicOptions = propertyStatus.map((status) => status.title);
      } else if (key === "LOCATION") {
        const allLocations = locationData.map((location) => location.location);
        dynamicOptions = [...new Set(allLocations)];
      } else {
        dynamicOptions = [
          ...new Set(
            allPropertiesData.map((item) => item[key]).filter(Boolean)
          ),
        ];
      }

      return {
        key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        options: options.length ? options : dynamicOptions,
      };
    });
  }, [propertyType, propertyStatus, locationData, allPropertiesData]);

  // // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const shuffledImages = useMemo(
    () => [...allPropertiesData].sort(() => Math.random() - 0.5),
    [allPropertiesData]
  );
  // Filter images based on selected filters
  const filteredImages = shuffledImages.filter((image) =>
    Object.entries(filters).every(([key, value]) => {
      if (!value) {
        return true;
      }
      if (key === "BEDS") {
        const bedCount = value.split(" ")[0];
        return image.beds === bedCount;
      }
      if (key === "STATUS") {
        return (
          image?.property_status?.title &&
          image?.property_status?.title.toLowerCase() === value.toLowerCase()
        );
      }
      if (key === "LOCATION") {
        return (
          image.location && image.location.toLowerCase() === value.toLowerCase()
        );
      }
      if (key === "TYPE") {
        return (
          image?.property_type?.title &&
          image?.property_type?.title.toLowerCase() === value.toLowerCase()
        );
      }
      return (
        image[key] &&
        image[key].toString().toLowerCase() === value.toLowerCase()
      );
    })
  );
  console.log("filteredImages", filteredImages);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="max-w-[1320px] mx-auto px-5">
      <div className="flex gap-3 flex-wrap w-full justify-center relative mt-12 mb-10">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`${
              index === 1 ? "w-[280px]" : "w-[200px]"
            } bg-white  border-gray-10 rounded-md shadow`}
          >
            <Select
              className="w-full"
              classNamePrefix="select"
              options={[
                { value: "", label: `All ${item.label}` },
                ...item.options.map((option) => ({
                  value: option,
                  label: option.replace(/ - Dubai - United Arab Emirates$/, ""),
                })),
              ]}
              placeholder={`All ${item.label}`}
              onChange={(selectedOption) =>
                handleFilterChange(item.key, selectedOption?.value || "")
              }
              isClearable
            />
          </div>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {filteredImages.slice(0, 8).map((item, index) => (
          <div
            onClick={() => {
              goTop();
              handelPerticularProperty(item.seo_title);
            }}
            key={index}
            className="relative border cursor-pointer border-gray-300 rounded-[5px] w-auto h-auto hover:scale-[98%] transition-all duration-300"
          >
            <img
              src={item?.image[0]?.image}
              alt={item.seo_title}
              className="w-full object-cover h-[300px] rounded-[5px]"
            />
            <span className="absolute top-3 left-3 bg-[rgba(255,255,255,0.7)] text-black text-xs px-2 py-1 rounded">
              {item.title}
            </span>
            <span
              className={`absolute  ${
                item?.off_plan ? "" : "hidden"
              }  bottom-3 right-3 bg-[rgba(255,255,255,0.7)] text-black text-xs px-2 py-1 rounded`}
            >
              Off Plan
            </span>
            <span className="absolute top-3 right-3 bg-[rgba(255,255,255,0.7)] text-black text-xs px-2 py-1 rounded">
              {item?.property_status?.title}
            </span>
            <span className="absolute bottom-3 left-3 bg-[rgba(255,255,255,0.7)] text-black text-xs px-2 py-1 rounded">
              {item?.property_type?.title}
            </span>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-4">
        <button className="h-[49px] w-[210px] bg-[#2F5FA7] hover:scale-[102%] transition-all duration-500 text-white rounded-[5px]">
          Load More
        </button>
      </div>
    </div>
  );
}
