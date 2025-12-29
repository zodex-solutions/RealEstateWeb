import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../common/config";

function EditPropertyType() {
  const { id } = useParams();

  console.log(id);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/property-type/${id}`)
      .then((response) => {
        console.log(response);

        const { title, description, image } = response.data.data;
        setTitle(title);
        setDescription(description);
      })
      .catch((error) =>
        alert("Error fetching property type: " + error.message)
      );
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    try {
      await axios.put(`${config.API_URL}/api/property-type/${id}`, formData);
      alert("Property type updated successfully!");
      navigate("/admin/all-property-types");
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

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

        <button
          type="submit"
          className="bg-blue-500 rounded-md text-white w-full px-4 py-2 hover:bg-blue-600"
        >
          Update Property Type
        </button>
      </form>
    </div>
  );
}

export default EditPropertyType;
