import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../common/config";

const EditBlogCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/blog-category/${id}`)
      .then((response) => {
        setTitle(response.data.data.title);
      })
      .catch((error) =>
        alert("Error fetching blog category: " + error.message)
      );
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`${config.API_URL}/api/blog-category/${id}`, { title });
      alert("Blog Category updated successfully!");
      navigate("/admin/all-blog-categories");
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 w-full mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title :</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 w-full"
        >
          {loading ? "Updating..." : "Update Blog Category"}
        </button>
      </form>
    </div>
  );
};

export default EditBlogCategory;
