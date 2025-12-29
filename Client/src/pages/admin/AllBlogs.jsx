import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../common/config";
import { FaEdit, FaTrash } from "react-icons/fa";

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  console.log("ALLBlogs", blogs);
  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/blog`)
      .then((response) => setBlogs(response.data.data))
      .catch((error) => console.log("Error fetching blogs: " + error.message));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete ");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${config.API_URL}/api/blog/${id}`);
      setBlogs((prev) => prev.filter((item) => item._id !== id));
      alert("Blog deleted successfully!");
    } catch (error) {
      alert(
        "Error deleting blog: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="p-3 w-full mx-auto">
      <button
        onClick={() => navigate("/admin/add-blog")}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Add New Blog
      </button>

      <div className="">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <tr key={blog._id} className="border">
                  <td className="border px-4 py-2 font-bold">{blog.title}</td>
                  <td className="border px-4 py-2 min-w-52">
                    {blog.category_id?.title}
                  </td>
                  <td className="border px-4 py-2">
                    {blog.image && (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                  </td>
                  <td className="px-4 py-3 flex justify-center gap-5 font-bold">
                    <FaEdit
                      onClick={() => navigate(`/admin/edit-blog/${blog._id}`)}
                      className="cursor-pointer"
                    />
                    <FaTrash
                      className="cursor-pointer"
                      onClick={() => handleDelete(blog._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllBlogs;
