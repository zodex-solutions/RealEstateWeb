import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../common/config";
import { FaTrash } from "react-icons/fa";

function AllContactQueries() {
  const [queries, setQueries] = useState([]);

  const navigate = useNavigate();
  console.log("contactQueries", queries);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/contactQueries`)
      .then((response) => setQueries(response.data))
      .catch((error) => console.log(error.message));
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this inquiry?"
    );
    if (!isConfirmed) return;

    try {
      await axios.delete(`${config.API_URL}/api/contactQueries/${id}`);
      setQueries((prev) => prev.filter((query) => query._id !== id));
      alert("Query deleted successfully!");
    } catch (error) {
      alert(
        "Error deleting query: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="p-3 w-full mx-auto overflow-x-auto">
      <div className="">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-sm">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-4 py-2">Bedroom</th>
              <th className="border px-4 py-2">Property Type</th>
              <th className="border px-4 py-2">Investment Reason</th>
              <th className="border px-4 py-2 min-w-20">Live in UAE</th>
              <th className="border px-4 py-2">Resident in UAE</th>
              <th className="border px-4 py-2">Nationality</th>
              {/* <th className="border px-4 py-2">Currency</th> */}
              {/* <th className="border px-4 py-2">Created At</th> */}
              <th className="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {queries.length > 0 ? (
              queries.map((query) => (
                <tr key={query._id} className="border text-sm">
                  <td className="border px-4 py-2 font-semibold">
                    {query.name}
                  </td>
                  <td className="border px-4 py-2">{query.email}</td>
                  <td className="border px-4 py-2 min-w-52">
                    {query.currency} {query.phone}
                  </td>
                  <td className="border px-4 py-2 min-w-80">{query.message}</td>

                  <td className="border px-4 py-2 min-w-52">
                    {query.bedroom?.join(", ")}
                  </td>
                  <td className="border px-4 py-2">
                    {query.property_type?.join(", ")}
                  </td>
                  <td className="border px-4 py-2">
                    {query.investment_reason?.join(", ")}
                  </td>
                  <td className="border px-4 py-2">
                    {query.live_in_uae ? "Yes" : "No"}
                  </td>
                  <td className="border px-4 py-2">
                    {query.resident_uae ? "Yes" : "No"}
                  </td>
                  <td className="border px-4 py-2">{query.nationality}</td>
                  {/* <td className="border px-4 py-2">{query.currency}</td> */}
                  {/* <td className="border px-4 py-2">
                    {new Date(query.createdAt).toLocaleString()}
                  </td> */}
                  <td className="px-4 py-2 flex justify-center">
                    <FaTrash
                      onClick={() => handleDelete(query._id)}
                      className="cursor-pointer text-red-600"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14" className="text-center py-4">
                  No queries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllContactQueries;
