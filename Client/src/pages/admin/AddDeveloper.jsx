import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../common/config";
import ImageUploader from "../../common/ImageUpload";
import { FaTrash } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles
import { Editor } from "@tinymce/tinymce-react";

const AddDeveloper = () => {
  const [content, setContent] = useState("");
  console.log(" Contnet ", content);
  const handleChange2 = (value) => {
    setContent(value);
  };
  useEffect(() => {
    setFormData((prev) => ({ ...prev, description: content }));
  }, [content]);

  const [formData, setFormData] = useState({
    image: "",
    description: "",
    title: "",
  });

  console.log("formData : ", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [loading, setLoading] = useState(false);
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/developer`)
      .then((response) => setDevelopers(response.data.data))
      .catch((error) => console.log(error.message));
  }, []);

  const handleUploadImage = (uploadedFile) => {
    setFormData({ ...formData, image: uploadedFile[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${config.API_URL}/api/developer`,
        formData
      );

      alert("Developer added successfully!");
      setFormData({
        title: "",
        description: "",
        image: null,
      });
    } catch (error) {
      alert(
        "Failed to add developer: " +
          (error.response?.data?.message || error.message)
      );
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
          <label className="block text-sm font-medium">Description :</label>
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
          {/* <ReactQuill value={content} onChange={handleChange2} theme="snow" /> */}
          {/* <div className="mt-4 p-2 border">
            <h3 className="font-bold">Preview:</h3>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div> */}

          {/* <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full mt-1 border !border-gray-300 rounded-md  px-4 py-2"
          ></textarea> */}
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium">Image :</label>
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
                  image: null, // Instead of [], set to null to match data type
                }))
              }
            >
              <FaTrash size={20} />
            </div>
          </div>
          {formData.image && (
            <div className="mt-4">
              <img
                src={formData.image}
                alt="Profile"
                className="w-24 h-24 rounded-md object-cover"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className=" text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Adding..." : "Add Developer"}
        </button>
      </form>
    </div>
  );
};

export default AddDeveloper;
