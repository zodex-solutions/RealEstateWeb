import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import TestimonialCardCompo from "../../../components/user/testimonialCardCompo";
import Divider from "../../../components/user/divider";
import config from "../../../common/config";
import axios from "axios";

export default function Testimonials() {
  const sliderRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // console.log("testimonials", testimonials);
  const fetchTestimonials = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${config.API_URL}/api/testimonial`);
      setTestimonials(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true, // This will center the active slide
    responsive: [
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: 2,
          centerPadding: "0", // Optional: adjust this if you want a gap between slides
        },
      },
      {
        breakpoint: 1356,
        settings: {
          slidesToShow: 2,
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
        breakpoint: 695,
        settings: {
          slidesToShow: 1,
          centerPadding: "0",
        },
      },
    ],
  };
  return (
    <div className=" mx-auto max-w-[1320px pt-8 overflow-hidden">
      {testimonials.length > 0 ? (
        <div>
          <h2 className="heading  text-center mb-4 uppercase">
            Latest News & Articles
          </h2>
          <Divider />

          <div className="mt-10  relative mx-9 overflow-hidde">
            <Slider ref={sliderRef} {...settings}>
              {testimonials.map((tes, index) => (
                <div key={index} className="slick-slide">
                  <TestimonialCardCompo {...tes} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
