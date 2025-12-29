import React, { useEffect, useState } from "react";
import SearchBar from "./searchbar";
import building1 from "../../../assets/building.png";
import building from "../../../assets/main.png";
import building2 from "../../../assets/building2.png";
import building3 from "../../../assets/building3.png";

import line from "../../../assets/Line.png";
import Statistics from "./Statistics";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import axios from "axios";
import config from "../../../common/config";
import { X } from "lucide-react";
import SellForm from "./sellForm";
import { useNavigate } from "react-router";

const Hero = () => {
  const [selectedOption, setSelectedOption] = useState("BUY");
  const [isOpenSellModel, setIsOpenSellModel] = useState(false);

  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/api/banner`);
        setBanners(response.data);
        // console.log("banner s", response.data);
      } catch (err) {
        console.log("Failed to fetch banners");
      }
    };

    fetchBanners();
  }, []);

  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const navigate = useNavigate();

  return (
    <section className="relative bg-white  pt-16 ">
      <div className="max-w-[1320px] !z-50 mx-auto flex flex-col-reverse lg:flex-row  lg:items-center gap-10 lg:px-5 ">
        {/* Text Content */}
        <div className="w-full mb-10 lg:px-0 px- lg:mt-0 md:-mt-7 sm:-mt-8 -mt-10 md:px-5 sm:px-5 px-5">
          <div className="flex  w-full ">
            <h1 className="font-semibold HeroText ">
              Find Your{" "}
              <span className="relative mb-5 l:block">
                <span className="text-[#7A9DC4]">Perfect Home</span>
                <img
                  src={line}
                  alt="line"
                  className="absolute lg:top-[4.2vw] lg:right-1 md:top-[7.2vw] md:right-2 top-[8.6vw] right-1 lg:w-[15vw] md:w-[28vw] sm:w-[28vw] w-[29vw] h-4"
                />
              </span>
            </h1>
          </div>
          <h2 className="HeroText font-semibold lg:-mt-0 leading-[1.2]">
            With us
          </h2>
          <div className="max-w-2xl">
            <div className="flex lg:mt-10 md:mt-14 mt-5">
              <div className="bg-white shadow-[0px_5px_10px_rgba(0,0,0,0.1)] lg:h-[49px]  lg:w-[275px] h-[45px]  w-[275px]   -px-3 pt-[8px] rounded-[5px] flex justify-between">
                {["BUY", "SELL", "RENT"].map((option, index) => (
                  <div key={index} className="flex flex-col justify-between">
                    <a
                      onClick={() => {
                        setSelectedOption(option);
                        if (index === 1) {
                          setIsOpenSellModel(true);
                        } else if (index === 0) {
                          goTop();
                          navigate("/listing/BUY");
                        } else if (index === 2) {
                          goTop();
                          navigate("/listing/RENT");
                        }
                      }}
                      className={`text-center w-full font-semibold transition-all lg:text-[18px] md:text-[15px] text-[14px] cursor-pointer 
                        `}
                    >
                      {option}
                    </a>
                    <div
                      className={`w-[91px] px-  border-[#1E4B7A] ${
                        selectedOption === option
                          ? "border-[3px]  text-black " +
                            (option === "BUY"
                              ? "rounded-tr-lg rounded-bl-lg"
                              : option === "SELL"
                              ? "rounded-tr-lg rounded-tl-lg"
                              : "rounded-tl-lg rounded-br-lg ")
                          : "text-gray-500 border-b-[3px] border-transparent"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
            <SearchBar />
            <Statistics />
          </div>
        </div>
        {/* Hero Image */}
        <div className="m:w-1/2 !z-0 lg:-mt-14 md:-mt-[120px] sm:-mt-[120px] -mt-[115px] ">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay, EffectFade]}
            className="w-full lg:max-w-lg mdmax-w-lg max-w-screen mx-5  "
          >
            {banners.map((banner, index) =>
              banner.images.map((image, imgIndex) => (
                <SwiperSlide
                  key={`${index}-${imgIndex}`}
                  className="relative pb-5"
                >
                  <img
                    src={image}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-auto  transition-opacity object-cover duration-1000 ease-in-out lg:pb-3 md:pb-2 sm:pb-2 pb-3"
                  />
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
      </div>
      {isOpenSellModel && (
        <div className="fixed inset-0  !z-40 flex  justify-center items-center ">
          <div className="flex absolute top-[20px] right-0 left-0 bottom-0 gap-2 !z-50">
            <SellForm setIsOpenSellModel={setIsOpenSellModel} />
            <div
              className="absolute !z-50 bg-[rgba(255,255,255,0.7)] top-14 right-2  cursor-pointer hover:scale-115 transition-all duration-300   !text-gray-700 rounded-md !hover:bg-gray-400"
              onClick={() => setIsOpenSellModel(false)}
            >
              <X />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
