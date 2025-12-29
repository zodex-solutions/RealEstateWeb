import React from "react";
import logo from "../../../assets/logo.png";
const CommingSoon = () => {
  return (
    <section className="flex flex-col items-center h-screen w-screen justify-center">
      <img src={logo} alt="logo" className="h-40" />
      <h1 className="!text-3xl font-bold text-[ uppercase">Comming Soon</h1>
    </section>
  );
};

export default CommingSoon;
