import axios from "axios";
import dubai from "../../../assets/dubai.png";
import Divider from "../../../components/user/divider";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import config from "../../../common/config";
import { useNavigate } from "react-router";
const Partners = () => {
  const settings = {
    arrows: false, // Disable navi
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show 2 cards at a time
    slidesToScroll: 1,
    dots: true, // Enable pagination dots
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 3563,
        settings: {
          slidesToShow: 5, // Show 3 cards on larger screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1116,
        settings: {
          slidesToShow: 4, // Show 2 cards on medium screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 565,
        settings: {
          slidesToShow: 2, // Show 1 card on small screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3, // Show 1 card on small screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 2, // Show 1 card on small screens
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();

  // console.log("Developers", communities);
  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/developer`)
      .then((response) => setCommunities(response.data.data))
      .catch((error) => console.log(error.message));
  }, []);

  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <section className="bg-[#F4F4F4]">
      {communities.length > 0 ? (
        <div className=" mt-8 py-6 pb-">
          <h2 className="heading text-center mb-4 ">
            WE PARTNER WITH THE BEST
          </h2>
          <Divider />
          <div className="max-w-[1320px] mx-auto  mt-10 px-5 ">
            <div className="mb-12 mt-10 relative ">
              {/* ref={sliderRef} */}
              <Slider {...settings}>
                {communities.length > 0 &&
                  communities.map((pro, index) => (
                    <div
                      onClick={() => {
                        navigate(`/developer/${pro._id}`);

                        goTop();
                      }}
                      key={index}
                      className="slick-slid mb-5 outline-none !rounded-md"
                    >
                      <div
                        style={{
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                          border: "1px solid #fbfbfb",
                          height: "164px",
                          width: "164px",
                        }}
                        // onClick={() => setSelected(option.id)}
                        className={` mx-auto  w-[164px] h-[164px]     rounded-full  cursor-pointer `}
                      >
                        <img
                          src={pro.image}
                          alt={`Property ${index}`}
                          className="!rounded-full object-fil w-[170px] h-[164px] mb  hover:scale-[102%] transition-all duration-300 cursor-pointer"
                        />
                      </div>
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default Partners;
