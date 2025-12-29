import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../common/config";
import { FaEdit, FaTrash } from "react-icons/fa";

const AllDevelopers = () => {
  const [developers, setDevelopers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/developer`)
      .then((response) => setDevelopers(response.data.data))
      .catch((error) => console.log(error.message));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete ");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${config.API_URL}/api/developer/${id}`);
      setDevelopers((prev) => prev.filter((dev) => dev._id !== id));
      alert("Developer deleted successfully!");
    } catch (error) {
      alert(
        "Failed to delete developer: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="p-3 w-full mx-auto">
      <button
        onClick={() => navigate("/admin/add-developer")}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Add New Developer
      </button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {developers.length > 0 ? (
            developers.map((dev) => (
              <tr key={dev._id} className="border">
                <td className="border px-4 py-2 font-bold">{dev.title}</td>
                <td
                  dangerouslySetInnerHTML={{ __html: dev.description }}
                  className="border px-4 py-2"
                />
                <td className="border px-4 py-2">
                  <img
                    src={dev.image}
                    alt={dev.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3 flex gap-5 justify-center">
                  <FaEdit
                    onClick={() => navigate(`/admin/edit-developer/${dev._id}`)}
                    className="cursor-pointer"
                  />
                  <FaTrash
                    className="cursor-pointer"
                    onClick={() => handleDelete(dev._id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No developers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllDevelopers;
