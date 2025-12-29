import React, { useState } from "react";
import axios from "axios";
import logo from "../../assets/flogo.png";
import config from "../../common/config";

export default function DownloadBrochureForm({ seoTitle, setIsSubmitted }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "",
    property: `https://dnsdxb.com/property/${seoTitle}`,
  });

  const [isloading, setIsLoading] = useState(false);
  //   console.log("formData", formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading immediately when form is submitted

    try {
      const res = await axios.post(`${config.API_URL}/api/brochure`, formData);
      console.log(res);

      setIsSubmitted(true); // Form submitted successfully
    } catch (error) {
      console.log("Error submitting form:", error);
    } finally {
      setIsLoading(false); // Always stop loading after try/catch
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-3">
      <img src={logo} alt="Dns Logo" className="h-12 mb-6" />
      <h2 className="text-lg !font-[500] text-[#2f5fa7] text-center mb-6">
        Please Enter Details to Get Brochures
      </h2>
      <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name*"
          className="border h-[42px] border-gray-300 p-3 rounded-[5px] w-full"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email address"
          className="border h-[42px] border-gray-300 p-3 rounded-[5px] w-full"
          required
        />
        <div className="relative">
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Mobile Number*"
            className="border h-[42px] border-gray-300 p-3 rounded-[5px] w-full pl-[115px]"
            required
          />
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            className="bg-white absolute left-2 top-1/2 transform -translate-y-1/2 border border-gray-300 h-[28px] w-[100px] rounded-[5px] text-black text-[12px]"
            required
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
        {/* Hidden Property Input (if you know which property) */}
        <input type="hidden" name="property" value={formData.property} />

        <button
          disabled={isloading}
          type="submit"
          className="w-full bg-[#2f5fa7] uppercase text-white p-3 rounded-md !font-[600] hover:bg-[#2f5fa7]"
        >
          {isloading ? "Submitting..." : "SUBMIT"}
        </button>
      </form>
    </div>
  );
}
