import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import config from "../../common/config";
import ImageUploader from "../../common/ImageUpload";
import { FaTrash } from "react-icons/fa";
import { Editor } from "@tinymce/tinymce-react";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    seo_title: "",
    seo_description: "",
    title: "",
    description: "",
    category_id: "",
    image: "",
  });

  const [blogCategories, setBlogCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/blog-category`)
      .then((response) => setBlogCategories(response.data.data))
      .catch((error) => console.log(error.message));

    axios
      .get(`${config.API_URL}/api/blog/${id}`)
      .then((response) => setFormData(response.data.data))
      .catch((error) => alert("Error fetching blog: " + error.message));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUploadImage = (uploadedFile) => {
    setFormData({ ...formData, image: uploadedFile[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${config.API_URL}/api/blog/${id}`, formData);
      alert("Blog updated successfully!");
      navigate("/admin/all-blogs");
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleChangeDescription = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: value, // Update long_description with editor content
    }));
  };

  return (
    <div className="mx-auto w-full p-3">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">SEO Title:</label>
          <input
            type="text"
            name="seo_title"
            value={formData.seo_title}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">SEO Description:</label>
          <textarea
            name="seo_description"
            value={formData.seo_description}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description:</label>
          <Editor
            apiKey={config.Editor_API}
            value={formData.description}
            onEditorChange={handleChangeDescription}
            init={{
              height: 250,
              menubar: true, // Enables full menu bar
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
                "lists", // Enables unordered (ul) & ordered (ol) lists
                "table", // Enables table functionality
              ],
              toolbar:
                "undo redo | formatselect | fontsizeselect | bold italic underline | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | table | removeformat | help",
              fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt",
            }}
          />
          {/* <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2"
          /> */}
        </div>
        <div>
          <label className="block text-sm font-medium">Category:</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2"
          >
            <option value="" disabled>
              Select Category
            </option>
            {blogCategories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Profile Picture:</label>
          <div className="flex gap-4">
            <div className="w-full">
              <ImageUploader onUpload={handleUploadImage} />
            </div>
            <div
              className="px-5 flex items-center border rounded-lg cursor-pointer"
              onClick={() => setFormData((prev) => ({ ...prev, image: null }))}
            >
              <FaTrash size={20} />
            </div>
          </div>
          {formData.image && (
            <img
              src={formData.image}
              alt="Blog"
              className="w-24 h-24 rounded-md mt-4"
            />
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
