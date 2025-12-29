import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageUploader from "../../common/ImageUpload";
import config from "../../common/config";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import LottieImageCompo from "../../components/common/LottieImages";

function EditInterest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    image: null,
  });

  const handleUploadImage = (uploadedFile) => {
    setFormData({ ...formData, image: uploadedFile[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/intrest/${id}`)
      .then((response) =>
        setFormData({
          title: response.data.data.title,
          image: response.data.data.image,
        })
      )
      .catch((error) =>
        console.log("Error fetching interests: " + error.message)
      );
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${config.API_URL}/api/intrest/${id}`, formData);
      alert("Interest Updated Successfully");
      navigate("/admin/all-interests");
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Error updating interest");
    }
  };

  return (
    <div className="mx-auto w-full p-3">
      <h2 className="text-2xl font-bold mb-4">Edit Interest</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title :
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Image :</label>
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
          {formData.image && (
            <div className="mt-4">
              <LottieImageCompo
                url={formData.image}
                alt={`Interest Image`}
                className="w-24 h-24 rounded-md object-cover"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditInterest;
