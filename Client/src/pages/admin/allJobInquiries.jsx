import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../common/config";
import { FaTrash } from "react-icons/fa";

const AllJobInquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  console.log("first : ", inquiries);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/jobForm`)
      .then((response) => {
        setInquiries(response.data.data), console.log(response.data);
      })
      .catch((error) => console.log("Error fetching job inquiries:", error));
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this application?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`${config.API_URL}/api/jobForm/${id}`);
      setInquiries((prev) => prev.filter((item) => item._id !== id));
      alert("Application deleted successfully!");
    } catch (error) {
      alert(
        "Error deleting application: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="p-3 w-full mx-auto">
      <div className="overflow-x-aut ">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Full Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">LinkedIn</th>
              <th className="border px-4 py-2">Resume</th>
              <th className="border px-4 py-2">Cover Letter</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length > 0 ? (
              inquiries.map((item) => (
                <tr key={item._id} className="border">
                  <td className="border px-4 py-2 font-medium">
                    {item.fullName}
                  </td>
                  <td className="border px-4 py-2">{item.email}</td>
                  <td className="border px-4 py-2">
                    {item.code} {item.phone}
                  </td>
                  <td className="border px-4 py-2">{item.linkedin || "-"}</td>
                  <td className="border px-4 py-2 text-center">
                    {item.resume ? (
                      <a
                        href={item.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Resume
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {item.coverLetter
                      ? item.coverLetter.slice(0, 50) + "..."
                      : "-"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <FaTrash
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No inquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllJobInquiries;
