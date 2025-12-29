import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Divider from "../../components/user/divider";
import config from "../../common/config";
import axios from "axios";
import { useParams } from "react-router";
import SmallPropertyComponent from "../../components/user/SmallPropertyComponent";
import LottieImageCompo from "../../components/common/LottieImages";
const PerticularCommunities = () => {
  const { id } = useParams();
  console.log("first :", id);
  const sliderRef = useRef(null);
  const [allProperties, setAllProperties] = useState([]);

  const OptionsSettings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true, // This will center the active slide
    responsive: [
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: 5,
          centerPadding: "0", // Optional: adjust this if you want a gap between slides
        },
      },
      {
        breakpoint: 1356,
        settings: {
          slidesToShow: 5,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 1044,
        settings: {
          slidesToShow: 4,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 835,
        settings: {
          slidesToShow: 3,
          centerPadding: "0",
        },
      },

      {
        breakpoint: 630,
        settings: {
          slidesToShow: 2,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 490,
        settings: {
          slidesToShow: 1,
          centerPadding: "0",
        },
      },
    ],
  };
  const AmenSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    // arrows: false,
    centerMode: true, // This will center the active slide
    responsive: [
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: 5,
          centerPadding: "0", // Optional: adjust this if you want a gap between slides
        },
      },
      {
        breakpoint: 1356,
        settings: {
          slidesToShow: 5,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 1044,
        settings: {
          slidesToShow: 4,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 835,
        settings: {
          slidesToShow: 3,
          centerPadding: "0",
        },
      },

      {
        breakpoint: 630,
        settings: {
          slidesToShow: 2,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 490,
        settings: {
          slidesToShow: 1,
          centerPadding: "0",
        },
      },
    ],
  };
  const ImagesSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true, // This will center the active slide
    responsive: [
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: 4,
          centerPadding: "0", // Optional: adjust this if you want a gap between slides
        },
      },
      {
        breakpoint: 1356,
        settings: {
          slidesToShow: 4,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 1044,
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
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          centerPadding: "0",
        },
      },
    ],
  };

  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeTab, setActiveTab] = useState("map");

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const [community, setCommunity] = useState();

  const fetchCommunity = async (id) => {
    if (!id) {
      console.error("Community ID is required");
      return;
    }

    try {
      const response = await axios.get(
        `${config.API_URL}/api/communities/${id}`
      );
      setCommunity(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching community:",
        error.response?.data || error.message
      );
    }
  };

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

  useEffect(() => {
    fetchCommunity(id);
  }, [id]);

  console.log(community);
  const [properties, setProperties] = useState([]);

  console.log("properties", properties);

  const matchingDev = allProperties?.filter(
    (dev) =>
      dev?.developers?.title?.toLowerCase() === developer?.title?.toLowerCase()
  );

  console.log("com", matchingDev);

  return (
    <section className="overflow-hidden">
      {community ? (
        <div>
          <div className="p-6 -mt-10 lg:mt-0 max-w-[1320px] md:mt-0 mx-auto ">
            <h2 className="heading text-center font-bold my-8">
              DUBAI PROPERTIES
            </h2>
            <div
              className="text-gray-700   max-w-5xl text-center mx-auto"
              dangerouslySetInnerHTML={{ __html: community?.description }}
            />

            {community.length > 0 &&
              community.image.map((pro, index) => (
                <div key={index} className="slick-slide">
                  <img
                    src={pro.image}
                    alt="Property"
                    className="rounded-[5px] w-[100%] h-52 mb-4 object-cover px-1"
                  />
                </div>
              ))}
            <div className="mb-12 mt-10 relative ">
              <Slider ref={sliderRef} {...ImagesSettings}>
                {community?.image?.length > 0 &&
                  community.image.map((pro, index) => (
                    <div
                      key={index}
                      className="slick-slide mb-3 !outline-none "
                    >
                      <img
                        src={pro.image}
                        alt={`Property ${index}`}
                        className="rounded-[5px] w-[100%] h-60 mb object-cover px-2 hover:scale-[102%] transition-all duration-300 cursor-pointer"
                      />
                    </div>
                  ))}
              </Slider>
            </div>
          </div>

          {/* Hignlights */}
          <div className="max-w-[1320px] mx-auto px-5">
            <h2 className="heading text-center  mb-4  mt-5">HIGHLIGHTS</h2>
            <Divider />
            <div className="mb-16 ml-2 mt-10 mx- relative">
              <Slider ref={sliderRef} {...OptionsSettings}>
                {community.highlights.map((option, index) => (
                  <div key={index} className="slick-slide">
                    <div
                      onClick={() => setSelected(option.id)}
                      className={`PerCommHighSwipp flex flex-col  items-center justify-center gap-2 w-[95%] h-[198px]   px-3  rounded-lg transition-all duration-500  cursor-pointer
                  bg-whit hover:shadow-lg border border-[#A9B9D6]`}
                    >
                      <LottieImageCompo
                        url={option.highlights_img}
                        alt={option.title}
                        className={"h-24"}
                      />

                      {/* <img src={option.highlights_img} className="px-8" /> */}
                      <span className="text-center text-gray-600 font-medium">
                        {option.title}
                      </span>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          <div className="max-w-[1320px] mx-auto px-5 ">
            <h2 className="heading text-center  mb-4  mt-5">AMENITIES</h2>
            <Divider />
            <div className="mb-16 mt-10 mx-12 relativ">
              {" "}
              <Slider ref={sliderRef} {...AmenSettings}>
                {community.amenities.map((option, index) => (
                  <div key={index} className="slick-slide">
                    <div
                      onClick={() => setSelected(option.id)}
                      className={` flex flex-col mx-auto  items-center justify-center gap-2 w-[164px] h-[164px]     rounded-full transition-all duration-500  cursor-pointer
                  bg-whit hover:shadow-lg border border-[#A9B9D6] mb-2`}
                    >
                      <LottieImageCompo
                        url={option.amenities_img}
                        alt={option.title}
                        className={"h-24"}
                      />

                      {/* <img src={option.amenities_img} className="px-" /> */}
                    </div>
                    <div className="flex justify-center text-cente text-gray-600 font-medium items-center mx-auto">
                      {option.title}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <Divider />

          <h2 className="heading text-center  mb-4  mt-5">
            AVAILABLE PROPERTIES{" "}
          </h2>

          {/* Rent Property status */}
          <section className="bg-[#F4F4F4] mt-12 ">
            <div className="max-w-[1320px] mx-auto pb-14 py-5">
              <p className=" subheading mb-1  px-5">RENT</p>
              <span className="flex border-[#A9B9D6] border-b-[3px] w-[150px] mb-8 mx-5"></span>
              <SmallPropertyComponent
                Status={"Rent"}
                matchingDev={matchingDev}
              />
            </div>
          </section>

          <div className="mt-10">
            <Divider />
          </div>
          <section className="bg-[#F4F4F4] mt-12">
            <div className="max-w-[1320px] mx-auto pb-14 py-5">
              <p className="subheading mb-1 px-5">BUY</p>
              <span className="flex border-[#A9B9D6] border-b-[3px] w-[150px] mb-8 mx-5"></span>
              <SmallPropertyComponent
                Status={"Buy"}
                matchingDev={matchingDev}
              />
            </div>
          </section>
        </div>
      ) : (
        "Loading..."
      )}
    </section>
  );
};

export default PerticularCommunities;
