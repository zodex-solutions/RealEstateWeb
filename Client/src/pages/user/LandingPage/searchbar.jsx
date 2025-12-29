import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import config from "../../../common/config";
import Select from "react-select";

const SearchBar = () => {
  const navigate = useNavigate();

  // State to hold properties data from API
  const [Data, setData] = useState([]);

  // State to hold property types from API
  const [propertyType, setPropertyType] = useState([]);

  // Define filter keys with labels
  const filterKeys = [
    { key: "Locations", options: [], label: "Location" },
    { key: "Properties", options: [], label: "Property" },
    { key: "Types", options: [], label: "Type" },
  ];

  // Fetch properties data on mount
  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/property`)
      .then((response) => setData(response.data.data))
      .catch((error) => console.log(error.message));
  }, []);

  // Fetch property types on mount
  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/property-type`)
      .then((response) => setPropertyType(response.data.data))
      .catch((error) => console.log(error.message));
  }, []);

  // Filters state with initial empty strings
  const [filters, setFilters] = useState(() =>
    Object.fromEntries(filterKeys.map(({ key }) => [key, ""]))
  );

  // Prepare menu options with dependencies between filters
  const menuItems = useMemo(() => {
    return filterKeys.map(({ key, options }) => {
      let dynamicOptions = [];

      if (key === "Locations") {
        // Get unique locations from Data
        const allLocations = Data.map((item) => item.location).filter(Boolean);
        dynamicOptions = [...new Set(allLocations)];
      } else if (key === "Properties") {
        // Filter properties by selected location if any
        let filteredData = Data;
        if (filters?.Locations) {
          filteredData = Data.filter(
            (item) => item.location === filters.Locations
          );
        }
        const allProperties = filteredData
          .map((item) => item.title)
          .filter(Boolean);
        dynamicOptions = [...new Set(allProperties)];
      } else if (key === "Types") {
        // Use all property types
        dynamicOptions = propertyType.map((type) => type.title).filter(Boolean);
      }

      return {
        key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        options: options.length ? options : dynamicOptions,
      };
    });
  }, [Data, propertyType, filters]);

  // Handle filter value changes, reset dependent filters if needed
  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const updated = { ...prev, [key]: value };

      // Reset Properties if Location changes
      if (key === "Locations") {
        updated["Properties"] = "";
      }

      return updated;
    });
  };

  // Build selected filters object (only non-empty values)
  const selectedOptionsObject = useMemo(() => {
    if (!filters) return {};
    const selected = {};

    for (const [key, value] of Object.entries(filters)) {
      if (value && value.trim() !== "") {
        selected[key] = value;
      }
    }

    return selected;
  }, [filters]);

  // On clicking Search, save filters and navigate
  const handleSearch = () => {
    if (Object.keys(selectedOptionsObject).length > 0) {
      localStorage.setItem(
        "selectedFilters",
        JSON.stringify(selectedOptionsObject)
      );
      console.log("Stored in localStorage:", selectedOptionsObject);
    } else {
      // Clear if no filters selected
      localStorage.removeItem("selectedFilters");
      console.log("No filters selected — localStorage cleared.");
    }

    navigate("/listing");
  };

  return (
    <section className="z-40 lg:border md:border sm:border border-gray-100 bg-white lg:shadow-[0px_5px_10px_rgba(0,0,0,0.1)] sm:shadow-[0px_5px_10px_rgba(0,0,0,0.1)] md:shadow-[0px_5px_10px_rgba(0,0,0,0.1)] h-full  xl:h-[68px py-2 rounded-md mt-2 flex  items-center gap-5 justify-between">
      <div className=" flex justify-between flex-wrap lg:px-3 md:px-3 sm:px-3 gap-2">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col dropSearch lg:w-[195px] sm:w-[100%]"
          >
            <label className="text-[14px] text-black ml-2 capitalize">
              {item.label}
            </label>
            <Select
              className="    text-sm"
              classNamePrefix="select"
              options={[
                { value: "", label: `All ${item.label}` },
                ...item.options.map((option) => ({
                  value: option,
                  label: option.replace(/ - Dubai - United Arab Emirates$/, ""),
                })),
              ]}
              value={{
                value: filters[item.key] || "",
                label: filters[item.key]
                  ? item.options
                      .find((opt) => opt === filters[item.key])
                      ?.replace(/ - Dubai - United Arab Emirates$/, "")
                  : `All ${item.label}`,
              }}
              onChange={(selectedOption) =>
                handleFilterChange(item.key, selectedOption?.value || "")
              }
              isClearable
            />
          </div>
        ))}
        <button
          onClick={handleSearch}
          className="flex gap-2 xl:w-full lg:w-full selectWidth justify-center !px-3 items-center !bg-[#7A9DC4] text-[14px] !rounded-[5px] text-white py- h-[47px lg:w-[108px md:w-fit !hover:bg-[#7A9DC4] transition"
        >
          Search
          <IoSearchOutline size={20} />
        </button>
      </div>
    </section>
  );
};

export default SearchBar;
