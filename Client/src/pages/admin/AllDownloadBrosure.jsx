import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import config from "../../common/config";

function AllBrochureInquiries() {
  const [brochures, setBrochures] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/brochure`)
      .then((response) => setBrochures(response.data))
      .catch((error) => console.log(error.message));
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this brochure inquiry?"
    );
    if (!isConfirmed) return;

    try {
      await axios.delete(`${config.API_URL}/api/brochure/${id}`);
      setBrochures((prev) => prev.filter((item) => item._id !== id));
      alert("Brochure inquiry deleted successfully!");
    } catch (error) {
      alert(
        "Error deleting brochure inquiry: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="p-3 w-full mx-auto">
      <div className="min-h-screen">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Mobile Number</th>
              <th className="border px-4 py-2">Property</th>
              <th className="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {brochures.length > 0 ? (
              brochures.map((item) => (
                <tr key={item._id} className="border">
                  <td className="border px-4 py-2 font-bold">{item.name}</td>
                  <td className="border px-4 py-2">{item.email}</td>
                  <td className="border px-4 py-2 flex gap-2 border-none">
                    {item.countryCode}
                    {item.phone}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    <a target="_blank" href={item.property}>
                      View Property
                    </a>
                  </td>
                  <td className="px-4 py-3 flex justify-center gap-5 font-bold">
                    <FaTrash
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                      className="cursor-pointer text-red-600"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No brochure inquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllBrochureInquiries;
