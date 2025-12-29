import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../common/config";
import ImageUploader from "../../common/ImageUpload";
import { FaTrash } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles
import { Editor } from "@tinymce/tinymce-react";
import LottieImageCompo from "../../components/common/LottieImages";

const EditCommunity = () => {
  const [content, setContent] = useState("");
  console.log(" Contnet ", content);

  const handleChange2 = (value) => {
    setContent(value);
  };
  useEffect(() => {
    setFormData((prev) => ({ ...prev, description: content }));
  }, [content]);

  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    sub_title: "",
    logo_image: "",
    image: [],
    amenities: [],
    highlights: [],
    description: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/communities/${id}`)
      .then((response) => setFormData(response.data.data))
      .catch((error) => console.log(error.message));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUploadImage = (uploadedFile) => {
    setFormData({ ...formData, logo_image: uploadedFile[0] });
  };

  const handleUploadImages = (uploadedImages) => {
    setFormData((prev) => ({
      ...prev,
      image: [
        ...(Array.isArray(prev.image) ? prev.image : []),
        ...uploadedImages.map((url) => ({ image: url })),
      ],
    }));
  };

  const handleUploadComplete = (uploadedUrls, field) => {
    const newEntries = uploadedUrls.map((url) => ({
      title: "",
      [`${field}_img`]: url,
    }));
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field] ? [...prev[field], ...newEntries] : [...newEntries],
    }));
  };

  const handleTitleChange = (e, index, field) => {
    const updatedItems = [...formData[field]];
    updatedItems[index].title = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: updatedItems }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${config.API_URL}/api/communities/${id}`, formData);
      alert("Community updated successfully!");
      navigate("/admin/all-communities");
    } catch (error) {
      alert(
        "Failed to update community: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: prevFormData.image.filter((_, i) => i !== index),
    }));
  };

  const handleChangeDescription = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: value, // Update long_description with editor content
    }));
  };

  return (
    <div className="mx-auto p-3 rounded-lg w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name :</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full mt-1 border !border-gray-300 rounded-md  px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">sub Title :</label>
          <input
            type="text"
            name="sub_title"
            value={formData.sub_title}
            onChange={handleChange}
            required
            className="w-full mt-1 border !border-gray-300 rounded-md  px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description :</label>
          {/* <ReactQuill value={content} onChange={handleChange2} theme="snow" /> */}
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
            rows="4"
            className="w-full mt-1 border !border-gray-300 rounded-md  px-4 py-2"
          ></textarea> */}
        </div>

        <div>
          <label className="block text-sm font-medium">Logo Image :</label>
          <div className="flex gap-4">
            <div className="w-full">
              <ImageUploader onUpload={handleUploadImage} />
            </div>

            {/* Delete Button */}
            <div
              className="px-5 flex items-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  logo_image: null, // Instead of [], set to null to match data type
                }))
              }
            >
              <FaTrash size={20} />
            </div>
          </div>
        </div>
        {formData.logo_image && (
          <div className="mt-4">
            <img
              src={formData.logo_image}
              alt="Profile"
              className="w-24 h-24 rounded-md object-cover"
            />
          </div>
        )}

        {/*  */}

        {/* Amenities */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Amenities:
          </label>
          <div className="flex gap-4">
            <div className="w-full">
              <ImageUploader
                onUpload={(urls) => handleUploadComplete(urls, "amenities")}
              />
            </div>

            <div
              className="px-5 flex items-center  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() =>
                setFormData((prev) => ({ ...prev, amenities: [] }))
              }
            >
              <FaTrash size={20} />
            </div>
          </div>

          {formData.amenities?.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <LottieImageCompo
                url={amenity.amenities_img}
                alt={amenity.title}
                className="w-10 h-10 rounded-md object-cover"
              />
              {/* <img
                src={amenity.amenities_img}
                alt={amenity.title}
                className="w-10 h-10 rounded-md object-cover"
              /> */}
              <input
                type="text"
                placeholder="Amenity Title"
                value={amenity.title}
                onChange={(e) => handleTitleChange(e, index, "amenities")}
                className="border border-gray-300 rounded-md px-2 py-1 w-full"
              />

              {/* Delete Button */}
              <div
                className="border border-gray-300 rounded-md px-2 py-1 "
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    amenities: prev.amenities.filter((_, i) => i !== index),
                  }))
                }
              >
                <FaTrash size={20} />
              </div>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Highlights:
          </label>
          <div className="flex gap-4">
            <div className="w-full">
              <ImageUploader
                onUpload={(urls) => handleUploadComplete(urls, "highlights")}
              />
            </div>

            <div
              className="px-5 flex items-center  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() =>
                setFormData((prev) => ({ ...prev, amenities: [] }))
              }
            >
              <FaTrash size={20} />
            </div>
          </div>

          {formData.highlights?.map((highlight, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <LottieImageCompo
                url={highlight.highlights_img}
                alt={highlight.title}
                className="w-10 h-10 rounded-md object-cover"
              />
              <input
                type="text"
                placeholder="Highlight Title"
                value={highlight.title}
                onChange={(e) => handleTitleChange(e, index, "highlights")}
                className="border border-gray-300 rounded-md px-2 py-1 w-full"
              />

              {/* Delete Button */}
              <div
                className="border border-gray-300 rounded-md px-2 py-1 "
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    highlights: prev.highlights.filter((_, i) => i !== index),
                  }))
                }
              >
                <FaTrash size={20} />
              </div>
            </div>
          ))}
        </div>

        {/* Images */}
        <div className="flex flex-col">
          <label
            htmlFor="image"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Image:
          </label>

          <div className="flex gap-4">
            <div className="w-full">
              <ImageUploader onUpload={handleUploadImages} />
            </div>

            <div
              className="px-5 flex items-center  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setFormData((prev) => ({ ...prev, image: [] }))}
            >
              <FaTrash size={20} />
            </div>
          </div>

          {/* Display Uploaded Images */}
          <div className="flex flex-wrap gap-5 mt-5">
            {formData.image &&
              formData.image.map((img, index) => (
                <div key={index} className="relative w-24 h-24">
                  <img
                    src={img.image}
                    alt={`Uploaded ${index}`}
                    className="w-20 h-20 rounded-md object-cover m-1"
                  />
                  <div
                    onClick={() => deleteImage(index)}
                    className="absolute -top-3 -right-3 bg-[rgba(0,0,0,0.5)] text-white p-2 rounded-full shadow-md hover:bg-red-600 transition duration-300"
                  >
                    <FaTrash size={14} className="text-white" />
                  </div>
                </div>
              ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className=" text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Updating..." : "Update Community"}
        </button>
      </form>
    </div>
  );
};

export default EditCommunity;
