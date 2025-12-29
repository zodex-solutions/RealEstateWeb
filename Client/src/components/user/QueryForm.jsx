import React, { useState } from "react";
import axios from "axios";
import config from "../../common/config";
import { toast, ToastContainer } from "react-toastify";
import { RiMessage3Fill } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa6";
import { MdOutlineMessage } from "react-icons/md";
import { BiSolidMessageDetail } from "react-icons/bi";

const QueryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    currency: "",
    message: "",
    acceptedPrivacy: false,
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // console.log(formData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(
        `${config.API_URL}/api/queries`,
        formData
      );
      toast.success("Query submitted successfully!");
      setSuccessMessage("Query submitted successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        phone: "",
        currency: "",
        message: "",
        acceptedPrivacy: false,
      });

      goTop();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setErrorMessage("Something went wrong");
    }

    setLoading(false);
  };

  const notify = () => toast("Wow so easy!");

  return (
    <section>
      <div className="w-full max-w-[597px bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify- gap-2 mb-2">
          {" "}
          <BiSolidMessageDetail size={23} className="text-[#2F5FA7]" />
          <h3 className="text-xl font-bold ">Contact Form</h3>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="border h-[42px] border-gray-300 p-3 rounded-[5px] w-full pl-10"
              required
            />
            <FaRegCircleUser
              size={18}
              className="font-bold absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2F5FA7]"
            />
            {/* <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2F5FA7]"></i> */}
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              className="border h-[42px] border-gray-300 p-3 rounded-[5px] w-full pl-10"
              required
            />
            <MdOutlineAlternateEmail
              size={20}
              className="font-bold absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2F5FA7]"
            />

            {/* <i className="fas fa-at absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2F5FA7] text-xl"></i> */}
          </div>
          <div className="relative">
            <input
              type="text"
              name="subject"
              placeholder="Subject *"
              value={formData.subject}
              onChange={handleChange}
              className="border h-[42px] border-gray-300 p-3 rounded-[5px] w-full pl-10"
              required
            />
            <i className="fas fa-book absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2F5FA7]"></i>
          </div>
          <div className="relative">
            <input
              type="number"
              name="phone"
              placeholder="Phone *"
              value={formData.phone}
              onChange={handleChange}
              className="border h-[42px] border-gray-300 p-3 rounded-[5px] w-full pl-[115px]"
              required
            />
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="bg-white absolute left-2 top-1/2 transform -translate-y-1/2 border border-gray-300 h-[28px] w-[100px]  rounded-[5px] text-black text-[12px]"
            >
              <option value="" disabled>
                Select
              </option>
              <option value="+971">🇦🇪 UAE (+971)</option>
              <option value="+1">🇺🇸 USA (+1)</option>
              <option value="+44">🇬🇧 UK (+44)</option>
              <option value="+1">🇨🇦 CAN (+1)</option>
              <option value="+61">🇦🇺 AUS (+61)</option>
              <option value="+49">🇩🇪 GER (+49)</option>
              <option value="+33">🇫🇷 FRA (+33)</option>
              <option value="+39">🇮🇹 ITA (+39)</option>
              <option value="+34">🇪🇸 ESP (+34)</option>
              <option value="+31">🇳🇱 NLD (+31)</option>
              <option value="+46">🇸🇪 SWE (+46)</option>
              <option value="+41">🇨🇭 SWZ (+41)</option>
              <option value="+47">🇳🇴 NOR (+47)</option>
              <option value="+45">🇩🇰 DEN (+45)</option>
              <option value="+32">🇧🇪 BEL (+32)</option>
              <option value="+43">🇦🇹 AUT (+43)</option>
              <option value="+64">🇳🇿 NZL (+64)</option>
              <option value="+65">🇸🇬 SGP (+65)</option>
              <option value="+852">🇭🇰 HKG (+852)</option>
              <option value="+81">🇯🇵 JPN (+81)</option>
              <option value="+86">🇨🇳 CHN (+86)</option>
              <option value="+91">🇮🇳 IND (+91)</option>
              <option value="+92">🇵🇰 PAK (+92)</option>
              <option value="+880">🇧🇩 BAN (+880)</option>
              <option value="+94">🇱🇰 SL (+94)</option>
              <option value="+977">🇳🇵 NEP (+977)</option>
              <option value="+55">🇧🇷 BRA (+55)</option>
              <option value="+52">🇲🇽 MEX (+52)</option>
              <option value="+7">🇷🇺 RUS (+7)</option>
              <option value="+966">🇸🇦 SA (+966)</option>
              <option value="+20">🇪🇬 EGY (+20)</option>
              <option value="+90">🇹🇷 TUR (+90)</option>
              <option value="+54">🇦🇷 ARG (+54)</option>
              <option value="+57">🇨🇴 COL (+57)</option>
              <option value="+62">🇮🇩 IDN (+62)</option>
              <option value="+63">🇵🇭 PHL (+63)</option>
              <option value="+84">🇻🇳 VNM (+84)</option>
              <option value="+66">🇹🇭 THA (+66)</option>
              <option value="+60">🇲🇾 MYS (+60)</option>
              <option value="+82">🇰🇷 KOR (+82)</option>
              <option value="+972">🇮🇱 ISR (+972)</option>
              <option value="+27">🇿🇦 ZAF (+27)</option>
              <option value="+254">🇰🇪 KEN (+254)</option>
              <option value="+234">🇳🇬 NGA (+234)</option>
              <option value="+251">🇪🇹 ETH (+251)</option>
              <option value="+98">🇮🇷 IRN (+98)</option>
              <option value="+964">🇮🇶 IRQ (+964)</option>
              <option value="+965">🇰🇼 KWT (+965)</option>
              <option value="+974">🇶🇦 QAT (+974)</option>
              <option value="+968">🇴🇲 OMN (+968)</option>
              <option value="+962">🇯🇴 JOR (+962)</option>
              <option value="+961">🇱🇧 LBN (+961)</option>
              <option value="+420">🇨🇿 CZE (+420)</option>
              <option value="+48">🇵🇱 POL (+48)</option>
              <option value="+36">🇭🇺 HUN (+36)</option>
              <option value="+30">🇬🇷 GRE (+30)</option>
              <option value="+351">🇵🇹 PRT (+351)</option>
              <option value="+40">🇷🇴 ROU (+40)</option>
              <option value="+359">🇧🇬 BGR (+359)</option>
              <option value="+358">🇫🇮 FIN (+358)</option>
              <option value="+354">🇮🇸 ISL (+354)</option>
              <option value="+352">🇱🇺 LUX (+352)</option>
              <option value="+353">🇮🇪 IRL (+353)</option>
              <option value="+372">🇪🇪 EST (+372)</option>
              <option value="+371">🇱🇻 LVA (+371)</option>
              <option value="+370">🇱🇹 LTU (+370)</option>
              <option value="+380">🇺🇦 UKR (+380)</option>
              <option value="+381">🇷🇸 SRB (+381)</option>
              <option value="+385">🇭🇷 HRV (+385)</option>
              <option value="+421">🇸🇰 SVK (+421)</option>
              <option value="+386">🇸🇮 SVN (+386)</option>
              <option value="+375">🇧🇾 BLR (+375)</option>
              <option value="+995">🇬🇪 GEO (+995)</option>
              <option value="+374">🇦🇲 ARM (+374)</option>
              <option value="+994">🇦🇿 AZE (+994)</option>
              <option value="+7">🇰🇿 KAZ (+7)</option>
              <option value="+998">🇺🇿 UZB (+998)</option>
              <option value="+992">🇹🇯 TJK (+992)</option>
              <option value="+993">🇹🇲 TKM (+993)</option>
              <option value="+996">🇰🇬 KGZ (+996)</option>
              <option value="+976">🇲🇳 MNG (+976)</option>
            </select>
          </div>
          <div className="relative">
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-[5px] w-full h-32 pl-10"
              required
            />
            <MdOutlineMessage
              size={22}
              className="font-bold absolute left-3 top-6.5 transform -translate-y-1/2 text-[#2F5FA7]"
            />
            {/* <i className="fas fa-comment-dots absolute left-3 top-3.5 transform translate-y-1 text-[#2F5FA7]"></i> */}
          </div>
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="privacy"
              name="acceptedPrivacy"
              checked={formData.acceptedPrivacy}
              onChange={handleChange}
              className="w-4 h-4"
              required
            />
            <div className="flex flex-col -mt-1">
              <label htmlFor="privacy" className="text-sm text-gray-700">
                I confirm that i have read and agree to the{" "}
              </label>
              <a href="/terms&condition" className="text-sm  hover:!underline">
                Terms and Condition.
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#1A2948] flex items-center  gap-3 text-white py-3 max-w-[149px] rounded-[5px] text-lg font-semibold hover:bg-[#15203A]"
            disabled={loading}
          >
            {loading ? "" : <FaLocationArrow size={20} />}
            {loading ? "Submitting..." : "Submit"}
          </button>

          {successMessage && <p className="text-green-600">{successMessage}</p>}
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        </form>
      </div>
    </section>
  );
};

export default QueryForm;
