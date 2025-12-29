import React from "react";
import { MapPin, Ban } from "lucide-react";

const JobCard = ({ job, onViewDetails }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 flex flex-col gap-4 justify-between shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800">{job.title}</h3>
          <div className="flex gap-4 text-sm text-gray-500 mt-2">
            <span className="flex items-center gap-1">
              <MapPin size={16} /> {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Ban size={16} /> {job.experience}
            </span>
          </div>
        </div>
        <a
          href="#form"
          // onClick={() => onViewDetails(job._id)}
          className="border uppercase !text-sm border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 transition"
        >
          Apply Now →
        </a>
      </div>
      <p className="!text-sm !text-gray-500">{job.description}</p>
    </div>
  );
};

export default JobCard;
