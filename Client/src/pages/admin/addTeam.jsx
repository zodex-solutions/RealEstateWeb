import React, { useState } from "react";
import config from "../../common/config";
import axios from "axios";
import ImageUploader from "../../common/ImageUpload";
import { FaTrash } from "react-icons/fa";

const AddTeamMember = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    title: "",
    languages: "",
    phone: "",
    email: "",
    whatsapp: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUploadImage = (uploadedFile) => {
    setFormData({ ...formData, image: uploadedFile[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(`${config.API_URL}/api/team`, formData);
      alert("Team Member Added Successfully");

      setFormData({
        name: "",
        image: "",
        title: "",
        languages: "",
        phone: "",
        email: "",
        whatsapp: "",
      });

      setMessage("Team member added successfully.");
      console.log("res", res);
    } catch (error) {
      console.error("error", error);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="p-2 py-2">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g. John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Image</label>
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
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g. Senior Developer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Languages
          </label>
          <input
            type="text"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g. English, Arabic"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g. +971123456789"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g. john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            WhatsApp
          </label>
          <input
            type="text"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g. +971987654321"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Team Member
        </button>
      </form>
    </div>
  );
};

export default AddTeamMember;
