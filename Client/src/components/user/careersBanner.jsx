import React from "react";
import bannerimage from "../../assets/bannerimage.png";
const CareersBanner = () => {
  return (
    <section className="relative bg-gradient-to-b py-10 -mt-3 from-[#2e0e0f] to-[#241c2c] text-white min-h-[350px]  flex items-center justify-center">
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-60 z-10 "></div>

      <img
        src={bannerimage}
        alt="Handshake"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="relative z-20 text-center max-w-3xl px-4">
        <h1 className="heading text-[#fff] mb-6">
          Move forward and grow in your career.
        </h1>
        <p className=" leading-relaxed mb-8 max-w-4xl ">
          Looking to build a rewarding career in real estate? Reach out to DNS
          Real Estate — we're always on the lookout for passionate, driven
          individuals to join our dynamic team. Whether you're just starting out
          or seeking your next big opportunity, we’re here to guide you.
        </p>
        <a
          href="#form"
          className="bg-white  text-white font-semibold py-3 px-6 rounded-md transition duration-300"
        >
          Apply Now
        </a>
      </div>
    </section>
  );
};

export default CareersBanner;
