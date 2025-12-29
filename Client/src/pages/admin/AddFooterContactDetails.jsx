import axios from "axios";
import React, { useState, useEffect } from "react";
import config from "../../common/config";
import { Editor } from "@tinymce/tinymce-react";

function FooterContactDetails() {
  const [formData, setFormData] = useState({
    phone: "",
    mail: "",
    address: "",
  });

  console.log(formData);

  const [contactId, setContactId] = useState(null);

  // Fetch existing contact details
  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/api/footer-contact`
        );
        if (response.data && response.data.data) {
          setFormData(response.data.data);
          setContactId(response.data.data._id);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchContactDetails();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeDescription = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      address: value, // Update long_description with editor content
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (contactId) {
        await axios.put(
          `${config.API_URL}/api/footer-contact/${contactId}`,
          formData
        );
        alert("Contact Details Updated Successfully");
      } else {
        const response = await axios.post(
          `${config.API_URL}/api/footer-contact`,
          formData
        );
        alert("Contact Details Added Successfully");
        setContactId(response.data.data._id);
      }
    } catch (error) {
      console.log("Error:", error);
      alert(error);
    }
  };

  return (
    <div className="mx-auto w-full p-3">
      <h2 className="text-xl font-bold mb-4">
        {contactId ? "Edit Contact Details" : "Add Contact Details"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Phone Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone:
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address:
          </label>
          <Editor
            apiKey={config.Editor_API}
            value={formData.address}
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
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {contactId ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default FooterContactDetails;
