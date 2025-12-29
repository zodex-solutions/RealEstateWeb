import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import config from "../../common/config";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles
import { Editor } from "@tinymce/tinymce-react";

function AboutUs() {
  const [formData, setFormData] = useState({
    long_description: "",
    first_dec: "",
    second_dec: "",
    third_dec: "",
    fourth_dec: "",
  });

  // Long
  const [longContent, setLongContent] = useState("");
  const [firstContent, setFirstContent] = useState("");
  const [secondContent, setSecondContent] = useState("");
  const [thirdContent, setThirdContent] = useState("");
  const [fourthContent, setFourthContent] = useState("");

  const handleChangeLongDescription = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      long_description: value, // Update long_description with editor content
    }));
    // setLongContent(value);
  };

  const handleChangeFirstDescription = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      first_dec: value,
    }));
    // setFirstContent(value);
  };

  const handleChangeSecondDescription = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      second_dec: value,
    }));
    // setSecondContent(value);
  };
  const handleChangeThirdDescription = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      third_dec: value,
    }));
    // setThirdContent(value);
  };
  const handleChangeFourthDescription = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fourth_dec: value,
    }));
    // setFourthContent(value);
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, long_description: longContent }));
    setFormData((prev) => ({ ...prev, first_dec: firstContent }));
    setFormData((prev) => ({ ...prev, second_dec: secondContent }));
    setFormData((prev) => ({ ...prev, third_dec: thirdContent }));
    setFormData((prev) => ({ ...prev, fourth_dec: fourthContent }));
  }, [longContent, firstContent, secondContent, thirdContent, fourthContent]);

  const [aboutUsId, setAboutUsId] = useState(null);

  // Fetch existing About Us data
  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/api/about-us`);
        if (response.data && response.data.data) {
          setFormData(response.data.data);
          setAboutUsId(response.data.data._id); // Store ID for update
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchAboutUs();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (aboutUsId) {
        // Update existing entry
        response = await axios.put(
          `${config.API_URL}/api/about-us/${aboutUsId}`,
          formData
        );
        alert("Content Updated Successfully");
      } else {
        // Create new entry
        response = await axios.post(`${config.API_URL}/api/about-us`, formData);
        alert("Content Added Successfully");
        setAboutUsId(response.data.data._id); // Store new ID
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // Handle TinyMCE content change
  const handleEditorChange = (newContent) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      long_description: newContent, // Update long_description with editor content
    }));
  };

  // const [editorState, setEditorState] = useState(EditorState.createEmpty());
  return (
    <div className="mx-auto w-full p-3">
      <h2 className="text-xl font-bold mb-4">
        {aboutUsId ? "Edit About Us" : "Add About Us"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Long Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Long Description:
          </label>

          <Editor
            apiKey={config.Editor_API}
            value={formData.long_description}
            onEditorChange={handleChangeLongDescription}
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

          {/* <ReactQuill
            value={formData.long_description || longContent}
            onChange={handleChangeLongDescription}
            theme="snow"
          /> */}

          {/* <textarea
            name="long_description"
            value={formData.long_description}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
        </div>

        {/* First Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Description:
          </label>
          {/* <ReactQuill
            value={firstContent}
            onChange={handleChangeFirstDescription}
            theme="snow"
          /> */}
          <Editor
            apiKey={config.Editor_API}
            value={formData.first_dec}
            onEditorChange={handleChangeFirstDescription}
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
            name="first_dec"
            value={formData.first_dec}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
        </div>

        {/* Second Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Second Description:
          </label>
          {/* <ReactQuill
            value={secondContent}
            onChange={handleChangeSecondDescription}
            theme="snow"
          /> */}
          <Editor
            apiKey={config.Editor_API}
            value={formData.second_dec}
            onEditorChange={handleChangeSecondDescription}
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
            name="second_dec"
            value={formData.second_dec}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
        </div>

        {/* Third Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Third Description:
          </label>
          <Editor
            apiKey={config.Editor_API}
            value={formData.third_dec}
            onEditorChange={handleChangeThirdDescription}
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
          {/* <ReactQuill
            value={thirdContent}
            onChange={handleChangeThirdDescription}
            theme="snow"
          /> */}
          {/* <textarea
            name="third_dec"
            value={formData.third_dec}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
        </div>

        {/* Fourth Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fourth Description:
          </label>
          <Editor
            apiKey={config.Editor_API}
            value={formData.fourth_dec}
            onEditorChange={handleChangeFourthDescription}
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
          {/* <ReactQuill
            value={fourthContent}
            onChange={handleChangeFourthDescription}
            theme="snow"
          /> */}
          {/* <textarea
            name="fourth_dec"
            value={formData.fourth_dec}
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
          {aboutUsId ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AboutUs;
