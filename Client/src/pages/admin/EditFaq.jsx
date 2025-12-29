import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../common/config";

const EditFAQ = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/faqs/${id}`)
      .then((response) => {
        console.log("response ========", response);
        setQuestion(response.data.data.question);
        setAnswer(response.data.data.answer);
      })
      .catch((error) => console.error("Error fetching FAQ:", error.message));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${config.API_URL}/api/faqs/${id}`, {
        question,
        answer,
      });
      alert("FAQ updated successfully!");
      navigate("/admin/all-faqs");
    } catch (error) {
      alert(
        "Error updating FAQ: " +
          (error.response?.data?.message || error.message)
      );
    }
    setLoading(false);
  };

  return (
    <div className="p-3 w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit FAQ</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block mb-2">Question :</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Edit Question"
            className="border border-gray-300 rounded-md w-full px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Answer :</label>
          <textarea
            value={answer}
            placeholder="Edit Answer"
            onChange={(e) => setAnswer(e.target.value)}
            className="border border-gray-300 rounded-md w-full px-4 py-2"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update FAQ"}
        </button>
      </form>
    </div>
  );
};

export default EditFAQ;
