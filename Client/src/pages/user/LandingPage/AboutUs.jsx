import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

import health from "../../../assets/health.png";
import plane from "../../../assets/plane.png";
import glass from "../../../assets/glass.png";
import axios from "axios";
import config from "../../../common/config";
import LottieImageCompo from "../../../components/common/LottieImages";
import { IoAdd, IoRemove } from "react-icons/io5";

const images = [
  { id: 1, image: health },
  { id: 2, image: plane },
  { id: 3, image: glass },
  { id: 4, image: health },
  { id: 5, image: plane },
  { id: 6, image: glass },
];

const AboutUs = () => {
  const sliderRef = useRef(null);

  const [aboutUs, setAboutUs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // console.log("aboutUs", aboutUs);
  const fetchAboutUs = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${config.API_URL}/api/about-us`);
      setAboutUs(response.data.data);
    } catch (err) {
      console.log(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAboutUs();
  }, []);

  const [whyChooseUs, setWhyChooseUs] = useState(null);

  // console.log("whyChooseUs", whyChooseUs);
  const fetchwhyChooseUs = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${config.API_URL}/api/why-chose`);
      setWhyChooseUs(response.data.data);
    } catch (err) {
      console.log(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchwhyChooseUs();
  }, []);
  const settings = {
    arrows: false, // Disable navigation
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set autoplay speed in milliseconds (3 seconds)
    responsive: [
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: 3,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 1356,
        settings: {
          slidesToShow: 3,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 1044,
        settings: {
          slidesToShow: 2,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 695,
        settings: {
          slidesToShow: 2,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 469,
        settings: {
          slidesToShow: 1,
          centerPadding: "0",
        },
      },
    ],
  };

  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/api/faqs`);
        setFaqs(response.data.data);
        // console.log(response.data);
      } catch (error) {
        setError("Failed to fetch FAQs");
      }
      setLoading(false);
    };
    fetchFaqs();
  }, []);

  return (
    <section className="bg-[#2F5FA7]">
      <div className="max-w-[1320px] mx-auto px-5">
        {aboutUs ? (
          <div className="grid grid-cols-1 text-white gap-4 lg:grid-cols-2 md:grid-cols-2 py-16">
            <div className="">
              <h2 className="heading inline-block md:text-4xl pb-1">
                About DNS
              </h2>
              <div className="border-2 border-white w-[101px] mb-2"></div>
              <div
                dangerouslySetInnerHTML={{ __html: aboutUs.long_description }}
                className="text-[14px] lg:max-w-lg md:max-w-md mt-4"
              />
              <button className="h-[49px] shadow-md !text-[#2f5fa7] w-[156px] !bg-white !rounded-[5px] font-semibold hover:bg-gray-200 mt-6 px-6 py-2">
                Know more →
              </button>
            </div>
            <div>
              {faqs.length > 0 &&
                faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-300">
                    <a
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex justify-between cursor-pointer !text-white items-center py-5 lg:text-[20px] md:text-[20px] sm:text-[18px] text-[15px] font-normal  focus:outline-none"
                    >
                      {faq.question}
                      {openIndex === index ? (
                        <IoRemove className="text-2xl text-[#fff]" />
                      ) : (
                        <IoAdd className="text-2xl text-[#fff]" />
                      )}
                    </a>
                    {openIndex === index && (
                      <div className="pb-5 text-gray-300 lg:text-[18px] md:text-[18px] sm:text-[15px] text-[13px] leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
            </div>
            {/* <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 md:grid-cols-2">
              {["01", "02", "03", "04"].map((num, index) => {
                const descriptions = [
                  aboutUs.first_dec,
                  aboutUs.second_dec,
                  aboutUs.third_dec,
                  aboutUs.fourth_dec,
                ];

                return (
                  <div key={num} className="text-white">
                    <h3 className="heading !font-[700]">{num}</h3>
                    <p
                      dangerouslySetInnerHTML={{ __html: descriptions[index] }}
                      className="text-[12px] mt-2"
                    />
                  </div>
                );
              })}
            </div> */}
          </div>
        ) : (
          <></>
        )}
        <div className="border-b-[.5px] border-gray-100/50 w-full max-w-7xl mx-auto"></div>
        {whyChooseUs ? (
          <div className="flex  flex-col-reverse text-white gap-2 lg:flex-row md:flex- pb-10 pt-4">
            <div className="w-full lg:max-w-1/2 my-12  relative">
              <Slider ref={sliderRef} {...settings}>
                {whyChooseUs.small_features.map((icon, index) => (
                  <div key={index} className="px-2  pb-5">
                    <div className="flex flex-col justify-center items-center ">
                      <LottieImageCompo
                        url={icon.image}
                        alt={`Slide ${index}`}
                        className="h-24"
                      />
                      <p
                        dangerouslySetInnerHTML={{ __html: icon.description }}
                        className="list-disc text-center list-inside text-[10px] mt-4 space-y-"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <div className="text-start">
              <h2 className="heading inline-bloc lg::text-4xl">
                Why Choose Us
              </h2>
              <div className="border-2 border-white w-[101px] mb-2 "></div>
              <p
                dangerouslySetInnerHTML={{ __html: whyChooseUs.description }}
                className="text-[14px] text-start  mt-4"
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default AboutUs;
