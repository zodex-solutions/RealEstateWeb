import { useEffect, useState } from "react";
import config from "../../common/config";
import axios from "axios";

const AddPropertyStatus = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [propertyStatus, setPropertyStatus] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/property-status`)
      .then((response) => setPropertyStatus(response.data.data))
      .catch((error) => console.log(error.message));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${config.API_URL}/api/property-status`, { title });
      alert("Property status added successfully!");
      setTitle(""); // Clear input field after successful submission
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
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
          disabled={loading}
          className="bg-blue-500 text-white w-full px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Adding..." : "Add Property Status"}
        </button>
      </form>
    </div>
  );
};

export default AddPropertyStatus;
