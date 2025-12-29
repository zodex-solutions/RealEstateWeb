import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import config from "../../common/config";

function AllSellInquiries() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/inquiry`)
      .then((response) => setInquiries(response.data))
      .catch((error) => console.log(error.message));
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this inquiry?"
    );
    if (!isConfirmed) return;

    try {
      await axios.delete(`${config.API_URL}/api/inquiry/${id}`);
      setInquiries((prev) => prev.filter((item) => item._id !== id));
      alert("Inquiry deleted successfully!");
    } catch (error) {
      alert(
        "Error deleting inquiry: " +
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
              <th className="border px-4 py-2">Full Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Contact Number</th>
              <th className="border px-4 py-2">City</th>
              <th className="border px-4 py-2">Country</th>
              <th className="border px-4 py-2">Query</th>
              <th className="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length > 0 ? (
              inquiries.map((inquiry) => (
                <tr key={inquiry._id} className="border">
                  <td className="border px-4 py-2 font-bold">
                    {inquiry.fullName}
                  </td>
                  <td className="border px-4 py-2">{inquiry.email}</td>
                  <td className="border px-4 py-2 flex gap-1 border-none">
                    {inquiry.countryCode} {inquiry.contactNumber}
                  </td>
                  <td className="border px-4 py-2">{inquiry.city}</td>
                  <td className="border px-4 py-2">{inquiry.country}</td>

                  <td className="border px-4 py-2">{inquiry.query}</td>
                  <td className="px-4 py-3 flex justify-center gap-5 font-bold">
                    <FaTrash
                      onClick={() => {
                        handleDelete(inquiry?._id);
                      }}
                      className="cursor-pointer text-red-600"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No sell inquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllSellInquiries;
