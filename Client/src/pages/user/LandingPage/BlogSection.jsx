import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import BlogCardCompo from "../../../components/user/blogCardCompo";
import Divider from "../../../components/user/divider";
import axios from "axios";
import config from "../../../common/config";
import { useNavigate } from "react-router";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log("blogs", blogs);
  const fetchBlogs = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${config.API_URL}/api/blog`);
      setBlogs(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
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
        breakpoint: 695,
        settings: {
          slidesToShow: 1,
          centerPadding: "0",
        },
      },
    ],
  };

  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <section className="bg-[#F4F4F4] overflow-hidden">
      {blogs.length > 0 ? (
        <div className="max-w-[1320px] mx-auto  py-4 pb-14">
          <div className="px-5">
            <h2 className="lg:text-[32px] md:text-[32px] text-[25px] font-semibold mb-5 text-center">
              Posts & Blogs
            </h2>
            <Divider />
          </div>
          <div className="mt-10  relative mx-10">
            <Slider ref={sliderRef} {...settings}>
              {blogs.map((blog, index) => (
                <div key={index} className="slick-slide">
                  <BlogCardCompo {...blog} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="flex justify-center mt-4 mb-7">
        <button
          onClick={() => {
            goTop();
            navigate("/blogs");
          }}
          className="h-[49px] w-[210px] bg-[#2F5FA7] hover:scale-[102%] transition-all duration-500 text-white rounded-[5px]"
        >
          Load More
        </button>
      </div>
    </section>
  );
};

export default BlogSection;
