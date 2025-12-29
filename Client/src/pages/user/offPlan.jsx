import { useEffect, useMemo, useRef, useState } from "react";
import Divider from "../../components/user/divider";
import SmallPropertyComponent from "../../components/user/SmallPropertyComponent";
import config from "../../common/config";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import DevImages from "./LandingPage/developersImages";
import bannerimage from "../../assets/bannerimage.png";

const OffPlan = () => {
  const [allProperties, setAllProperties] = useState([]);
  console.log("offProperties", allProperties);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/api/property`);
        setAllProperties(response.data.data);
      } catch (error) {
        if (error) {
          console.log("Error fetching properties:", error);
        }
      }
    };
    fetchProperties();
  }, []);

  const offPlanProp = allProperties?.filter((pro) => pro?.off_plan === true);
  console.log("offPlanProp", offPlanProp);

  return (
    <section className="overflow-hidden -mt-3">
      <section className="relative bg-gradient-to-b py-10  from-[#2e0e0f] to-[#241c2c] text-white min-h-[350px]  flex items-center justify-center">
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-60 z-10 "></div>

        <img
          src={bannerimage}
          alt="Handshake"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="relative z-20 text-center max-w-3xl px-4">
          <h1 className="heading text-[#fff] mb-6">
            DUBAI OFF PLAN PROPERTIES
          </h1>
          <p className=" leading-relaxed mb-8 max-w-4xl ">
            Looking to build a rewarding career in real estate? Reach out to DNS
            Real Estate — we're always on the lookout for passionate, driven
            individuals to join our dynamic team. Whether you're just starting
            out or seeking your next big opportunity, we’re here to guide you.
          </p>
        </div>
      </section>
      <div className="p-6 max-w-[1320px] mx-auto lg:mt-0 md:mt-0 -mt-10 mb-7">
        {/* <div className="mt-10">
          <Divider />
        </div> */}

        <DevImages allPropertiesData={offPlanProp} />
      </div>

      <Divider />

      <h2 className="heading text-center  mb-4  mt-5">AVAILABLE PROPERTIES</h2>
      <section className=" bg-[#F4F4F4] mt-12">
        <div className="max-w-[1320px] mx-auto py-5 pb-14">
          <p className=" subheading mb-1  px-5">RENT</p>
          <span className="border-b-[3px]  border-[#A9B9D6] flex w-[150px] mb-8 mx-5 "></span>
          <SmallPropertyComponent Status={"Rent"} matchingDev={offPlanProp} />
        </div>
      </section>

      <div className="mt-10">
        <Divider />
      </div>
      <section className=" bg-[#F4F4F4] mt-12">
        <div className="max-w-[1320px] mx-auto py-5 pb-14">
          <p className=" subheading mb-1  px-5">BUY</p>
          <span className="border-b-[3px]  border-[#A9B9D6] flex w-[150px] mb-8 mx-5 "></span>
          <SmallPropertyComponent Status={"Buy"} matchingDev={offPlanProp} />
        </div>
      </section>
    </section>
  );
};

export default OffPlan;
