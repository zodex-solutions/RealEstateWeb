import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageUploader from "../../common/ImageUpload";
import config from "../../common/config";
import { FaTrash } from "react-icons/fa";

function AddBanner() {
  const [formData, setFormData] = useState({ images: [] });
  const [banners, setBanners] = useState([]);

  console.log("banner ", banners);
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/api/banner`);
      setBanners(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadImage = (uploadedFiles) => {
    if (uploadedFiles.length > 0) {
      setFormData((prevFormData) => ({
        images: [...prevFormData.images, ...uploadedFiles],
      }));
    }
  };

  const handleDeleteImage = async (bannerId, imgIndex) => {
    try {
      const response = await fetch(
        `${config.API_URL}/api/banner/${bannerId}/image/${imgIndex}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }

      // Update frontend state after successful deletion
      setBanners((prevBanners) =>
        prevBanners.map((banner) =>
          banner._id === bannerId
            ? {
                ...banner,
                images: banner.images.filter((_, i) => i !== imgIndex),
              }
            : banner
        )
      );
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    try {
      await axios.post(`${config.API_URL}/api/banner`, {
        images: formData.images,
        status: true,
      });
      alert("Banner Added Successfully!");
      setFormData({ images: [] });
      fetchBanners();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteImage = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: prevFormData.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="p-3 w-full mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label
            htmlFor="image"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Banner Images:
          </label>

          <div className="flex gap-4">
            <div className="w-full">
              <ImageUploader onUpload={handleUploadImage} multiple={true} />
            </div>
            <div
              className="px-5 flex items-center border border-gray-300 rounded-lg cursor-pointer"
              onClick={() => setFormData((prev) => ({ ...prev, images: [] }))}
            >
              <FaTrash size={20} />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-5">
            {formData.images.map((image, index) => (
              <div key={index} className="relative w-24 h-24">
                
                <img
                  src={image}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-full rounded-md object-cover"
                />
                <a
                  onClick={() => deleteImage(index)}
                  className="absolute -top-3 -right-3 bg-[rgba(0,0,0,0.5)] text-white p-2 rounded-full shadow-md hover:bg-red-600"
                >
                  <FaTrash size={14} className="text-white" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 rounded-md text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-semibold hover:bg-blue-600 px-4 py-2"
        >
          Submit
        </button>
      </form>

      {/* Display All Banners */}
      <div className="mt-10 flex flex-wrap gap-10">
        {banners.map((banner) =>
          banner.images.map((image, imgIndex) => (
            <div
              key={`${banner._id}-${imgIndex}`}
              className="relative w-24 h-24 md:w-24 md:h-24"
            >
              <img
                src={image} // Display each image correctly
                alt="Banner"
                className="w-24 h-24 rounded-md object-cover"
              />
              <div
                onClick={() => handleDeleteImage(banner._id, imgIndex)}
                className="absolute -top-3 -right-5 bg-[rgba(0,0,0,0.5)] text-white p-2 rounded-full shadow-md transition duration-300"
              >
                <FaTrash size={16} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AddBanner;
