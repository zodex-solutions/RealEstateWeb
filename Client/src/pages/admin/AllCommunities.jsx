import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../common/config";
import { FaEdit, FaTrash } from "react-icons/fa";

const AllCommunities = () => {
  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/communities`)
      .then((response) => setCommunities(response.data.data))
      .catch((error) => console.log(error.message));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete ");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${config.API_URL}/api/communities/${id}`);
      setCommunities((prev) => prev.filter((comm) => comm._id !== id));
      alert("Community deleted successfully!");
    } catch (error) {
      alert(
        "Failed to delete community: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="p-3 w-full mx-auto">
      <button
        onClick={() => navigate("/admin/add-community")}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Add New Community
      </button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Sub Title</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Logo</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {communities.length > 0 ? (
            communities.map((comm) => (
              <tr key={comm._id} className="border">
                <td className="border px-4 py-2 font-bold">{comm.title}</td>
                <td className="border px-4 py-2">{comm.sub_title}</td>
                <td
                  dangerouslySetInnerHTML={{ __html: comm.description }}
                  className="border px-4 py-2 truncate max-w-xs overflow-x-auto"
                />

                <td className="border px-4 py-2">
                  <img
                    src={comm.logo_image}
                    alt={comm.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3 flex gap-5 justify-center">
                  <FaEdit
                    onClick={() =>
                      navigate(`/admin/edit-community/${comm._id}`)
                    }
                    className="cursor-pointer"
                  />
                  <FaTrash
                    className="cursor-pointer"
                    onClick={() => handleDelete(comm._id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No communities found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllCommunities;
