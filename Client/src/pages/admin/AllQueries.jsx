import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../common/config";
import { FaTrash } from "react-icons/fa";

function AllQueries() {
  const [queries, setQueries] = useState([]);

  const navigate = useNavigate();
  console.log("queries", queries);
  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/queries`)
      .then((response) => setQueries(response.data))
      .catch((error) => console.log(error.message));
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this brochure inquiry?"
    );
    if (!isConfirmed) return;

    try {
      await axios.delete(`${config.API_URL}/api/queries/${id}`);
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
    <div className="p-3 w-full mx-auto">
      <div className="min-h-screen">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {queries.length > 0 ? (
              queries.map((query) => (
                <tr key={query._id} className="border">
                  <td className="border px-4 py-2 font-bold">{query.name}</td>
                  <td className="border px-4 py-2">{query.email}</td>
                  <td className="border px-4 py-2">{query.subject}</td>
                  <td className="border px-4 py-2">{query.phone}</td>
                  <td className="border px-4 py-2">{query.message}</td>
                  <td className="px-4 h-full py-3 justify-center gap-5 font-bold flex">
                    <FaTrash
                      onClick={() => handleDelete(query._id)}
                      className="cursor-pointer "
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
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

export default AllQueries;
