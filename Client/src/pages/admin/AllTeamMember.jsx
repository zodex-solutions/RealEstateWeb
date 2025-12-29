import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../common/config";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const AllTeamMember = () => {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/team`)
      .then((res) => setMembers(res.data))
      .catch((err) =>
        console.error("Error fetching team members: ", err.message)
      );
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this team member?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${config.API_URL}/api/team/${id}`);
      setMembers((prev) => prev.filter((m) => m._id !== id));
      alert("Team member deleted successfully!");
    } catch (err) {
      alert(
        "Error deleting team member: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="p-3 w-full mx-auto">
      <button
        onClick={() => navigate("/admin/add-team-member")}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Add New Team Member
      </button>

      <div className="">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Languages</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map((member) => (
                <tr key={member._id}>
                  <td className="border px-4 py-2 font-bold">{member.name}</td>
                  <td className="border px-4 py-2">{member.title}</td>
                  <td className="border px-4 py-2">{member.languages}</td>
                  <td className="border px-4 py-2">{member.phone}</td>
                  <td className="border px-4 py-2">{member.email}</td>
                  <td className="px-4 py-2 flex justify-center gap-5">
                    <FaEdit
                      className="cursor-pointer text-blue-600"
                      onClick={() =>
                        navigate(`/admin/edit-team-member/${member._id}`)
                      }
                    />
                    <FaTrash
                      className="cursor-pointer text-red-600"
                      onClick={() => handleDelete(member._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No team members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTeamMember;
