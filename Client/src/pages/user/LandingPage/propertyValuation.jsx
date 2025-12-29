import { useEffect, useRef, useState } from "react";
import room from "../../../assets/slides.png";
import { useNavigate } from "react-router";
import axios from "axios";
import config from "../../../common/config";

const PropertyValuation = ({ allPropertiesData }) => {
  const images = new Array(10).fill(room);
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);

  // Flatten all images with their corresponding seo_title
  const allImages = allPropertiesData.flatMap((property) =>
    property.images.map((image) => ({
      image,
      seo_title: property.seo_title,
      types: property.types,
    }))
  );

  // console.log("first =====", allImages);

  useEffect(() => {
    const createInfiniteScroll = (scrollContainer, speed, delay = 0) => {
      if (!scrollContainer) return;

      const duplicateContent = () => {
        const container = scrollContainer;
        container.innerHTML += container.innerHTML; // Duplicate content to create seamless loop
      };

      duplicateContent();

      let scrollPosition = 0;

      const scroll = () => {
        if (!scrollContainer) return;

        scrollPosition += speed;
        if (scrollPosition >= scrollContainer.scrollHeight / 2) {
          scrollPosition = 0; // Reset scroll position to avoid jump
        }

        scrollContainer.scrollTop = scrollPosition;
        requestAnimationFrame(scroll);
      };

      setTimeout(scroll, delay); // Start scrolling with delay if provided
    };

    createInfiniteScroll(scrollRef1.current, 0.5);
    setTimeout(() => createInfiniteScroll(scrollRef2.current, 0.5), 4000); // 2 sec delay for second column
  }, []);

  const navigate = useNavigate();
  const handelPerticularProperty = (seoTitle) => {
    navigate(`/property/${seoTitle}`);
  };

  const shuffledImages = [...allImages].sort(() => Math.random() - 0.5);

  const [valuation, setValuation] = useState([]);

  // console.log("valuation", valuation);

  useEffect(() => {
    const fetchValuation = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/api/valuation`);
        if (response.data && response.data.data) {
          setValuation(response.data.data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchValuation();
  }, []);

  return (
    <section className="lg:ml-5 md:ml-5">
      <div className="bg-[#2F5FA7] px-5 lg:max-w-[1380px] lg:ml-auto w-[100vw] lg:h-[347px] md:h-[347px]  text-white lg:rounded-l-2xl md:rounded-l-2xl lg:flex-row md:flex-row flex-col flex justify-between items-start">
        {/* Left Side Content */}

        {valuation && (
          <div className="flex flex-col justify-center  h-full pt-5 lg:px-8">
            <div className="flex gap-8 items-sta justify-">
              <h2 className="lg:text-[40px] md:text-[40px] text-[30px]  leading-[1]">
                {valuation.title}
              </h2>
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html: valuation.description,
              }}
              className=" lg:flex md:flex hidde sm:flex xl:max-w-[50%] lg:max-w-[80%] max-w-[80 mt-2 leading-relaxed"
            />
            {/* lg:text-[17px]  md:text-[15px] text-[13px] */}
            <div className="flex gap-3 items-center justify- lg:mt-10 my-4">
              <button
                onClick={() => navigate("/listing")}
                className="lg:flex   md:flex flex lg:w-[196px] lg:h-[45px] items-center justify-center w-ful md:w-[196px] md:h-[45px] w-[130px] h-[38px]  text-white !bg-[#A9B9D6] place-items-center py-2 !rounded-[3px] font-semibold shadow-md hover:bg-gray-400 transition"
              >
                Get started
              </button>
            </div>
          </div>
        )}

        <div className=" border-t-[.5px] border-gray-100  md:w-[310px] sm:w-[310px] w-[290px]  flex lg:mr-10 xl:mr-5 md:mr-8">
          <div className="flex pl-1">
            {/* Image Sliders */}
            <div
              ref={scrollRef1}
              className="w-60  h-[347px] overflow-hidden h-[205p lg:max-w-[152px] md:max-w-[152px] sm:max-w-[152px] max-w-[132px] flex flex-col gap-5 relative  py-3 no-scrollbar mr-4"
            >
              {allImages.map((item, index) => (
                <div
                  onClick={() => handelPerticularProperty(item.seo_title)}
                  key={index}
                  className="relative"
                >
                  <div className="absolute bottom-2 left-2 bg-[rgba(255,255,255,0.7)] text-black text-sm px-2 py-1 !rounded-[5px]">
                    {item.types}
                  </div>
                  <img
                    key={index}
                    src={item.image}
                    alt={`Property ${index + 1}`}
                    className="rounded-[5px] shadow-md lg:w-[182px] lg:h-[205px] md:w-[182px] md:h-[205px] w-[132px] h-[145px] object-cover"
                  />
                </div>
              ))}
            </div>
            <div
              ref={scrollRef2}
              className="w-60  h-[347px] overflow-hidden   lg:max-w-[162px] md:max-w-[152px] sm:max-w-[152px] max-w-[132px] flex flex-col gap-5 relative  py-3 no-scrollbar "
            >
              {shuffledImages.map((item, index) => (
                <div
                  onClick={() => handelPerticularProperty(item.seo_title)}
                  key={index}
                  className="relative "
                >
                  <div className="absolute bottom-2 left-2 bg-[rgba(255,255,255,0.7)] text-black text-sm px-2 py-1 !rounded-[5px]">
                    Villa
                  </div>
                  <img
                    src={item.image}
                    alt={`Property ${index + 1}`}
                    className="rounded-[5px] shadow-md lg:w-[182px] lg:h-[205px] md:w-[182px] md:h-[205px] w-[132px] h-[145px] object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyValuation;
