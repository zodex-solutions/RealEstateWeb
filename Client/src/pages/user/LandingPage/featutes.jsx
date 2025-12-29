import React, { useState } from "react";
import { FaDraftingCompass, FaSwimmingPool, FaWater } from "react-icons/fa";
import { MdOutlineCleaningServices } from "react-icons/md";
import { IoIosExpand } from "react-icons/io";
import { IoLeafOutline, IoTrainOutline } from "react-icons/io5";
import { IoDiamondOutline } from "react-icons/io5";
import { RiSofaLine } from "react-icons/ri";
import { GiPalmTree } from "react-icons/gi";
import { PiWashingMachine } from "react-icons/pi";
import { useNavigate } from "react-router";
import { MdBusinessCenter } from "react-icons/md";
// import { GiBlueprint, GiWaveSurfer } from "react-icons/gi";
import { MdOutlineWaves } from "react-icons/md";
import { TbSofaOff } from "react-icons/tb";
const Features = () => {
  const [selectedOption, setSelectedOption] = useState("For Buy");

  const features = [
    {
      name: "Metro",
      icon: <IoTrainOutline className="text-gray-700 text- text-xl" />,
    },
    {
      name: "Comerical",
      icon: <MdBusinessCenter className="text-gray-700 text-xl" />, // from react-icons/md
    },
    {
      name: "Off-Plan",
      icon: <FaDraftingCompass className="text-gray-700 text-xl" />,
    },
    {
      name: "Unfurnished",
      icon: <TbSofaOff className="text-gray-700 text-xl" />, // from react-icons/tb
    },
    {
      name: "Sea Front",
      icon: <FaWater className="text-gray-700 text-xl" />, // from react-icons/gi
    },
  ];

  const handleFilter = (name) => {
    goTop();
    navigate("/listing");
    if (name === "Metro") localStorage.setItem("metro", JSON.stringify(true));
    if (name === "Comerical")
      localStorage.setItem("comerical", JSON.stringify(true));
    if (name === "Off-Plan")
      localStorage.setItem("off_plan", JSON.stringify(true));
    if (name === "Unfurnished")
      localStorage.setItem("unfurnished", JSON.stringify(true));
    if (name === "Sea Front")
      localStorage.setItem("sea_front", JSON.stringify(true));
  };
  const navigate = useNavigate();
  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <section className="max-w-[1320px] mx-auto mt-10 px-5">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-5">
        <div className="">
          <h2 className="heading ">Search Properties by feature</h2>
          <span className="border-b-[3px]  border-[#A9B9D6] flex w-[150px] "></span>
        </div>
        <div className="  flex gap-6">
          {["For Buy", "For Rent"].map((option) => (
            <a
              key={option}
              onClick={() => setSelectedOption(option)}
              className={`relative px py-2  lg:text-[18px] md:text-[18px] text-[14px] font-semibold transition-all  cursor-pointer ${
                selectedOption === option
                  ? "text-[#10324A]"
                  : "text-[#4a6e8996]"
              }`}
            >
              {option}
              <span
                className={`px-4 absolute -left-0 bottom-0  py-2 w-full font-semibold transition-all  cursor-pointer ${
                  selectedOption === option
                    ? "border-b-[2px] border-black text-black "
                    : "text-gray-500 border-b-[3px] border-transparent"
                }`}
              ></span>
            </a>
          ))}
        </div>
      </div>
      <div className="flex gap-4 mt-4 flex-wrap  ">
        {features.map((feature, index) => (
          <a
            onClick={() => handleFilter(feature.name)}
            // !sm:h-12 !md:h-14 !lg:h-[55px]
            key={index}
            className="border-2 flex items-center gap-3   rounded-sm border-[#2F5FA733] 
                 transition-all duration-500 cursor-pointer 
                 hover:bg-[#C6D5E6] hover:scale-105
                 text-sm md:text-base lg:text-lg
                 px-2 md:px-3 lg:px-3
                  py-1.5 md:py-2 lg:py-2
                  "
            //  !h-10 md:h-12 lg:h-14
          >
            {feature.icon}
            {feature.name}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Features;
