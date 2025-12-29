import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../common/config";
import { FaEdit, FaTrash } from "react-icons/fa";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/jobs`)
      .then((response) => setJobs(response.data))
      .catch((error) => console.log("Error fetching jobs: " + error.message));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${config.API_URL}/api/jobs/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id));
      alert("Job deleted successfully!");
    } catch (error) {
      alert(
        "Error deleting job: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="p-3 w-full mx-auto">
      <button
        onClick={() => navigate("/admin/add-job")}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Add New Job
      </button>

      <div className="min-h-screen">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Experience</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <tr key={job._id} className="border">
                  <td className="border px-4 py-2 font-bold">{job.title}</td>
                  <td className="border px-4 py-2">{job.location}</td>
                  <td className="border px-4 py-2">{job.experience}</td>
                  <td className="px-4 py-3 flex justify-center gap-5 font-bold">
                    <FaEdit
                      onClick={() => navigate(`/admin/edit-job/${job._id}`)}
                      className="cursor-pointer"
                    />
                    <FaTrash
                      className="cursor-pointer"
                      onClick={() => handleDelete(job._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllJobs;
