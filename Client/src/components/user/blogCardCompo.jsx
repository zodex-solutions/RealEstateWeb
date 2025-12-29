import React, { use } from "react";
import { useNavigate } from "react-router";

const BlogCardCompo = ({
  image,
  date,
  title,
  description,
  link,
  createdAt,
  seo_title,
  category_id,
}) => {
  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-lg  rounded-[5px] overflow-hidden  mx-3">
      <div className="relative p-4">
        <img
          src={image}
          alt={title}
          className="w-full h-[216px] object-cover rounded-[5px]"
        />
        <div className="absolute top-6 left-6 bg-[rgba(255,255,255,0.7)] px-3 py-1 rounded-[5px] text-sm font-semibold shadow-md">
          {new Date(createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
          })}
        </div>
        <div className="absolute bottom-6 right-6 bg-[rgba(255,255,255,0.7)] px-3 py-1 rounded-[5px] text-sm font-semibold shadow-md">
          {category_id?.title}
        </div>
      </div>
      <div className="px-4 pb-4">
        <h3 className="font-bold text-[15px]">{title}</h3>

        {/* <div
          className="text-gray-600 text-[11px] mt-2 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html:
              description.split(" ").slice(0, 30).join(" ") +
              (description.split(" ").length > 30 ? "..." : ""),
          }}
        /> */}
        <div className="flex justify-between items-center mt-3">
          <a
            onClick={() => {
              goTop();
              navigate(`/Blog/${seo_title}`);
            }}
            // href={`/Blog/${seo_title}`}
            className="text-blue-600 text-[14px] cursor-pointer font-semibold inline-block"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogCardCompo;
