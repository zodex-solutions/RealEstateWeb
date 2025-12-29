import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../common/config";
import { FaEdit, FaTrash } from "react-icons/fa";

function AllProperties() {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/property`)
      .then((response) => setProperties(response.data.data))
      .catch((error) =>
        console.log("Error fetching properties: " + error.message)
      );
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${config.API_URL}/api/property/${id}`);
      setProperties((prev) => prev.filter((item) => item._id !== id));
      alert("Property deleted successfully!");
    } catch (error) {
      alert(
        "Error deleting property: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-3 w-full mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate("/admin/add-property")}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Add New Property
        </button>
        <input
          type="text"
          placeholder="Search by Title"
          className="border px-4 py-2 rounded-md w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="min-h-screen">
        <table className="min-w-full bg-white border border-gray-300 cursor-pointer">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">S.No.</th>
              <th className="border px-4 py-2 w-10">Title</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property, index) => (
                <tr key={property._id} className="border">
                  <td className="border px-4 py-2 font-bold">{index + 1}</td>
                  <td className="border font-bold !min-w-[250px] px-4 py-2 whitespace-nowrap overflow-x-scroll overflow-y-hidden scrollbar-hide">
                    {property.title}
                  </td>
                  <td className="border px-4 py-2">
                    {/* </td> */}
                    {/* <td className="border !max-w-[100px] !min-w-[600px] px-4 py-2 whitespace-nowrap overflow-x-scroll overflow-y-hidden scrollbar-hide"> */}
                    {property.location}
                  </td>
                  <td className="border px-4 py-2">
                    {property?.property_type?.title}
                  </td>
                  <td className="border px-4 py-2">
                    {property?.property_status?.title}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap overflow-auto text-ellipsis">
                    AED {property.price}
                  </td>
                  <td className="px-4 h-full py-3 justify-center gap-5 font-bold flex">
                    <FaEdit
                      className="cursor-pointer"
                      onClick={() =>
                        navigate(`/admin/edit-property/${property._id}`)
                      }
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
                <td colSpan="7" className="text-center py-4">
                  No properties found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllProperties;
