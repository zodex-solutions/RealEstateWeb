import { useEffect, useState } from "react";
import { IoAdd, IoRemove } from "react-icons/io5";
import QueryForm from "../../../components/user/QueryForm";
import axios from "axios";
import config from "../../../common/config";

export default function FAQWithForm() {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/api/faqs`);
        setFaqs(response.data.data);
        // console.log(response.data);
      } catch (error) {
        setError("Failed to fetch FAQs");
      }
      setLoading(false);
    };
    fetchFaqs();
  }, []);

  // console.log(faqs);

  return (
    <div className="bg-[#F3F4F7] py-5 ">
      <div className="max-w-[1320px] mx-auto px-5  flex flex-col lg:flex-row   gap-10">
        {/* Left Side - FAQ Accordion */}
        <div className="w-full lg:w-full">
          {/* lg:text-[30px] md:text-[30px] sm:text-[27px] text-[23px] */}
          <h2 className="heading  text-[#1A2948] mb-2">
            Frequently Asked Questions
          </h2>
          <span className="border-b-[3px]  border-[#A9B9D6] flex w-[150px] mb-6"></span>
          <div>
            {faqs.length > 0 &&
              faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-300">
                  <a
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center py-5 lg:text-[20px] md:text-[20px] sm:text-[18px] text-[15px] font-normal text-[#1A2948] focus:outline-none"
                  >
                    {faq.question}
                    {openIndex === index ? (
                      <IoRemove className="text-2xl text-[#1A2948]" />
                    ) : (
                      <IoAdd className="text-2xl text-[#1A2948]" />
                    )}
                  </a>
                  {openIndex === index && (
                    <div className="pb-5 text-gray-700 lg:text-[18px] md:text-[18px] sm:text-[15px] text-[13px] leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="w-full lg:w-1/2 ">
          <QueryForm />
        </div>
      </div>
    </div>
  );
}
