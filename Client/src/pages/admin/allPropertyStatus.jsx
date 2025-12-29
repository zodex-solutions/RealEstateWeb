import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../common/config";
import { FaEdit, FaTrash } from "react-icons/fa";

function AllPropertyStatus() {
  const [propertyStatus, setPropertyStatus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/property-status`)
      .then((response) => setPropertyStatus(response.data.data))
      .catch((error) =>
        console.log("Error fetching property statuses: " + error.message)
      );
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete ");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${config.API_URL}/api/property-status/${id}`);
      setPropertyStatus((prev) => prev.filter((item) => item._id !== id));
      alert("Property status deleted successfully!");
    } catch (error) {
      alert(
        "Error deleting property status: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="p-3 w-full mx-auto">
      <button
        onClick={() => navigate("/admin/add-property-status")}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Add New Property Status
      </button>

      <div className="min-h-screen">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {propertyStatus.length > 0 ? (
              propertyStatus.map((status) => (
                <tr key={status._id} className="border">
                  <td className="border px-4 py-2 font-bold">{status.title}</td>
                  <td className="px-4 h-full py-3 justify-center gap-5 font-bold flex">
                    <FaEdit
                      onClick={() =>
                        navigate(`/admin/edit-property-status/${status._id}`)
                      }
                      className="cursor-pointer"
                    />
                    <FaTrash
                      onClick={() => handleDelete(status._id)}
                      className=" cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-4">
                  No property statuses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllPropertyStatus;
