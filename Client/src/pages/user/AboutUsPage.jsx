import React from "react";
import bannerimage from "../../assets/bannerimage.png";
import { Helmet } from "react-helmet";

const AboutUsPage = () => {
  return (
    <div className="bg-white text-black min-h-screen  flex flex-col items-center">
      <Helmet>
        <title>About Us | DNS RealEstate Dubai</title>
        <meta
          name="description"
          content="Learn about DNS RealEstate — a trusted real estate company in Dubai offering premium residential and commercial properties. Discover our mission, values, and experienced team."
        />
        <link rel="canonical" href="https://dnsdxb.com/about" />
      </Helmet>

      <section className="relative w-full mb-10 bg-gradient-to-b py-10 -mt-3 from-[#2e0e0f] to-[#241c2c] text-white min-h-[350px] flex items-center justify-center">
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-60 z-10 "></div>
        <img
          src={bannerimage} // Replace with actual image path
          alt="Handshake"
          className="absolute inset-0 w-full h-full object-cover z-0 "
        />
        <div className="relative z-20 text-center max-w-7xl px-4">
          <h1 className="heading text-[#fff] mb-6">
            About Us - DNS Real Estate
          </h1>
          <p className=" leading-relaxed mb-8 max-w-4xl ">
            Welcome to DNS Real Estate , your trusted partner in the world of
            real estate. Based in the heart of Dubai at IRIS Bay, Business Bay,
            we specialize in providing exceptional property services across
            Dubai and globally.
          </p>
        </div>
      </section>
      {/* <div className="max-w-7xl w-full text-center">
        <h1 className="heading text-[#2f5fa7] mb-6">
          About Us - DNS Real Estate
        </h1>
        <p className=" leading-relaxed mb-8 md:px-20 lg:px-20">
          Welcome to DNS Real Estate , your trusted partner in the world of real
          estate. Based in the heart of Dubai at IRIS Bay, Business Bay, we
          specialize in providing exceptional property services across Dubai and
          globally.
        </p>
      </div> */}
      <div className="max-w-7xl px-5 w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="subheading text-[#2f5fa7] mb-4">Who We Are</h2>
          <p className=" leading-relaxed">
            At DNS Real Estate , we are more than just a real estate agency.
            With a dedicated team of experts, we bring years of experience to
            the table, helping our clients find their perfect homes, investment
            properties, or commercial spaces.
          </p>
        </div>
        <div>
          <h2 className="subheading text-[#2f5fa7] mb-4">Our Mission</h2>
          <p className=" leading-relaxed">
            Our mission is to simplify your real estate journey by offering
            tailored solutions that meet your needs. Whether you are buying,
            selling, or renting, we ensure transparency, professionalism, and
            complete client satisfaction.
          </p>
        </div>
      </div>

      <div className="max-w-7xl w-full mt-10 px-5">
        <h2 className="subheading text-[#2f5fa7] mb-6 text-center">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="bg-[#2f5fa7] hover:scale-105 transition-all duration-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="subheading font-bold">
              Property Sales and Purchases
            </h3>
            <p>
              From luxury villas to modern apartments, we connect buyers and
              sellers seamlessly.
            </p>
          </div>
          <div className="bg-[#2f5fa7] hover:scale-105 transition-all duration-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="subheading font-bold">Renting and Leasing</h3>
            <p>
              Find your ideal rental property with our extensive listings and
              personalized assistance.
            </p>
          </div>
          <div className="bg-[#2f5fa7] hover:scale-105 transition-all duration-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="subheading font-bold">International Properties</h3>
            <p>
              Explore exclusive investment opportunities across various global
              destinations.
            </p>
          </div>
          <div className="bg-[#2f5fa7] hover:scale-105 transition-all duration-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="subheading font-bold">Property Management</h3>
            <p>
              Enjoy hassle-free ownership with our end-to-end property
              management services.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl w-full mt-10 px-5 pb-5">
        <h2 className="subheading font-semibold text-[#2f5fa7] mb-6 text-center">
          Why Choose Us?
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg leading-relaxed">
          <li className=" bg-gray-100 hover:scale-105 transition-all duration-500 p-4 rounded-lg shadow-md">
            ✔ Market Expertise: Our deep understanding of Dubai’s real estate
            market ensures you get the best deals.
          </li>
          <li className="bg-gray-100 hover:scale-105 transition-all duration-500 p-4 rounded-lg shadow-md">
            ✔ Global Network: Access prime international properties through our
            reliable partnerships.
          </li>
          <li className="bg-gray-100 hover:scale-105 transition-all duration-500 p-4 rounded-lg shadow-md">
            ✔ Client-Centric Approach: We listen to your needs and provide
            personalized solutions.
          </li>
          <li className="bg-gray-100 hover:scale-105 transition-all duration-500 p-4 rounded-lg shadow-md">
            ✔ Transparent Transactions: Integrity and honesty are at the core of
            our business.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUsPage;
