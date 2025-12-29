import { useState } from "react";
import axios from "axios";
import config from "./config";

const ImageUploader = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setUploading(true);
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          `${config.API_URL}/api/property/upload-file`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        return `${config.API_URL}/${response.data.filePath}`;
      } catch (error) {
        console.error("Upload failed:", error);
        return null;
      }
    });

    const uploadedImages = (await Promise.all(uploadPromises)).filter(Boolean);
    setUploading(false);
    onUpload(uploadedImages);
  };

  return (
    <div className="p-2.5 px-3 border mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        accept="image/*,application/json"
        className=" imgageComp"
      />
      {uploading && <p className="text-blue-500 mt-2">Uploading...</p>}
    </div>
  );
};

export default ImageUploader;
