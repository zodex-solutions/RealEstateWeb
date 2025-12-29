import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../common/config";
import { FaEdit, FaTrash } from "react-icons/fa";

function AllBlogCategory() {
  const [blogCategories, setBlogCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/blog-category`)
      .then((response) => setBlogCategories(response.data.data))
      .catch((error) =>
        alert("Error fetching blog categories: " + error.message)
      );
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete ");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${config.API_URL}/api/blog-category/${id}`);
      setBlogCategories((prev) => prev.filter((item) => item._id !== id));
      alert("Blog category deleted successfully!");
    } catch (error) {
      alert(
        "Error deleting blog category: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="p-3 w-full mx-auto">
      <button
        onClick={() => navigate("/admin/add-blog-category")}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Add New Blog Category
      </button>

      <div className="">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogCategories.length > 0 ? (
              blogCategories.map((category) => (
                <tr key={category._id} className="border">
                  <td className="border px-4 py-2 font-bold">
                    {category.title}
                  </td>
                  <td className="px-4 h-full py-3 justify-center gap-5 font-bold flex">
                    <FaEdit
                      onClick={() =>
                        navigate(`/admin/edit-blog-category/${category._id}`)
                      }
                      className="cursor-pointer"
                    />
                    <FaTrash
                      onClick={() => handleDelete(category._id)}
                      className=" cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-4">
                  No blog categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllBlogCategory;
