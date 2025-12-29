import { useEffect, useMemo, useRef, useState } from "react";
import Divider from "../../components/user/divider";
import SmallPropertyComponent from "../../components/user/SmallPropertyComponent";
import config from "../../common/config";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import DevImages from "./LandingPage/developersImages";
import LatestProjects from "./LandingPage/latestProject";
import { Helmet } from "react-helmet";

const PerticularDevelopers = () => {
  const { id } = useParams();
  const [allPropertiesData, setAllPropertiesData] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  // console.log("allPropertiesData", allPropertiesData);
  console.log("allProperties", allProperties);

  const [developer, setDeveloper] = useState();

  const fetchDeveloper = async (id) => {
    if (!id) {
      console.log("developer ID is required");
      return;
    }
    try {
      const response = await axios.get(`${config.API_URL}/api/developer/${id}`);
      setDeveloper(response.data.data);
    } catch (error) {
      console.log(
        "Error fetching community:",
        error.response?.data || error.message
      );
    }
  };
  useEffect(() => {
    fetchDeveloper(id);
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/api/property`, {
          signal: controller.signal,
        });
        setAllProperties(response.data.data);
        const formattedData = response.data.data.map((property) => ({
          images: property?.image.map((img) => img.image),
          seo_title: property?.seo_title || "No Title",
          title: property?.title || "No Title",
          community: property?.communities || "No Community",
          types: property?.property_type?.title,
          statuses: property?.property_status?.title,
          developer: property?.developers?.title || "No Developer",
          createdAt: property?.createdAt || "No createdAt",
          location: property?.location || "No location",
          price: property?.price || "No Price",
          beds: property?.beds || "No Beds",
        }));

        setAllPropertiesData(formattedData);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.log("Error fetching properties:", error);
        }
      }
    };

    fetchProperties();

    return () => controller.abort();
  }, []);

  // console.log("developer", developer?.title);

  const matchingDevelopers = allPropertiesData.filter(
    (dev) => dev?.developer?.toLowerCase() === developer?.title?.toLowerCase()
  );

  console.log("matchingDevelopers", matchingDevelopers);

  const matchingDev = allProperties?.filter(
    (dev) =>
      dev?.developers?.title?.toLowerCase() === developer?.title?.toLowerCase()
  );

  console.log("matchingDev1", developer);

  return (
    <section className="overflow-hidden">
      <Helmet>
        <title>
          {developer?.title
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())}
        </title>

        <meta
          name="description"
          content={`${developer?.title.replace(
            /-/g,
            " "
          )} Realty is a multinational real estate developer committed to redefining the art of living through world-class design and construction standards.`}
        />

        <link
          rel="canonical"
          href={`https://dnsdxb.com/developer/${developer?.title}`}
        />
      </Helmet>

      {developer ? (
        <div className="p-6 max-w-[1320px] mx-auto lg:mt-0 md:mt-0 -mt-10 mb-7">
          <h2 className="heading font-bold text-center my-8">
            DUBAI PROPERTIES
          </h2>
          <div
            className="text-gray-600 text-center mt-2"
            dangerouslySetInnerHTML={{
              __html: developer.description,
            }}
          />

          <div className="mt-10">
            <Divider />
          </div>

          <DevImages allPropertiesData={matchingDev} />
        </div>
      ) : (
        ""
      )}
      <Divider />

      <h2 className="heading text-center  mb-4  mt-5">AVAILABLE PROPERTIES</h2>
      <section className=" bg-[#F4F4F4] mt-12">
        <div className="max-w-[1320px] mx-auto py-5 pb-14">
          <p className=" subheading mb-1  px-5">RENT</p>
          <span className="border-b-[3px]  border-[#A9B9D6] flex w-[150px] mb-8 mx-5 "></span>
          <SmallPropertyComponent Status={"Rent"} matchingDev={matchingDev} />
        </div>
      </section>

      <div className="mt-10">
        <Divider />
      </div>
      <section className=" bg-[#F4F4F4] mt-12">
        <div className="max-w-[1320px] mx-auto py-5 pb-14">
          <p className=" subheading mb-1  px-5">BUY</p>
          <span className="border-b-[3px]  border-[#A9B9D6] flex w-[150px] mb-8 mx-5 "></span>
          <SmallPropertyComponent Status={"Buy"} matchingDev={matchingDev} />
        </div>
      </section>
    </section>
  );
};

export default PerticularDevelopers;
