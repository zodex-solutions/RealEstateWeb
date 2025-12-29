import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../common/config";
import { FaEdit, FaTrash } from "react-icons/fa";

function AllPropertyTypes() {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/property-type`)
      .then((response) => setPropertyTypes(response.data.data))
      .catch((error) =>
        console.log("Error fetching property types: " + error.message)
      );
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete ");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${config.API_URL}/api/property-type/${id}`);
      setPropertyTypes((prev) => prev.filter((item) => item._id !== id));
      alert("Property type deleted successfully!");
    } catch (error) {
      alert(
        "Error deleting property type: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="p-3 w-full mx-auto">
      {/* <h2 className="text-xl font-semibold mb-4">All Property Types</h2> */}
      <button
        onClick={() => navigate("/admin/add-property-type")}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Add New Property Type
      </button>

      <div className="min-h-screen ">
        <table className="min-w-full bg-white border  border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {propertyTypes.length > 0 ? (
              propertyTypes.map((property) => (
                <tr key={property._id} className="border">
                  <td className="border px-4 py-2 font-bold">
                    {property.title}
                  </td>
                  <td className="border px-4 py-2">{property.description}</td>
                  <td className=" px-4 h-full py-3 justify-center gap-5 font-bold flex">
                    <FaEdit
                      onClick={() =>
                        navigate(`/admin/edit-property-type/${property._id}`)
                      }
                      className="cursor-pointer"
                    />
                    <FaTrash
                      className="cursor-pointer"
                      onClick={() => handleDelete(property._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No property types found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllPropertyTypes;
