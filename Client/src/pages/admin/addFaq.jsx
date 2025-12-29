import { useState } from "react";
import axios from "axios";
import config from "../../common/config";

const AddFAQ = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("answer", answer);
  console.log(question);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.API_URL}/api/faqs`, {
        question,
        answer,
      });
      alert("Data Added Successfully");
      setQuestion("");
      setAnswer("");
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  return (
    <div className="p-3 w-full mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Question :</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Questiion"
            className="border border-gray-300 rounded-md w-full px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Answer :</label>
          <textarea
            value={answer}
            placeholder="Answer"
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
          {loading ? "Creating..." : "Create FAQ"}
        </button>
      </form>
    </div>
  );
};

export default AddFAQ;
