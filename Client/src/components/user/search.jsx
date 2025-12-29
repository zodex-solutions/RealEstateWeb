import { useState, useEffect } from "react";
import axios from "axios";
import { GoChevronDown } from "react-icons/go";
import config from "../../common/config";
import { FaChevronDown } from "react-icons/fa";
import { useParams } from "react-router";
import Select from "react-select";
export default function PropertySearch({
  setShowDropdown,
  setActiveTab,
  showDropdown,
  setProperties,
  properties = [],
  activeTab,
  setUpdatedProperties,
  map,
  DropDownMob,
  setIsNewestFirst,
  isNewestFirst,
  removeFilter,
}) {
  const { statuss } = useParams();
  console.log(" statuss ==== ", statuss);

  if (statuss) {
    console.log("statuss", statuss);
  }

  const [filters, setFilters] = useState({
    property_type: "",
    property_status: "",
    comerical: null,
    metro: null,
    unfurnished: null,
    sea_front: null,
    beds: "",
    off_plan: null,
    price: "",
    location: "",
    title: "",
  });

  console.log("Filter ===", filters);

  if (removeFilter === true) {
    window.location.reload();
  }
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const beds = [
    { _id: "1", title: "1 Bed" },
    { _id: "2", title: "2 Beds" },
    { _id: "3", title: "3 Beds" },
    { _id: "4", title: "4+ Beds" },
  ];

  const price = [
    { _id: "1", from: "1 M", to: "4 M" },
    { _id: "2", from: "4 M", to: "8 M" },
    { _id: "3", from: "8 M", to: "12 M" },
    { _id: "4", from: "12 M", to: "16 M" },
  ];

  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [selectedPropertyStatus, setSelectedPropertyStatus] = useState(null);
  const [selectedBeds, setSelectedBeds] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  console.log("selectedProperty", selectedProperty);

  const [dropdownType, setDropdownType] = useState(null);
  const [propertyStatus, setPropertyStatus] = useState([]);
  const [propertyType, setPropertyType] = useState([]);
  const [location, setLocations] = useState([]);

  const [property, setProperty] = useState([]);

  useEffect(() => {
    const storedcomerical = localStorage.getItem("comerical");
    console.log("storedcomerical", storedcomerical);
    setFilters((prev) => ({
      ...prev,
      comerical: storedcomerical === "true" ? true : null,
    }));
  }, []);
  useEffect(() => {
    const storedoff_plan = localStorage.getItem("off_plan");
    console.log("storedoff_plan", storedoff_plan);
    setFilters((prev) => ({
      ...prev,
      off_plan: storedoff_plan === "true" ? true : null,
    }));
  }, []);
  useEffect(() => {
    const storedMetro = localStorage.getItem("metro");
    console.log("storedMetro", storedMetro);
    setFilters((prev) => ({
      ...prev,
      metro: storedMetro === "true" ? true : null,
    }));
  }, []);

  useEffect(() => {
    const storedunfurnished = localStorage.getItem("unfurnished");
    console.log("storedunfurnished", storedunfurnished);
    setFilters((prev) => ({
      ...prev,
      unfurnished: storedunfurnished === "true" ? true : null,
    }));
  }, []);
  useEffect(() => {
    const storedsea_front = localStorage.getItem("sea_front");
    console.log("storedsea_front", storedsea_front);
    setFilters((prev) => ({
      ...prev,
      sea_front: storedsea_front === "true" ? true : null,
    }));
  }, []);

  useEffect(() => {
    if (properties.length > 0) {
      const uniqueLocations = [
        ...new Map(
          properties.map((property) => [
            property.location,
            {
              _id: property._id,
              location: property.location,
            },
          ])
        ).values(),
      ];

      setLocations(uniqueLocations);
    }
  }, [properties]);

  useEffect(() => {
    if (properties.length > 0) {
      const title = [
        ...new Map(
          properties.map((pro) => [
            pro.title,
            { _id: pro._id, title: pro.title },
          ])
        ).values(),
      ];

      setProperty(title);
    }
  }, [properties]);

  // status
  useEffect(() => {
    if (statuss && properties.length > 0) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        property_status: statuss.toUpperCase(),
      }));
      setSelectedPropertyStatus(statuss);
    }
  }, [statuss, properties]);

  // Type , locaation , title
  useEffect(() => {
    let storedFilters = {};
    try {
      storedFilters = JSON.parse(localStorage.getItem("selectedFilters")) || {};
    } catch (e) {
      console.error("Error parsing storedFilters:", e);
    }

    if (properties.length > 0 && storedFilters.Types) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        property_type: storedFilters.Types.toUpperCase(),
      }));
      setSelectedPropertyType(storedFilters.Types?.toUpperCase());
    }
  }, [properties]);

  useEffect(() => {
    let storedFilters = {};

    try {
      storedFilters = JSON.parse(localStorage.getItem("selectedFilters")) || {};
      console.log("storedFilters", storedFilters);
    } catch (e) {
      console.error("Error parsing storedFilters:", e);
    }

    if (properties.length > 0 && storedFilters.Locations) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        location: storedFilters.Locations,
      }));
      setSelectedLocation(storedFilters.Locations);
    }
  }, [properties]);

  useEffect(() => {
    let storedFilters = {};

    try {
      storedFilters = JSON.parse(localStorage.getItem("selectedFilters")) || {};
    } catch (e) {
      console.error("Error parsing storedFilters:", e);
    }

    console.log("storedFilters", storedFilters);

    if (properties.length > 0 && storedFilters.Properties) {
      console.log("This", storedFilters.Properties?.toUpperCase());

      setFilters((prevFilters) => ({
        ...prevFilters,
        title: storedFilters.Properties,
      }));
      setSelectedProperty(storedFilters.Properties?.toUpperCase());
    }
  }, [properties]);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/property-type`)
      .then((response) => setPropertyType(response.data.data))
      .catch((error) => console.log(error.message));
  }, []);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/property-status`)
      .then((response) => setPropertyStatus(response.data.data))
      .catch((error) => console.log(error.message));
  }, []);

  useEffect(() => {
    console.log("Properties before filtering:", properties);
    console.log("Filters applied:", filters);

    if (!Array.isArray(properties)) {
      console.error("Properties is not an array:", properties);
      return;
    }

    const filteredProperties = properties.filter((property) => {
      return (
        (!filters.beds || property.beds === filters.beds) &&
        (!filters?.title || property?.title === filters.title) &&
        (!filters.property_type ||
          property.property_type?.title === filters.property_type) &&
        (!filters.property_status ||
          property.property_status?.title === filters.property_status) &&
        (!filters.price || property.price === filters.price) &&
        (!filters.location || property.location === filters.location) &&
        (filters.comerical === null ||
          property.comerical === filters.comerical) &&
        (filters.metro === null || property.metro === filters.metro) &&
        (filters.unfurnished === null ||
          property.unfurnished === filters.unfurnished) &&
        (filters.sea_front === null ||
          property.sea_front === filters.sea_front) &&
        (filters.off_plan === null || property.off_plan === filters.off_plan)
      );
    });

    console.log("filteredProperties:", filteredProperties);

    const sortedProperties = [...filteredProperties].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return isNewestFirst ? dateB - dateA : dateA - dateB;
    });

    console.log("Filtered properties:", sortedProperties);

    setUpdatedProperties(sortedProperties);
  }, [filters, properties, isNewestFirst]);

  const handleSelect = (type, typeCategory) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (typeCategory === "propertyType") {
        console.log("typeCategory", type);
        updatedFilters.property_type = type.title;
        setSelectedPropertyType(type.title);
      } else if (typeCategory === "propertyStatus") {
        updatedFilters.property_status = type.title;
        setSelectedPropertyStatus(type.title);
      } else if (typeCategory === "beds") {
        updatedFilters.beds = type._id;
        setSelectedBeds(type.title);
      } else if (typeCategory === "price") {
        updatedFilters.price = type._id;
        setSelectedPrice(`${type.from} - ${type.to}`);
      } else if (typeCategory === "location") {
        updatedFilters.location = type.location;
        setSelectedLocation(type.location);
        // Title
      } else if (typeCategory === "title") {
        updatedFilters.title = type.title;
        setSelectedProperty(type.title);
      }

      return updatedFilters;
    });

    setShowDropdown(false);
  };

  const handleChange2 = (e) => {
    const { name } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: prev[name] === true ? null : true,
    }));
  };

  const dropdownOptions = [
    {
      name: "location",
      label: "Location",
      options: location.map((item) => ({
        value: item.location,
        label: item.location.replace(/ - Dubai - United Arab Emirates$/, ""),
      })),
      value: selectedLocation,
      onChange: (selected) => {
        setSelectedLocation(selected.value);
        setFilters((prev) => ({ ...prev, location: selected.value }));
      },
    },
    {
      name: "beds",
      label: "Beds",
      options: beds.map((item) => ({
        value: item.title,
        label: item.title,
      })),
      value: selectedBeds,
      onChange: (selected) => {
        setSelectedBeds(selected.value);
        setFilters((prev) => ({ ...prev, beds: selected.value }));
      },
    },
    {
      name: "price",
      label: "Price Range",
      options: price.map((item) => ({
        value: `${item.from} - ${item.to}`,
        label: `${item.from} - ${item.to}`,
      })),
      value: selectedPrice,
      onChange: (selected) => {
        setSelectedPrice(selected.value);
        setFilters((prev) => ({ ...prev, price: selected.value }));
      },
    },
    {
      name: "propertyType",
      label: "Property Type",
      options: propertyType.map((item) => ({
        value: item.title,
        label: item.title,
      })),
      value: selectedPropertyType,
      onChange: (selected) => {
        setSelectedPropertyType(selected.value);
        setFilters((prev) => ({ ...prev, property_type: selected.value }));
      },
    },
    {
      name: "propertyStatus",
      label: "Property Status",
      options: propertyStatus.map((item) => ({
        value: item.title,
        label: item.title,
      })),
      value: selectedPropertyStatus,
      onChange: (selected) => {
        setSelectedPropertyStatus(selected.value);
        setFilters((prev) => ({ ...prev, property_status: selected.value }));
      },
    },
  ];

  return (
    <section>
      {/* <div className="flex flex-row gap-3 items-center overflow-x-auto w-full px-5"> */}
      <div className=" gap-3 flex flex-wrap relative lg:px-5">
        <div
          id="DropDownMob"
          className={`${
            filters.metro === null ? "" : ""
          }  pr-3 border border-gray-100 px- py- flex items-center gap-3 rounded-md shadow-[0px_5px_10px_rgba(0,0,0,0.1)]     cursor-pointer `}
        >
          <input
            type="checkbox"
            id="metro"
            name="metro"
            checked={filters.metro}
            onChange={handleChange2}
            className="w-4 h-4 "
          />
          <label htmlFor="metro" className="text-sm text-black cursor-pointer">
            Metro
          </label>
        </div>
        <div
          id="DropDownMob"
          className={`${
            filters.unfurnished === null ? "" : ""
          }   pr-3 border border-gray-100 px- py- flex items-center gap-3 rounded-md shadow-[0px_5px_10px_rgba(0,0,0,0.1)]     cursor-pointer `}
        >
          <input
            type="checkbox"
            id="unfurnished"
            name="unfurnished"
            checked={filters.unfurnished}
            onChange={handleChange2}
            className="w-4 h-4 "
          />
          <label
            htmlFor="unfurnished"
            className="text-sm text-black cursor-pointer"
          >
            Unfurnished
          </label>
        </div>
        <div
          id="DropDownMob"
          className={`${
            filters.sea_front === null ? "" : ""
          }  pr-3 border border-gray-100 px- py- flex items-center gap-3 rounded-md shadow-[0px_5px_10px_rgba(0,0,0,0.1)]     cursor-pointer `}
        >
          <input
            type="checkbox"
            id="sea_front"
            name="sea_front"
            checked={filters.sea_front}
            onChange={handleChange2}
            className="w-4 h-4 "
          />
          <label
            htmlFor="sea_front"
            className="text-sm text-black cursor-pointer"
          >
            Sea Front
          </label>
        </div>
        <div
          id="DropDownMob"
          className={`${
            filters.off_plan === null ? "" : ""
          }  pr-3 border border-gray-100 px- py- flex items-center gap-3 rounded-md shadow-[0px_5px_10px_rgba(0,0,0,0.1)]     cursor-pointer `}
        >
          <input
            type="checkbox"
            id="off_plan"
            name="off_plan"
            checked={filters.off_plan}
            onChange={handleChange2}
            className="w-4 h-4"
          />
          <label
            htmlFor="off_plan"
            className="text-sm text-black cursor-pointer"
          >
            Off-Plan
          </label>
        </div>
        <div
          id="DropDownMob"
          className={`${
            filters.comerical === null ? "" : ""
          }  pr-3 border border-gray-100 py-[9.5px flex items-center gap-3 rounded-md shadow-[0px_5px_10px_rgba(0,0,0,0.1)]     cursor-pointer `}
        >
          <input
            type="checkbox"
            id="comerical"
            name="comerical"
            checked={filters.comerical}
            onChange={handleChange2}
            className="w-4 "
          />
          <label
            htmlFor="comerical"
            className="text-sm text-black cursor-pointer"
          >
            Comercial
          </label>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"> */}
        {dropdownOptions.map((dropdown) => (
          <Select
            key={dropdown.name}
            options={dropdown.options}
            onChange={dropdown.onChange}
            value={
              dropdown.options.find((opt) => opt.value === dropdown.value) ||
              null
            }
            placeholder={dropdown.label}
            isClearable
            className="bg-white  DropDownSelect   flex items-center gap-3 rounded-md shadow-[0px_5px_10px_rgba(0,0,0,0.1)] border border-gray-100    cursor-pointer"
            styles={{
              control: (base) => ({
                ...base,
                height: "100%",
                width: "100%",
                border: "none",
              }),
            }}
          />
        ))}
        <div>
          <a
            href="/listing"
            onClick={() => {
              localStorage.removeItem("selectedFilters");
              localStorage.removeItem("sea_front");
              localStorage.removeItem("unfurnished");
              localStorage.removeItem("metro");
              localStorage.removeItem("comerical");
              localStorage.removeItem("off_plan");
            }}
            className={`${
              map ? "flex" : "hidden"
            } bg-[#204A7A] !text-white DropDownMob flex items-center gap-3 h-[45px] py-[9.5px px-3 rounded-md shadow-[0px_5px_10px_rgba(0,0,0,0.1)] border border-gray-100 p-2  cursor-pointer `}
          >
            Remove Filters
          </a>
        </div>
        <div
          id="DropDownMap"
          className={`${
            map ? "flex" : "hidden"
          }  bg-white shadow-[0px_5px_10px_rgba(0,0,0,0.1)] border border-gray-100 rounded-md`}
        >
          <a
            className={`px-7 py-3 text-[16px]  flex items-center gap-3 transition-all cursor-pointer shadow-[0px_5px_10px_rgba(0,0,0,0.1)] rounded-l-md  ${
              activeTab === "map"
                ? "bg-[#204A7A] !text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setActiveTab("map")}
          >
            Map
          </a>
          <a
            className={`px-7 py-3 text-[16px]  flex items-center gap-3 transition-all cursor-pointer rounded-r-md shadow-[0px_5px_10px_rgba(0,0,0,0.1)] ${
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

      {/* </div> */}
      {/* Titel */}
      {/* <div>
        <div
          className={` ${DropDownMob} bg-white  flex items-center gap-3 rounded-md shadow-[0px_5px_10px_rgba(0,0,0,0.1)] border border-gray-100 p-2   cursor-pointer `}
          onClick={() => {
            setDropdownType("title");
            setShowDropdown(!showDropdown);
          }}
        >
          {selectedProperty ? (
            <div className="flex items-center justify-between w-full space-x-2">
              <div className="flex items-center gap-4 truncate max-w-[140px] bloc">
                <span>{selectedProperty}</span>
              </div>
              <FaChevronDown />
            </div>
          ) : (
            <span className="text-black gap-4  flex w-full  justify-between items-center">
              Property <FaChevronDown />
            </span>
          )}
        </div>
        {showDropdown && dropdownType === "title" && (
          <div className="bg-white border  border-gray-500/55 rounded-lg shadow-lg min-w-[200px absolute mt-1 z-10">
            {property?.length > 0 &&
              property.map((item) => (
                <div
                  key={item._id}
                  className="flex p-2 cursor-pointer hover:bg-gray-100 rounded-lg items-center"
                  onClick={() => handleSelect(item, "title")}
                >
                  <span className="ml-2 ">{item.title}</span>
                </div>
              ))}
          </div>
        )}
      </div> */}
      {/* Location */}
      {/* <div>
          <div
            className={` ${DropDownMob} bg-white  flex items-center gap-3 rounded-md shadow-[0px_5px_10px_rgba(0,0,0,0.1)] border border-gray-100 p-2   cursor-pointer `}
            onClick={() => {
              setDropdownType("location");
              setShowDropdown(!showDropdown);
            }}
          >
            {selectedLocation ? (
              <div className="flex items-center justify-between w-full space-x-2">
                <div className="flex items-center gap-4 truncate max-w-[140px] bloc">
                  <span>{selectedLocation}</span>
                </div>
                <FaChevronDown />
              </div>
            ) : (
              <span className="text-black gap-4  flex w-full  justify-between items-center">
                Location <FaChevronDown />
              </span>
            )}
          </div>
          {showDropdown && dropdownType === "location" && (
            <div className="bg-white border  border-gray-500/55 rounded-lg shadow-lg min-w-[200px absolute mt-1 z-10">
              {location?.length > 0 &&
                location.map((item) => (
                  <div
                    key={item._id}
                    className="flex p-2 cursor-pointer hover:bg-gray-100 rounded-lg items-center"
                    onClick={() => handleSelect(item, "location")}
                  >
                    <span className="ml-2 ">
                      {item.location.replace(
                        / - Dubai - United Arab Emirates$/,
                        ""
                      )}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div> */}

      {/* <div>
          <div
            className={`${DropDownMob} bg-white gap-3 border border-gray-100 DropDownMob flex items-center  rounded-md shadow-[0px_5px_10px_rgba(0,0,0,0.1)]  p-2   cursor-pointer `}
            onClick={() => {
              setDropdownType("beds");
              setShowDropdown(!showDropdown);
            }}
          >
            {selectedBeds ? (
              <div className="flex items-center justify-between w-full space-x-2">
                <div className="flex items-center gap-4">
                  <span>{selectedBeds}</span>
                </div>
                <FaChevronDown />
              </div>
            ) : (
              <span className="text-black flex gap-4 w-full  justify-between items-center">
                Beds <FaChevronDown />
              </span>
            )}
          </div>

          {showDropdown && dropdownType === "beds" && (
            <div className="bg-white border border-gray-500/55 rounded-lg shadow-lg min-w-[200px absolute mt-1 z-10">
              {beds.map((bed) => (
                <div
                  key={bed._id}
                  className="flex p-2 cursor-pointer hover:bg-gray-100 rounded-lg items-center"
                  onClick={() => handleSelect(bed, "beds")}
                >
                  <span className="ml-2">{bed.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div
            className={`${DropDownMob} ${
              map ? "flex" : "hidden"
            } bg-white  relative DropDownMob flex items-center gap-3 rounded-md shadow-[0px_5px_10px_rgba(0,0,0,0.1)] border border-gray-100 p-2   cursor-pointer `}
            onClick={() => {
              setDropdownType("price");
              setShowDropdown(!showDropdown);
            }}
          >
            {selectedPrice ? (
              <div className="flex   w-40 items-center justify-between space-x-2">
                <div className="flex items-center gap-4">
                  <span>{selectedPrice}</span>
                </div>
                <FaChevronDown />
              </div>
            ) : (
              <span className="text-black gap-4  flex w-full  justify-between items-center">
                Price Range <FaChevronDown />
              </span>
            )}
          </div>
          {showDropdown && dropdownType === "price" && (
            <div className="bg-white border border-gray-500/55 rounded-lg shadow-lg min-w-[200px absolute mt-1 z-10">
              {price.map((item) => (
                <div
                  key={item._id}
                  className="flex p-2 cursor-pointer hover:bg-gray-100 rounded-lg items-center"
                  onClick={() => handleSelect(item, "price")}
                >
                  <span className="ml-2">
                    {item.from} - {item.to}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div
            className={` ${DropDownMob} bg-white DropDownMob flex items-center gap-3 rounded-md shadow-[0px_5px_10px_rgba(0,0,0,0.1)] border border-gray-100 p-2   cursor-pointer `}
            onClick={() => {
              setDropdownType("propertyType");
              setShowDropdown(!showDropdown);
            }}
          >
            {selectedPropertyType ? (
              <div className="flex items-center justify-between w-full space-x-2">
                <div className="flex items-center gap-4">
                  <span>{selectedPropertyType}</span>
                </div>
                <FaChevronDown />
              </div>
            ) : (
              <span className="text-black gap-4  flex w-full  justify-between items-center">
                Property Type <FaChevronDown />
              </span>
            )}
          </div>
          {showDropdown && dropdownType === "propertyType" && (
            <div className="bg-white border border-gray-500/55 rounded-lg shadow-lg min-w-[200px absolute mt-1 z-10">
              {propertyType.map((type) => (
                <div
                  key={type._id}
                  className="flex p-2 cursor-pointer hover:bg-gray-100 rounded-lg items-center"
                  onClick={() => handleSelect(type, "propertyType")}
                >
                  <span className="ml-2">{type.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div
            className={` ${DropDownMob} bg-white DropDownMob flex items-center gap-3 rounded-md shadow-[0px_5px_10px_rgba(0,0,0,0.1)] border border-gray-100 p-2  cursor-pointer `}
            onClick={() => {
              setDropdownType("propertyStatus");
              setShowDropdown(!showDropdown);
            }}
          >
            {selectedPropertyStatus ? (
              <div className="flex items-center justify-between w-full space-x-2">
                <div className="flex items-center gap-4">
                  <span>{selectedPropertyStatus}</span>
                </div>
                <FaChevronDown />
              </div>
            ) : (
              <span className="text-black gap-4  flex w-full  justify-between items-center">
                Property Status <FaChevronDown />
              </span>
            )}
          </div>
          {showDropdown && dropdownType === "propertyStatus" && (
            <div className="bg-white border border-gray-500/55 rounded-lg shadow-lg min-w-[200px absolute mt-1 z-10">
              {propertyStatus.map((status) => (
                <div
                  key={status._id}
                  className="flex p-2 cursor-pointer hover:bg-gray-100 rounded-lg items-center"
                  onClick={() => handleSelect(status, "propertyStatus")}
                >
                  <span className="ml-2">{status.title}</span>
                </div>
              ))}
            </div>
          )}
        </div> */}
    </section>
  );
}
