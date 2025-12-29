import axios from "axios";
import React, { useState, useEffect } from "react";
import config from "../../common/config";
import ImageUploader from "../../common/ImageUpload";
import { Editor } from "@tinymce/tinymce-react";

function WhyChooseUs() {
  const [formData, setFormData] = useState({
    description: "",
    small_features: [],
  });

  const [whyChooseUsId, setWhyChooseUsId] = useState(null); // Store the ID for update

  // Fetch existing data
  useEffect(() => {
    const fetchWhyChooseUs = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/api/why-chose`);
        if (response.data && response.data.data) {
          setFormData(response.data.data);
          setWhyChooseUsId(response.data.data._id); // Store ID for update
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchWhyChooseUs();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      description: e.target.value,
    });
  };

  // Handle feature input changes
  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...formData.small_features];
    newFeatures[index][field] = value;
    setFormData({
      ...formData,
      small_features: newFeatures,
    });
  };

  // Add a new feature
  const handleAddFeature = () => {
    setFormData({
      ...formData,
      small_features: [
        ...formData.small_features,
        { image: "", description: "" },
      ],
    });
  };

  // Remove a feature
  const handleRemoveFeature = (index) => {
    const newFeatures = formData.small_features.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      small_features: newFeatures,
    });
  };

  // Handle form submission (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (whyChooseUsId) {
        // Update existing entry
        response = await axios.put(
          `${config.API_URL}/api/why-chose/${whyChooseUsId}`,
          formData
        );
        alert("Content Updated Successfully");
      } else {
        // Create new entry
        response = await axios.post(
          `${config.API_URL}/api/why-chose`,
          formData
        );
        alert("Content Added Successfully");
        setWhyChooseUsId(response.data.data._id); // Store new ID
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  // Handle image upload
  const handleUploadImage = (index, uploadedFile) => {
    if (uploadedFile.length > 0) {
      const newFeatures = [...formData.small_features];
      newFeatures[index].image = uploadedFile[0]; // Assuming ImageUploader provides a full URL
      setFormData({ ...formData, small_features: newFeatures });
    }
  };

  const handleChangeDescription = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: value, // Update long_description with editor content
    }));
  };

  return (
    <div className="p-3 w-full mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {whyChooseUsId ? "Edit Why Choose Us" : "Add Why Choose Us"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Description Field */}
        <div>
          <label className="text-gray-700 text-sm block font-medium">
            Description:
          </label>
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
            value={formData.description}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md w-full block focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 px-4 py-2"
          /> */}
        </div>

        {/* Small Features Section */}
        <div>
          <label className="text-gray-700 text-sm block font-medium">
            Small Features:
          </label>
          {formData.small_features.map((feature, index) => (
            <div key={index} className="mt-4 space-y-2">
              <div>
                <label className="text-gray-700 text-sm bloc font-medium">
                  Image {index + 1}:
                </label>
                <ImageUploader
                  onUpload={(uploadedFile) =>
                    handleUploadImage(index, uploadedFile)
                  }
                />
              </div>

              <div className="flex items-end gap-5">
                {feature.image && (
                  <div className="mt-4 bg-[#2f5fa7] px-4 py-2 rounded">
                    <img
                      src={feature.image}
                      alt="Uploaded"
                      className="w-16 h-16 rounded-md object-cover"
                    />
                  </div>
                )}
                <div className="w-full">
                  <label className="text-gray-700 text-sm block font-medium">
                    Description {index + 1}:
                  </label>
                  <input
                    type="text"
                    value={feature.description}
                    onChange={(e) =>
                      handleFeatureChange(index, "description", e.target.value)
                    }
                    required
                    className="border border-gray-300 rounded-md w-full block focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 px-4 py-2"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Add Feature Button */}
          <div className="flex">
            <button
              type="button"
              onClick={handleAddFeature}
              className="mt-5 rounded-md bg-green-500 text-white  px-4 py-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add New Feature
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 rounded-md text-white w-full font-semibold hover:bg-blue-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {whyChooseUsId ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default WhyChooseUs;
