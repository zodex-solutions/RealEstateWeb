import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../common/config";

import { useNavigate } from "react-router-dom";

import { MapPin, Ban } from "lucide-react";
import team from "../../assets/team.avif";
import JobCard from "./jobCard";
const HiringSection = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/jobs`)
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Failed to fetch jobs", err));
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/jobs/${id}`);
  };
  return (
    <section id="vacancies" className="bg-gray-50 py-12 px-4">
      {/* Header */}
      <div className="text-center ">
        <h2 className="subheading  text-[#2f5fa7]">
          We Are Hiring
          <span className="text-[#2f5fa7]">!</span>
        </h2>
        <p className="text-sm md:text-base mt-2 text-gray-600 max-w-xl mx-auto">
          Discover exciting opportunities that align with your skills and
          aspirations at DNS Real Estates.
        </p>
      </div>

      {/* Job Listings */}
      {/* <div className="space-y-4 max-w-7xl mx-auto">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} onViewDetails={handleViewDetails} />
        ))}
      </div> */}

      {/* Culture Section */}
      <div className="grid md:grid-cols-2 items-center gap-10 mt-20 max-w-7xl mx-auto">
        <img
          src={team}
          alt="DNS Team"
          className="w-full h-auto rounded-xl shadow-md object-cover"
        />
        <div>
          <h3 className="subheading text-[#2f5fa7] mb-4 leading-snug">
            At DNS Real Estates, we’re not just a team – <br /> we’re a family.
          </h3>
          <p className=" text-gray-700 mb-4">
            At DNS, we blend passion with purpose. We celebrate every win and
            support each other through every challenge. From daily collaboration
            to career mentoring, our culture is rooted in unity and growth.
          </p>
          <p className=" text-gray-700 mb-6">
            Looking to take the next big step in your career? Join DNS Real
            Estates and be part of a company where your contributions matter.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HiringSection;
