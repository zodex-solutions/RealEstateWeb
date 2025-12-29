import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../common/config";

function EditPropertyStatus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/property-status/${id}`)
      .then((response) => {
        const { title } = response.data.data;
        setTitle(title);
      })
      .catch((error) =>
        alert("Error fetching property status: " + error.message)
      );
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);

    try {
      await axios.put(`${config.API_URL}/api/property-status/${id}`, formData);
      alert("Property status updated successfully!");
      navigate("/admin/all-property-status");
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

        <button
          type="submit"
          className="bg-blue-500 rounded-md text-white w-full px-4 py-2 hover:bg-blue-600"
        >
          Update Property Status
        </button>
      </form>
    </div>
  );
}

export default EditPropertyStatus;
