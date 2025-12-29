import React from "react";

const Statistics = () => {
  return (
    <section className="mt-6  flex gap-7 text-lg font-semibold w-full xl:w-[90%] justify-between">
      <div className="lg:text-[40px] md:text-[40px] text-[23px] w-fit ">
        <div className="flex gap-1">
          400 <span className="text-[#7A9DC4]">+</span>
        </div>
        <span className="block text-black text-sm font-[400]">
          Happy Customers
        </span>
      </div>
      <div className="lg:text-[40px] md:text-[40px] text-[23px] w-fit">
        <div className="flex gap-1">
          {" "}
          300K <span className="text-[#7A9DC4]">+</span>{" "}
        </div>
        <span className="block text-black text-sm font-[400]">
          Property Listed
        </span>
      </div>
      <div className="lg:text-[40px] md:text-[40px] text-[23px] w-fit">
        <div className="flex gap-1">
          10 <span className="text-[#7A9DC4]">+</span>
        </div>
        <span className="block text-black text-sm font-[400]">
          Years of Experience
        </span>
      </div>
    </section>
  );
};

export default Statistics;
