import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../common/config";
import ImageUploader from "../../common/ImageUpload";
import { FaTrash } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles
import { Editor } from "@tinymce/tinymce-react";

const AddConsultant = () => {
  const [content, setContent] = useState("");
  console.log(" Contnet ", content);
  const handleChange2 = (value) => {
    setContent(value);
  };
  useEffect(() => {
    setFormData((prev) => ({ ...prev, description: content }));
  }, [content]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    email: "",
    language: "",
    country_code: "",
    phone: "",
    profile_pic: "",
  });

  const [loading, setLoading] = useState(false);
  const [consultants, setConsultants] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/consultant`)
      .then((response) => setConsultants(response.data.data))
      .catch((error) => console.log(error.message));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUploadImage = (uploadedFile) => {
    setFormData({ ...formData, profile_pic: uploadedFile[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${config.API_URL}/api/consultant`,
        formData
      );
      alert("Consultant added successfully!");
      setFormData({
        name: "",
        description: "",
        email: "",
        language: "",
        country_code: "",
        phone: "",
        // whatsappNumber: "",
        profile_pic: null,
      });
    } catch (error) {
      alert(
        "Failed to add consultant: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChangeDescription = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: value, // Update long_description with editor content
    }));
  };

  return (
    <div className="mx-auto p-3 rounded-lg w-full">
      {/* <h2 className="text-xl font-bold mb-4">Add Consultant</h2> */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mt-1 border !border-gray-300 rounded-md  px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description:</label>
          {/* <ReactQuill value={content} onChange={handleChange2} theme="snow" /> */}
          <Editor
            apiKey={config.Editor_API}
            value={formData.description}
            onEditorChange={handleChangeDescription}
            init={{
              height: 250,
              menubar: true, // Enables full menu bar
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
                "lists", // Enables unordered (ul) & ordered (ol) lists
                "table", // Enables table functionality
              ],
              toolbar:
                "undo redo | formatselect | fontsizeselect | bold italic underline | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | table | removeformat | help",
              fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt",
            }}
          />
          {/* <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md  px-4 py-2"
            ></textarea> */}
        </div>
        <div>
          <label className="block text-sm font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md  px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Languages :</label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
            className="w-full mt-1 border !border-gray-300 rounded-md  px-4 py-2"
          />
        </div>
        <div className="flex gap-5 ">
          <div className="!max-w-52">
            <label className="block text-sm font-medium">Country Code:</label>
            <select
              name="country_code"
              value={formData.country_code}
              onChange={handleChange}
              required
              className=" mt-1 p-2 border border-gray-300 rounded-md w-52  px- py-2"
            >
              <option value="" disabled>
                Country Code
              </option>
              <option value="+971">+971 (UAE - Dubai)</option>
              <option value="+974">+974 (Qatar)</option>
              <option value="+93">+93 (Afghanistan)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+7">+7 (Russia)</option>
              <option value="+20">+20 (Egypt)</option>
              <option value="+27">+27 (South Africa)</option>
              <option value="+30">+30 (Greece)</option>
              <option value="+31">+31 (Netherlands)</option>
              <option value="+32">+32 (Belgium)</option>
              <option value="+33">+33 (France)</option>
              <option value="+34">+34 (Spain)</option>
              <option value="+36">+36 (Hungary)</option>
              <option value="+39">+39 (Italy)</option>
              <option value="+40">+40 (Romania)</option>
              <option value="+41">+41 (Switzerland)</option>
              <option value="+43">+43 (Austria)</option>
              <option value="+44">+44 (United Kingdom)</option>
              <option value="+45">+45 (Denmark)</option>
              <option value="+46">+46 (Sweden)</option>
              <option value="+47">+47 (Norway)</option>
              <option value="+48">+48 (Poland)</option>
              <option value="+49">+49 (Germany)</option>
              <option value="+51">+51 (Peru)</option>
              <option value="+52">+52 (Mexico)</option>
              <option value="+53">+53 (Cuba)</option>
              <option value="+54">+54 (Argentina)</option>
              <option value="+55">+55 (Brazil)</option>
              <option value="+56">+56 (Chile)</option>
              <option value="+57">+57 (Colombia)</option>
              <option value="+58">+58 (Venezuela)</option>
              <option value="+60">+60 (Malaysia)</option>
              <option value="+61">+61 (Australia)</option>
              <option value="+62">+62 (Indonesia)</option>
              <option value="+63">+63 (Philippines)</option>
              <option value="+64">+64 (New Zealand)</option>
              <option value="+65">+65 (Singapore)</option>
              <option value="+66">+66 (Thailand)</option>
              <option value="+81">+81 (Japan)</option>
              <option value="+82">+82 (South Korea)</option>
              <option value="+84">+84 (Vietnam)</option>
              <option value="+86">+86 (China)</option>
              <option value="+90">+90 (Turkey)</option>
              <option value="+91">+91 (India)</option>
              <option value="+92">+92 (Pakistan)</option>
              <option value="+93">+93 (Afghanistan)</option>
              <option value="+94">+94 (Sri Lanka)</option>
              <option value="+95">+95 (Myanmar)</option>
              <option value="+98">+98 (Iran)</option>
              <option value="+211">+211 (South Sudan)</option>
              <option value="+212">+212 (Morocco)</option>
              <option value="+213">+213 (Algeria)</option>
              <option value="+216">+216 (Tunisia)</option>
              <option value="+218">+218 (Libya)</option>
              <option value="+220">+220 (Gambia)</option>
              <option value="+221">+221 (Senegal)</option>
              <option value="+222">+222 (Mauritania)</option>
              <option value="+223">+223 (Mali)</option>
              <option value="+224">+224 (Guinea)</option>
              <option value="+225">+225 (Ivory Coast)</option>
              <option value="+226">+226 (Burkina Faso)</option>
              <option value="+227">+227 (Niger)</option>
              <option value="+228">+228 (Togo)</option>
              <option value="+229">+229 (Benin)</option>
              <option value="+230">+230 (Mauritius)</option>
              <option value="+231">+231 (Liberia)</option>
              <option value="+232">+232 (Sierra Leone)</option>
              <option value="+233">+233 (Ghana)</option>
              <option value="+234">+234 (Nigeria)</option>
              <option value="+235">+235 (Chad)</option>
              <option value="+236">+236 (Central African Republic)</option>
              <option value="+237">+237 (Cameroon)</option>
              <option value="+238">+238 (Cape Verde)</option>
              <option value="+239">+239 (São Tomé and Príncipe)</option>
              <option value="+240">+240 (Equatorial Guinea)</option>
              <option value="+241">+241 (Gabon)</option>
              <option value="+242">+242 (Republic of the Congo)</option>
              <option value="+243">
                +243 (Democratic Republic of the Congo)
              </option>
              <option value="+244">+244 (Angola)</option>
              <option value="+245">+245 (Guinea-Bissau)</option>
              <option value="+246">
                +246 (British Indian Ocean Territory)
              </option>
              <option value="+248">+248 (Seychelles)</option>
              <option value="+249">+249 (Sudan)</option>
              <option value="+250">+250 (Rwanda)</option>
              <option value="+251">+251 (Ethiopia)</option>
              <option value="+252">+252 (Somalia)</option>
              <option value="+253">+253 (Djibouti)</option>
              <option value="+254">+254 (Kenya)</option>
              <option value="+255">+255 (Tanzania)</option>
              <option value="+256">+256 (Uganda)</option>
              <option value="+257">+257 (Burundi)</option>
              <option value="+258">+258 (Mozambique)</option>
              <option value="+260">+260 (Zambia)</option>
              <option value="+261">+261 (Madagascar)</option>
              <option value="+262">+262 (Réunion)</option>
              <option value="+263">+263 (Zimbabwe)</option>
              <option value="+264">+264 (Namibia)</option>
              <option value="+265">+265 (Malawi)</option>
              <option value="+266">+266 (Lesotho)</option>
              <option value="+267">+267 (Botswana)</option>
              <option value="+268">+268 (Eswatini)</option>
              <option value="+269">+269 (Comoros)</option>
              <option value="+290">+290 (Saint Helena)</option>
              <option value="+291">+291 (Eritrea)</option>
              <option value="+297">+297 (Aruba)</option>
              <option value="+298">+298 (Faroe Islands)</option>
              <option value="+299">+299 (Greenland)</option>
              <option value="+350">+350 (Gibraltar)</option>
              <option value="+351">+351 (Portugal)</option>
              <option value="+352">+352 (Luxembourg)</option>
              <option value="+353">+353 (Ireland)</option>
              <option value="+354">+354 (Iceland)</option>
              <option value="+355">+355 (Albania)</option>
              <option value="+356">+356 (Malta)</option>
              <option value="+357">+357 (Cyprus)</option>
              <option value="+358">+358 (Finland)</option>
              <option value="+359">+359 (Bulgaria)</option>
              <option value="+370">+370 (Lithuania)</option>
              <option value="+371">+371 (Latvia)</option>
              <option value="+372">+372 (Estonia)</option>
              <option value="+373">+373 (Moldova)</option>
              <option value="+374">+374 (Armenia)</option>
              <option value="+375">+375 (Belarus)</option>
              <option value="+376">+376 (Andorra)</option>
              <option value="+377">+377 (Monaco)</option>
              <option value="+378">+378 (San Marino)</option>
              <option value="+380">+380 (Ukraine)</option>
              <option value="+381">+381 (Serbia)</option>
              <option value="+382">+382 (Montenegro)</option>
              <option value="+383">+383 (Kosovo)</option>
              <option value="+385">+385 (Croatia)</option>
              <option value="+386">+386 (Slovenia)</option>
              <option value="+387">+387 (Bosnia and Herzegovina)</option>
              <option value="+389">+389 (North Macedonia)</option>
              <option value="+420">+420 (Czech Republic)</option>
              <option value="+421">+421 (Slovakia)</option>
              <option value="+423">+423 (Liechtenstein)</option>
            </select>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium">Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md  px-4 py-2"
            />
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium">Profile Picture :</label>
          <div className="flex gap-4">
            <div className="w-full">
              <ImageUploader onUpload={handleUploadImage} />
            </div>

            {/* Delete Button */}
            <div
              className="px-5 flex items-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  profile_pic: null, // Instead of [], set to null to match data type
                }))
              }
            >
              <FaTrash size={20} />
            </div>
          </div>
          {formData.profile_pic && (
            <div className="mt-4">
              <img
                src={formData.profile_pic}
                alt="Profile"
                className="w-24 h-24 rounded-md object-cover"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className=" text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Adding..." : "Add Consultant"}
        </button>
      </form>
    </div>
  );
};

export default AddConsultant;
