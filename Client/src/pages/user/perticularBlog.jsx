import React, { useEffect, useState } from "react";
import Banner from "../../assets/Banner.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BlogCardCompo from "../../components/user/blogCardCompo";
import property from "../../assets/property.png";
import QueryForm from "../../components/user/QueryForm";
import axios from "axios";
import config from "../../common/config";
import { useParams } from "react-router-dom"; // If using React Router
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaTiktok,
  FaXing,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Instagram } from "lucide-react";
import { Helmet } from "react-helmet";

const PerticularBlog = () => {
  const { seoTitle } = useParams(); // Get the SEO title from URL params
  console.log("seoTitle:", seoTitle);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // console.log(blogs);
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

  const settings = {
    arrows: false, // Disable navi
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show 2 cards at a time
    slidesToScroll: 1,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [blog, setBlog] = useState(null);

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  console.log("blog :", blog);
  const fetchBlog = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `${config.API_URL}/api/blog/seo/${seoTitle}`
      );

      console.log(response);
      setBlog(response.data.data);
    } catch (err) {
      console.log(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [seoTitle]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          text: "I found something cool you should see!",
          url: window.location.href, // or any URL you want to share
        });
      } catch (err) {
        console.error("Sharing failed:", err);
      }
    } else {
      alert("Share not supported in this browser.");
    }
  };
  return (
    <div className="max-w-[1450px] mx-auto p-4 lg:mt-0 md:mt-0 -mt-10">
      <Helmet>
        <title>
          {blog?.seo_title
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())}
        </title>

        <meta name="description" content={blog?.description} />
        <link
          rel="canonical"
          href={`https://dnsdxb.com/Blog/${blog?.seo_title}`}
        />
      </Helmet>
      <div className="grid lg:grid-cols-[1fr_500px] grid-cols-1 gap-6 items-center mt-5">
        <img
          src={blog?.image}
          alt="Blog Image"
          className="   w-full rounded "
        />
        <div className="  lg:space-y-4 md:space-y-3 space-y-2 text-base">
          <div className="flex items-center space-x-2">
            <span className="text-[#2f5fa7] lg:text-lg md:text-lg text-sm font-semibold">
              Date:
            </span>
            <span className="font-semibold lg:text-lg md:text-lg text-sm text-gray-800">
              {new Date(blog?.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[#2f5fa7] lg:text-lg md:text-lg text-sm font-semibold">
              Event:
            </span>
            <span className="font-semibold lg:text-lg md:text-lg text-sm text-gray-800">
              Blog
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[#2f5fa7] lg:text-lg md:text-lg text-sm  font-semibold">
              Category:
            </span>
            <span className="lg:text-lg md:!text-lg !text-sm font-semibold text-gray-800">
              {blog?.category_id?.title}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-[#2f5fa7] lg:text-lg md:text-lg text-sm font-semibold">
              Share:
            </span>
            <div className="flex items-center space-x-3">
              <a
                className="!text-black text-2xl"
                target="_black"
                href="https://www.facebook.com/share/166V9h7bXp/?mibextid=LQQJ4d"
                aria-label="Share on Facebook"
              >
                <FaFacebookF className="text-[#2f5fa7] text-xl " />
              </a>

              <a
                className="!text-black text-2xl"
                target="_black"
                href="https://www.instagram.com/dns.realestate?igsh=dWdzaDRnc29qcnR0"
                aria-label="Share on Instagram"
              >
                <FaInstagram className="text-[#2f5fa7] text-xl" />
              </a>

              <a
                className="!text-black text-2xl"
                target="_black"
                href="https://www.linkedin.com/company/dns-real-estate-l-l-c/"
                aria-label="Share on LinkedIn"
              >
                <FaLinkedinIn className="text-[#2f5fa7] text-xl" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <a
              href="https://wa.me/971527186972"
              title="Whatsapp Api Link"
              target="_black"
              className="flex items-center justify-center gap-2 cursor-pointer hover:scale-[101%] transition-all duration-300  !bg-green-500 !text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              <FaWhatsapp className="text-xl" />
              Whatsapp
            </a>
            <a
              href="mailto:?subject=Check%20this%20out&body=I%20thought%20you%20might%20like%20this!"
              className="flex items-center justify-center gap-2 cursor-pointer hover:scale-[101%] transition-all duration-300 !bg-blue-900 !text-white px-4 py-2 rounded-md hover:bg-blue-950"
            >
              <MdEmail className="text-xl" />
              Email
            </a>
          </div>
        </div>
      </div>
      <div className="grid mt-5 lg:grid-cols-[60%_1fr] md:grid-cols-1  sm:grid-cols-1 grid-cols-1  gap-6">
        {/* Blog Content */}
        <div className="md:col-span-">
          {blog ? (
            <div className=" bg-white lg:p-5 lg:rounded-[5px] lg:shadow-lg  pb-5">
              <h1 className="heading font-bold mb-4">{blog.title}</h1>

              <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.description }}
              />

              {/* <p className="text-gray-700 leading-relaxed mt-3">
                Veterinary Medicine Research Paper Topics
              </p> */}

              {/* <ol class="space-y-1 text-gray-700 mt-3">
                <li class="list-inside list-decimal">
                  Diseases: Describe the most common illnesses among pets.
                </li>
                <li class="list-inside list-decimal">
                  Is human food safe for animals? Explain.
                </li>
                <li class="list-inside list-decimal">
                  How essential are vaccinations for pets?
                </li>
                <li class="list-inside list-decimal">
                  The health of pets with climate change: Talk about the
                  effects.
                </li>
                <li class="list-inside list-decimal">
                  Comparative oncology: What is it?
                </li>
                <li class="list-inside list-decimal">
                  What diseases can pets transmit to humans? How can you keep
                  yourself safe? Discuss.
                </li>
                <li class="list-inside list-decimal">
                  Farm animals: How to care for them?
                </li>
                <li class="list-inside list-decimal">
                  Explain the effects in terms of parasitology.
                </li>
                <li class="list-inside list-decimal">
                  Describe the behaviour issues that pets have and how to solve
                  them.
                </li>
                <li class="list-inside list-decimal">
                  Describe the various types of pet therapy.
                </li>
                <li class="list-inside list-decimal">
                  What is veterinary telemedicine? Explain.
                </li>
                <li class="list-inside list-decimal">
                  What is a health strategy? Discuss.
                </li>
                <li class="list-inside list-decimal">
                  How significant are animal nutrition and diet? Explain.
                </li>
                <li class="list-inside list-decimal">
                  Infection illnesses: Explain the various sorts of sickness.
                </li>
              </ol> */}
              <div className="border-b-2 border-[#7A9DC4]  my-5"></div>

              {blogs.length > 1 ? (
                <div>
                  <h2 className="subheading ">More Related Blogs</h2>
                  <div className="max-w-screen-xl mx-auto pb-10 px-0">
                    <Slider {...settings}>
                      {blogs.map((blog, index) => (
                        <div key={index} className="slick-slide  my-5">
                          <BlogCardCompo {...blog} />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            "Loading..."
          )}
        </div>

        {/* Contact Form Section */}
        <div>
          <QueryForm />
        </div>
      </div>
    </div>
  );
};

export default PerticularBlog;
