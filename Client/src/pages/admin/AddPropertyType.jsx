import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../common/config";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

function AddPropertyType() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  console.log(title);
  console.log(description);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    try {
      await axios.post(`${config.API_URL}/api/property-type`, formData);
      alert("Property type added successfully!");
      setImage(null);
      setTitle("");
      setDescription("");
      // navigate("/admin/all-property-types");
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const [propertyType, setPropertyType] = useState([]);

  console.log(propertyType);
  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/property-type`)
      .then((response) => setPropertyType(response.data.data))
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div className="p-3 w-full mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-gray-700 text-sm block font-medium">
            Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-300 rounded-md w-full px-4 py-2"
          />
        </div>
        <div>
          <label className="text-gray-700 text-sm block font-medium">
            Description:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border border-gray-300 rounded-md w-full px-4 py-2"
          ></textarea>
        </div>

        <button type="submit" className="">
          Add Property Type
        </button>
      </form>
    </div>
  );
}

export default AddPropertyType;
{
  /* <div>
  <label className="text-gray-700 text-sm block font-medium">
    Description:
  </label>
  <SunEditor
    setContents={description}
    onChange={(e) => setDescription(e.target.value)}
    setOptions={{
      buttonList: [["bold", "italic", "underline", "list"]],
    }}
  />
</div> */
}
