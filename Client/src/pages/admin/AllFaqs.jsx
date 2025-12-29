import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import config from "../../common/config";

function AllFaqs() {
  const [faqs, setFaqs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/faqs`)
      .then((response) => {
        setFaqs(response.data.data);
      })
      .catch((error) => console.error("Error fetching FAQs:", error.message));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete ");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${config.API_URL}/api/faqs/${id}`);
      setFaqs((prev) => prev.filter((item) => item._id !== id));
      alert("FAQ deleted successfully!");
    } catch (error) {
      alert(
        "Error deleting FAQ: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="p-3 w-full mx-auto">
      <button
        onClick={() => navigate("/admin/add-faq")}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
      >
        Add New FAQ
      </button>

      <div className="min-h-screen">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border px-4 py-2 text-left">Question</th>
              <th className="border px-4 py-2 text-left">Answer</th>
              <th className="border px-2 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.length > 0 ? (
              faqs.map((faq) => (
                <tr key={faq._id} className="border">
                  <td className="border px-4 py-2 font-bold">{faq.question}</td>
                  <td className="border px-4 py-2">{faq.answer}</td>
                  <td className="px-4 py-3 flex justify-center gap-5 font-bold">
                    <FaEdit
                      className="cursor-pointer"
                      onClick={() => navigate(`/admin/edit-faq/${faq._id}`)}
                    />
                    <FaTrash
                      className="cursor-pointer"
                      onClick={() => handleDelete(faq._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No FAQs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllFaqs;
