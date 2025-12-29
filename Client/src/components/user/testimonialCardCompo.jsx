import React from "react";

const TestimonialCardCompo = ({
  id,
  image,
  name,
  profession,
  description,
  last_villa,
}) => {
  return (
    <div className="w-full text-center md:text-left pb-20 px-5">
      <div className="relative text-center">
        <span className="text-5xl text-[#2F5FA7] absolute -top-3 left-10">
          “
        </span>
        <div className="mt-6 flex  w-full text-center flex-col items-center md:items-start">
          <div className="text-center flex items-center justify-center w-full mb-2">
            <p className="bg-white font-medium text-[10px] py-1.5 px-2 shadow-xl border border-gray-100 rounded">
              {last_villa}
            </p>
          </div>
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-full mx-auto border-black-500"
          />
          <p className="mt-2 text-lg text-center mx-auto font-semibold text-gray-900">
            {name}
          </p>
          <p className="mx-auto text-[10px] font-normal mb-3">{profession}</p>
        </div>
        <div
          className="text-gray-700 text-lg italic  leading-relaxed max-w-xl mx-auto"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {/* <p className="text-gray-700 text-lg italic  leading-relaxed max-w-xl mx-auto">
          {description}
        </p> */}
        <span className="text-5xl text-[#2F5FA7] absolute -bottom-12 right-4">
          ”
        </span>
      </div>
    </div>
  );
};

export default TestimonialCardCompo;
