import axios from "axios";
import React, { useState } from "react";
import config from "../../common/config";
import ImageUploader from "../../common/ImageUpload";
import { ToastContainer, toast } from "react-toastify";
import { Linkedin, Mail, User } from "lucide-react";

const JobApplicationForm = () => {
  const notify = () => toast("Wow so easy!");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    code: "+971",
    phone: "",
    linkedin: "",
    resume: null,
    coverLetter: "",
  });

  const handleUploadImage = (uploadedFile) => {
    setFormData({ ...formData, resume: uploadedFile[0] });
  };

  console.log(formData);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const [loading, setLoading] = useState(false);

  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setLoading(true);
    try {
      const res = await axios.post(`${config.API_URL}/api/jobForm`, formData);
      toast.success("Your Application Submitted");
      setFormData({
        fullName: "",
        email: "",
        code: "+971",
        phone: "",
        linkedin: "",
        resume: null,
        coverLetter: "",
      });
      goTop();
      console.log(res);
    } catch (err) {
      toast.error("Error submitting application");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="form" className="pt-20">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="subheading mb-2 text-[#2f5fa7]">
          Join Our Journey of Growth
        </h2>
        <p className="px-4">
          At DNS Real Estates, we provide a wide range of real estate services
          designed to help you succeed and grow with us.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto lg:border md:border md:border-gray-200 lg:border-gray-200  p-6 m-5 mt-12 bg-white rounded-md lg:shadow-xl md:shadow-xl space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <div className="flex items-center border border-gray-300 rounded px-3 ">
              <span className="text-[#2f5fa7] mr-2">
                <User />
              </span>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your Name"
                className="  outline-none  p-2.5  w-full "
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-gray-300 rounded px-3 ">
              <select
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="bg-white   border border-gray-300 h-[28px] w-[100px]  rounded-[3px] text-black text-[12px]"
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
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="  outline-none  p-2.5  w-full "
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email Address
          </label>
          <div className="flex items-center border border-gray-300 rounded px-3 ">
            <span className="text-[#2f5fa7] mr-2">
              {" "}
              <Mail />
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="  outline-none  p-2.5  w-full "
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              LinkedIn
            </label>
            <div className="flex items-center border border-gray-300 rounded px-3 ">
              <span className="text-[#2f5fa7] mr-2">
                {" "}
                <Linkedin />
              </span>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="Your LinkedIn"
                className="  outline-none  p-2.5  w-full "
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Resume
            </label>
            <ImageUploader onUpload={handleUploadImage} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Cover Letter
          </label>
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            placeholder="Enter text..."
            className="fle w-full items-center outline-none h-40 border border-gray-300 rounded px-3 py-2"
          ></textarea>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="flex items-center bg-orange-500 text-white font-medium px-6 py-3 rounded hover:bg-orange-600 transition"
        >
          {loading ? "Submitting..." : "Submit Application"}{" "}
        </button>
      </form>
    </section>
  );
};

export default JobApplicationForm;
