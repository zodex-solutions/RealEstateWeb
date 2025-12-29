import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../common/config";
import { FaEdit, FaTrash } from "react-icons/fa";

function AllConsultant() {
  const [consultants, setConsultants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/consultant`)
      .then((response) => setConsultants(response.data.data))
      .catch((error) =>
        console.log("Error fetching consultants: " + error.message)
      );
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete ");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${config.API_URL}/api/consultant/${id}`);
      setConsultants((prev) => prev.filter((item) => item._id !== id));
      alert("Consultant deleted successfully!");
    } catch (error) {
      alert(
        "Error deleting consultant: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="p-3 w-full mx-auto">
      <button
        onClick={() => navigate("/admin/add-consultant")}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Add New Consultant
      </button>

      <div className="">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {consultants.length > 0 ? (
              consultants.map((consultant) => (
                <tr key={consultant._id} className="border">
                  <td className=" px-4 py-3 font-bold flex items-center gap-3">
                    {/* <img
                      src={consultant.profile_pic}
                      alt={consultant.name}
                      className="h-7 w-7 rounded-full"
                    /> */}
                    {consultant.name}
                  </td>
                  <td className="border px-4 py-2">{consultant.email}</td>
                  <td className="border px-4 py-2">{consultant.phone}</td>
                  <td className="px-4 h-full py-3 justify-center items-center gap-5 font-bold flex">
                    <FaEdit
                      onClick={() =>
                        navigate(`/admin/edit-consultant/${consultant._id}`)
                      }
                      className="cursor-pointer"
                    />
                    <FaTrash
                      onClick={() => handleDelete(consultant._id)}
                      className="cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No consultants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllConsultant;
