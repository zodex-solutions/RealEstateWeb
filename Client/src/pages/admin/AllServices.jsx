import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaEdit, FaTrash } from "react-icons/fa";
import config from "../../common/config";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/services`)
      .then((response) => setServices(response.data))
      .catch((error) =>
        console.log("Error fetching services: " + error.message)
      );
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete ");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${config.API_URL}/api/services/${id}`);
      setServices((prev) => prev.filter((item) => item._id !== id));
      alert("Service deleted successfully!");
    } catch (error) {
      alert(
        "Error deleting service: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="p-3 w-full mx-auto">
      <button
        onClick={() => navigate("/admin/add-service")}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Add New Service
      </button>

      <div className="">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Short Description</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? (
              services.map((service) => (
                <tr key={service._id} className="border">
                  <td className="border px-4 py-2 font-bold">
                    {service.title}
                  </td>
                  <td className="border px-4 py-2">{service.short_desc}</td>
                  <td className="border px-4 py-2">
                    {service.image && (
                      <img
                        src={service.image}
                        alt="Service"
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                  </td>
                  <td className="px-4 h-full py-3 justify-center gap-5 font-bold flex">
                    <FaEdit
                      onClick={() =>
                        navigate(`/admin/edit-service/${service._id}`)
                      }
                      className="cursor-pointer"
                    />
                    <FaTrash
                      onClick={() => handleDelete(service._id)}
                      className="cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No services found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllServices;
