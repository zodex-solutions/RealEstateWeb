import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import TimeSlotSelector from "./timeSlots";
import Dns from "../../assets/dns.jpg";
import config from "../../common/config";
import axios from "axios";
const PreBookForm = ({ id, setIsSubmitted }) => {
  const [value, setValue] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    property_id: id,
    message: "",
    date: "",
    time: "",
    country_code: "+971",
    phone: "",
  });

  console.log("DAtaa  : ", formData);

  useEffect(() => {
    if (value && selectedSlot) {
      setShowForm(true);
      setFormData((prevData) => ({
        ...prevData,
        date: value.toDateString(),
        time: selectedSlot,
      }));
    }
  }, [value, selectedSlot]);

  const handleChangePreBook = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitPreBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const response = await axios.post(
        `${config.API_URL}/api/pre-book`,
        formData
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setTimeout(() => {
        setIsSubmitted(true);
      }, 2000);

      console.log("RESPONSE", response);
      setSuccessMessage("Query submitted successfully!");
      setFormData({
        name: "",
        email: "",
        property_id: "",
        message: "",
        date: "",
        time: "",
        country_code: "",
        phone: "",
      });
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed To Submit Query");
    }
    setLoading(false);
  };

  const today = new Date();

  return (
    <div>
      {showForm ? (
        <div className="grid   lg:grid-cols-2 md:grid-cols-2 gap-4 items-center grid-cols-1  lg:mt-16 md:mt-16 sm:mt-5 mt-14  h-full">
          <div className=" flex justify-center items-center h-full ">
            <img src={Dns} alt="logo" className="lg:h-auto md:h-auto h-32" />
          </div>
          <form
            onSubmit={handleSubmitPreBook}
            className="space-y-4 lg:mt- md:mt- mt-"
          >
            <p className="!text-xl !font-bold mb-4 ">Book a Viewing </p>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChangePreBook}
              className="border border-gray-300 rounded-md w-full px-4 py-2"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChangePreBook}
              className="border border-gray-300 rounded-md w-full px-4 py-2"
              required
            />

            <div className="flex gap-3">
              <select
                name="country_code"
                value={formData.country_code}
                onChange={handleChange}
                className="bg-white  border border-gray-300   rounded-[5px] text-black text-[12px]"
              >
                <option value="+971">UAE (+971)</option>
                <option value="+1">USA (+1)</option>
                <option value="+44">UK (+44)</option>
                <option value="+1">CAN (+1)</option>
                <option value="+61">AUS (+61)</option>
                <option value="+49">GER (+49)</option>
                <option value="+33">FRA (+33)</option>
                <option value="+39">ITA (+39)</option>
                <option value="+34">ESP (+34)</option>
                <option value="+31">NLD (+31)</option>
                <option value="+46">SWE (+46)</option>
                <option value="+41">SWZ (+41)</option>
                <option value="+47">NOR (+47)</option>
                <option value="+45">DEN (+45)</option>
                <option value="+32">BEL (+32)</option>
                <option value="+43">AUT (+43)</option>
                <option value="+64">NZL (+64)</option>
                <option value="+65">SGP (+65)</option>
                <option value="+852">HKG (+852)</option>
                <option value="+81">JPN (+81)</option>
                <option value="+86">CHN (+86)</option>
                <option value="+91">IND (+91)</option>
                <option value="+92">PAK (+92)</option>
                <option value="+880">BAN (+880)</option>
                <option value="+94">SL (+94)</option>
                <option value="+977">NEP (+977)</option>
                <option value="+55">BRA (+55)</option>
                <option value="+52">MEX (+52)</option>
                <option value="+7">RUS (+7)</option>
                <option value="+966">SA (+966)</option>
                <option value="+20">EGY (+20)</option>
                <option value="+90">TUR (+90)</option>
                <option value="+54">ARG (+54)</option>
                <option value="+57">COL (+57)</option>
                <option value="+62">IDN (+62)</option>
                <option value="+63">PHL (+63)</option>
                <option value="+84">VNM (+84)</option>
                <option value="+66">THA (+66)</option>
                <option value="+60">MYS (+60)</option>
                <option value="+82">KOR (+82)</option>
                <option value="+972">ISR (+972)</option>
                <option value="+27">ZAF (+27)</option>
                <option value="+254">KEN (+254)</option>
                <option value="+234">NGA (+234)</option>
                <option value="+251">ETH (+251)</option>
                <option value="+98">IRN (+98)</option>
                <option value="+964">IRQ (+964)</option>
                <option value="+965">KWT (+965)</option>
                <option value="+974">QAT (+974)</option>
                <option value="+968">OMN (+968)</option>
                <option value="+962">JOR (+962)</option>
                <option value="+961">LBN (+961)</option>
                <option value="+420">CZE (+420)</option>
                <option value="+48">POL (+48)</option>
                <option value="+36">HUN (+36)</option>
                <option value="+30">GRE (+30)</option>
                <option value="+351">PRT (+351)</option>
                <option value="+40">ROU (+40)</option>
                <option value="+359">BGR (+359)</option>
                <option value="+358">FIN (+358)</option>
                <option value="+354">ISL (+354)</option>
                <option value="+352">LUX (+352)</option>
                <option value="+353">IRL (+353)</option>
                <option value="+372">EST (+372)</option>
                <option value="+371">LVA (+371)</option>
                <option value="+370">LTU (+370)</option>
                <option value="+380">UKR (+380)</option>
                <option value="+381">SRB (+381)</option>
                <option value="+385">HRV (+385)</option>
                <option value="+421">SVK (+421)</option>
                <option value="+386">SVN (+386)</option>
                <option value="+375">BLR (+375)</option>
                <option value="+995">GEO (+995)</option>
                <option value="+374">ARM (+374)</option>
                <option value="+994">AZE (+994)</option>
                <option value="+7">KAZ (+7)</option>
                <option value="+998">UZB (+998)</option>
                <option value="+992">TJK (+992)</option>
                <option value="+993">TKM (+993)</option>
                <option value="+996">KGZ (+996)</option>
                <option value="+976">MNG (+976)</option>
              </select>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChangePreBook}
                className="border border-gray-300 rounded-md w-full px-4 py-2"
                required
              />
            </div>
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChangePreBook}
              className="border border-gray-300 rounded-md w-full px-4 py-2"
            />

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              {loading ? "Submitting" : "Submit"}
            </button>
            {successMessage && (
              <p className="text-green-600 mt-2">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-600 mt-2">{errorMessage}</p>
            )}
          </form>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold text-gray-800  mt-4 mb-5 ">
            Select a Date & Time
          </h2>
          <div className=" grid gap-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
            <div className="flex items-cente justify-cente bg-red00">
              <Calendar
                onChange={setValue}
                value={value}
                tileDisabled={({ date, view }) =>
                  view === "month" &&
                  date < new Date(today.setHours(0, 0, 0, 0))
                }
              />
            </div>
            <div className=" h-[460px]  overflow-hidden border border-gray-300 rounded-[5px]">
              <div className="h-full overflow-y-auto p-3">
                <TimeSlotSelector
                  setSelectedSlot={setSelectedSlot}
                  selectedSlot={selectedSlot}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PreBookForm;
