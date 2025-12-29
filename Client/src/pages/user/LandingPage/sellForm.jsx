import React, { useState } from "react";
import { FaBuilding } from "react-icons/fa";
import bgImage from "../../../assets/bg.jpg";
import config from "../../../common/config";
import axios from "axios";
import { toast } from "react-toastify";

const SellForm = ({ setIsOpenSellModel }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    city: "",
    country: "",
    countryCode: "",
    email: "",
    query: "",
  });

  console.log(formData);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    console.log(config.API_URL);
    try {
      const res = await axios.post(`${config.API_URL}/api/inquiry`, formData);
      console.log("Response:", res);
      setIsOpenSellModel(false);
      toast("Your inquiry has been submitted successfully!");
    } catch (error) {
      console.log("Error:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className=" w-full !z-50 bg-cover bg-center flex items-center justify-center lg:py-8 md:py-8 sm:py-8 mt-12  overflow-y-scroll"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full lg:max-w-md md:max-w-md  sm:max-w-md  h-full bg-white/60 backdrop-blur-sm lg:rounded-xl md:rounded-xl sm:rounded-xl p-5 overflow-y-scroll shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#243b6a] mb-2">CONTACT US</h2>
          <div className="flex items-center justify-center gap-2">
            <hr className="w-1/4 border-t border-[#243b6a]" />
            <FaBuilding className="text-[#365187] text-3xl" />
            <hr className="w-1/4 border-t border-[#1A2948]" />
          </div>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name*"
            className="border h-[42px] bg-white text-black border-gray-300 p-3 rounded-[5px] w-full"
            required
          />
          <div className="relative">
            <input
              type="number"
              name="contactNumber"
              placeholder="Phone *"
              value={formData.contactNumber}
              onChange={handleChange}
              className="border h-[42px] bg-white text-black border-gray-300 p-3 rounded-[5px] pl-[115px] w-full"
              required
            />
            <select
              name="countryCode"
              value={formData.countryCode}
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
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City*"
            className="border h-[42px] bg-white text-black border-gray-300 p-3 rounded-[5px] w-full"
            required
          />
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country*"
            className="border h-[42px] bg-white text-black border-gray-300 p-3 rounded-[5px] w-full"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email ID*"
            className="border h-[42px] bg-white text-black border-gray-300 p-3 rounded-[5px] w-full"
            required
          />
          <textarea
            name="query"
            value={formData.query}
            onChange={handleChange}
            placeholder="Any Query"
            rows={4}
            className="border bg-white text-black border-gray-300 p-3 rounded-[5px] w-full h-28"
          />
          <button
            type="submit"
            className="w-full bg-[#1A2948] text-white py-3 rounded hover:bg-[#12203A] transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "SUBMIT"}
          </button>

          {message && (
            <p className="text-center mt-2 text-sm text-[#1A2948]">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SellForm;
