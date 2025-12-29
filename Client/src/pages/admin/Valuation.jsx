import axios from "axios";
import React, { useState, useEffect } from "react";
import config from "../../common/config";
import { Editor } from "@tinymce/tinymce-react";

function Valuation() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [valuationId, setValuationId] = useState(null);

  // Fetch existing valuation details
  useEffect(() => {
    const fetchValuationDetails = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/api/valuation`);
        if (response.data && response.data.data) {
          setFormData(response.data.data);
          setValuationId(response.data.data._id);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchValuationDetails();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeDescription = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (valuationId) {
        await axios.put(
          `${config.API_URL}/api/valuation/${valuationId}`,
          formData
        );
        alert("Valuation Updated Successfully");
      } else {
        const response = await axios.post(
          `${config.API_URL}/api/valuation`,
          formData
        );
        alert("Valuation Added Successfully");
        setValuationId(response.data.data._id);
      }
    } catch (error) {
      console.log("Error:", error);
      alert(error);
    }
  };

  return (
    <div className="mx-auto w-full p-3">
      <h2 className="text-xl font-bold mb-4">
        {valuationId ? "Valuation Content" : "Add Valuation"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <Editor
            apiKey={config.Editor_API}
            value={formData.description}
            onEditorChange={handleChangeDescription}
            init={{
              height: 250,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
                "lists",
                "table",
              ],
              toolbar:
                "undo redo | formatselect | fontsizeselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | removeformat | help",
              fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt",
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {valuationId ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Valuation;
