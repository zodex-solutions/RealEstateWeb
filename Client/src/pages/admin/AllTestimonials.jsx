import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../common/config";
import { FaEdit, FaTrash } from "react-icons/fa";

function AllTestimonial() {
  const [testimonials, setTestimonials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/testimonial`)
      .then((response) => setTestimonials(response.data.data))
      .catch((error) =>
        console.log("Error fetching testimonials: " + error.message)
      );
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete ");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${config.API_URL}/api/testimonial/${id}`);
      setTestimonials((prev) => prev.filter((item) => item._id !== id));
      alert("Testimonial deleted successfully!");
    } catch (error) {
      alert(
        "Error deleting testimonial: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="p-3 w-full mx-auto">
      <button
        onClick={() => navigate("/admin/add-testimonial")}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Add New Testimonial
      </button>

      <div className="">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Profession</th>
              <th className="border px-4 py-2">Last Villa</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <tr key={testimonial._id} className="border">
                  <td className="border px-4 py-2 font-bold">
                    {testimonial.name}
                  </td>
                  <td className="border px-4 py-2">{testimonial.profession}</td>
                  <td className="border px-4 py-2">{testimonial.last_villa}</td>
                  <td className="border px-4 py-2">
                    {testimonial.image && (
                      <img
                        src={testimonial.image}
                        alt="Testimonial"
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                  </td>
                  <td className="px-4 h-full py-3 justify-center gap-5 font-bold flex">
                    <FaEdit
                      onClick={() =>
                        navigate(`/admin/edit-testimonial/${testimonial._id}`)
                      }
                      className="cursor-pointer"
                    />
                    <FaTrash
                      onClick={() => handleDelete(testimonial._id)}
                      className="cursor-pointer "
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No testimonials found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllTestimonial;
