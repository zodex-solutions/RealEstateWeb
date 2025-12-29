import React, { useEffect, useState } from "react";
import axios from "axios";
import bannerimage from "../../assets/bannerimage.png";
import config from "../../common/config";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/api/service`);
        setServices(response.data);
      } catch (err) {
        console.error("Error fetching services:", err.message);
        setError("Failed to fetch services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="bg-white">
      {/* Banner Section */}
      <section className="relative w-full mb-10 bg-gradient-to-b py-10 -mt-3 from-[#2e0e0f] to-[#241c2c] text-white min-h-[350px] flex items-center justify-center">
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] z-10" />
        <img
          src={bannerimage}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="relative z-20 text-center max-w-7xl px-4">
          <h1 className="text-4xl font-bold mb-6">
            Services - DNS Real Estate
          </h1>
          <p className="leading-relaxed mb-8 max-w-4xl mx-auto">
            Explore a comprehensive range of specialized services. We cater to a
            wide spectrum of real estate needs, offering personalized solutions
            for every client—from residential sales to investment consultants.
          </p>
        </div>
      </section>

      {/* Service Cards Section */}
      <div className="max-w-7xl mx-auto px-5 py-10">
        {loading ? (
          <div className="text-center text-gray-500 text-xl">
            Loading services...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg">{error}</div>
        ) : services.length === 0 ? (
          <div className="text-center text-gray-600">
            No services available at the moment.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {services.map((service) => (
              <div
                key={service._id || service.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={
                    service.image ||
                    "https://via.placeholder.com/600x400?text=No+Image"
                  }
                  alt={service.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-blue-600 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 mb-5">{service.description}</p>
                  <a
                    href="/contact-us" // Change to your contact route or WhatsApp link
                    className="inline-block bg-[#2f5fa7] !text-white py-2 px-6 rounded hover:bg-[#2f5fa7] hover:scale-[102%] transition"
                  >
                    ENQUIRE NOW
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
