import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../common/config";
import ImageUploader from "../../common/ImageUpload";
import { FaTrash } from "react-icons/fa";

const AddPageServices = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [servicesCount, setServicesCount] = useState(0);
  const maxServices = 4;

  // Fetch existing services count
  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/service`)
      .then((response) => setServicesCount(response.data.length))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (servicesCount >= maxServices) {
      alert("You can only add up to 4 services.");
      return;
    }

    setLoading(true);

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("description", formData.description);

    if (formData.image) {
      submitData.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        `${config.API_URL}/api/service`,
        formData
      );
      alert("Service created successfully");
      setFormData({ title: "", description: "", image: null });
      setServicesCount((prev) => prev + 1);
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  const handleUploadImage = (uploadedFile) => {
    setFormData((prev) => ({ ...prev, image: uploadedFile[0] }));
  };

  return (
    <div className="p-3">
      {servicesCount >= maxServices ? (
        <p className="text-red-500 font-semibold">
          You have reached the maximum of {maxServices} services.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Title :</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">Description :</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full px-4 py-2"
              required
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Image:
            </label>
            <div className="flex gap-4">
              <div className="w-full">
                <ImageUploader onUpload={handleUploadImage} />
              </div>
              <div
                className="px-5 flex items-center border border-gray-300 rounded-lg cursor-pointer"
                onClick={() => setFormData({ ...formData, image: null })}
              >
                <FaTrash size={20} />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-2">
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Uploaded Preview"
                  className="w-20 h-20 rounded-md object-cover m-1"
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            disabled={loading || servicesCount >= maxServices}
          >
            {loading ? "Creating..." : "Create Service"}
          </button>
        </form>
      )}
    </div>
  );
};

export default AddPageServices;
