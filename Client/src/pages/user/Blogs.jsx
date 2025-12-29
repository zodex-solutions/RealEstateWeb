import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import config from "../../common/config";
import bannerimage from "../../assets/bannerimage.png";
import BlogCardCompo from "../../components/user/blogCardCompo";
import { Helmet } from "react-helmet";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBlogs = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${config.API_URL}/api/blog`);
      const data = response.data.data || [];

      setBlogs(data);
      setFilteredBlogs(data);

      // Extract unique categories based on category_id.title
      const categoryMap = {};
      data.forEach((blog) => {
        const category = blog.category_id?.title;
        if (category && !categoryMap[category]) {
          categoryMap[category] = {
            label: category,
            value: category,
          };
        }
      });

      const categoryOptions = Object.values(categoryMap);
      setCategories([
        { label: "All Categories", value: "all" },
        ...categoryOptions,
      ]);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);

    if (selectedOption.value === "all") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(
        (blog) => blog.category_id?.title === selectedOption.value
      );
      setFilteredBlogs(filtered);
    }
  };

  return (
    <div className="bg-white text-black min-h-screen flex flex-col items-center">
      <Helmet>
        <title>Expert Blogs on Dubai Real Estate | DNS RealEstate</title>
        <meta
          name="description"
          content="Explore expert insights, tips, and trends in the Dubai real estate market. Stay updated with DNS RealEstate's latest blogs on buying, selling, and investing in properties."
        />
        <link rel="canonical" href={`https://dnsdxb.com/blogs}`} />
      </Helmet>
      {/* Banner Section */}
      <section className="relative w-full mb-10 bg-gradient-to-b py-10 -mt-3 from-[#2e0e0f] to-[#241c2c] text-white min-h-[350px] flex items-center justify-center">
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] z-10"></div>
        <img
          src={bannerimage}
          alt="Blogs Banner"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="relative z-20 text-center max-w-7xl px-4">
          <h1 className="heading text-white mb-6">Blogs & News</h1>
          <p className="leading-relaxed mb-8 max-w-xl mx-auto">
            Stay updated with the latest insights, trends, and news in the world
            of real estate. From market analysis to investment tips, our blog
            keeps you informed and empowered.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <div className="w-full flex lg:flex-row md:flex-row  sm:flex-row gap-5 flex-col-reverse justify-between lg:items-center md:items-center sm:items-center max-w-7xl px-7 mb-10">
        <p className="text-[14px] min-w-20 !font-bold  text-[#7A9DC3]">
          Found: {filteredBlogs.length}{" "}
        </p>
        <Select
          options={categories}
          value={selectedCategory}
          onChange={handleCategoryChange}
          placeholder="Filter by category"
          className="w-full md:w-1/2"
        />
      </div>

      {/* Blog Section */}
      <div className="w-full max-w-7xl px-4 pb-20">
        {loading && <p className="text-center">Loading blogs...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && filteredBlogs.length === 0 && !error && (
          <p className="text-center">No blogs found.</p>
        )}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog, index) => (
            <BlogCardCompo key={index} {...blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
