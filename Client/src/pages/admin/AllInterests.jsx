import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../common/config";
import { FaEdit, FaTrash } from "react-icons/fa";
import LottieImageCompo from "../../components/common/LottieImages";

function AllInterests() {
  const [interests, setInterests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/intrest`)
      .then((response) => setInterests(response.data.data))
      .catch((error) =>
        console.log("Error fetching interests: " + error.message)
      );
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete ");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${config.API_URL}/api/intrest/${id}`);
      setInterests((prev) => prev.filter((item) => item._id !== id));
      alert("Interest deleted successfully!");
    } catch (error) {
      alert(
        "Error deleting interest: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="p-3 w-full mx-auto">
      <button
        onClick={() => navigate("/admin/add-interest")}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Add New Interest
      </button>

      <div className="min-h-screen">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {interests.length > 0 ? (
              interests.map((interest) => (
                <tr key={interest._id} className="border">
                  <td className="border px-4 py-2 font-bold">
                    {interest.title}
                  </td>
                  <td className="border px-4 py-2">
                    {interest.image && (
                      <LottieImageCompo
                        url={interest.image}
                        alt={interest.title}
                        className="w-10 h-10 object-cover rounded-md"
                      />
                      // <img
                      //   src={interest.image}
                      //   alt={interest.title}
                      //   className="w-10 h-10 object-cover rounded-md"
                      // />
                    )}
                  </td>
                  <td className="px-4 py-3 flex gap-5 justify-center">
                    <FaEdit
                      onClick={() =>
                        navigate(`/admin/edit-interest/${interest._id}`)
                      }
                      className="cursor-pointer"
                    />
                    <FaTrash
                      className="cursor-pointer"
                      onClick={() => handleDelete(interest._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No interests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllInterests;
