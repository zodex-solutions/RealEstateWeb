import React from "react";
import { CiHome } from "react-icons/ci";
import home from "../../assets/homeicon.png";
const Divider = () => {
  return (
    <section className="w-full px-5">
      <div className="max-w-[400px] mx-auto border-[.7px] border-[#A9B9D6] relative">
        <span className="flex h-[30px] items-center justify-center w-[30px] border-2 border-[#A9B9D6] bg-white absolute left-1/2 transform -translate-x-1/2 -bottom-[15px] rounded-full">
          <img src={home} alt="home icon" />
        </span>
      </div>
    </section>
  );
};

export default Divider;
