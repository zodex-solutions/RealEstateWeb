import React, { useState } from "react";
import config from "../../common/config";
import axios from "axios";

const AddJobs = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    experience: "",
    description: "",
  });

  console.log("formData", formData);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${config.API_URL}/api/jobs`, formData);
      alert("Job Added Successfully");
      setFormData({
        title: "",
        location: "",
        experience: "",
        description: "",
      });

      console.log("res", res);
    } catch (error) {
      console.log("res", error);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="p-2 py-5">
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g. Software Engineer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g. Dubai, UAE"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Experience
          </label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g. No Experience Needed"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={4}
            placeholder="Write a brief job description..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJobs;
