import React, { useEffect, useState } from "react";
import axios from "axios";
import { Phone, Mail, MessageCircle } from "lucide-react";

import config from "../../../common/config";
import bannerimage from "../../../assets/bannerimage.png";
import { FaWhatsapp } from "react-icons/fa";

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/team`)
      .then((res) => setTeamMembers(res.data))
      .catch((err) =>
        console.log(
          "Failed to fetch team members: " +
            (err.response?.data?.message || err)
        )
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="">
      {/* Header Banner */}
      <section className="relative bg-gradient-to-b py-10 -mt-3 from-[#2e0e0f] to-[#241c2c] text-white min-h-[350px] flex items-center justify-center">
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-60 z-10"></div>

        <img
          src={bannerimage}
          alt="Team Banner"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="relative z-20 text-center max-w-3xl px-4">
          <h1 className="heading text-white mb-6">Meet Our Team</h1>
          <p className="leading-relaxed mb-8 max-w-4xl">
            At DNS Real Estates, our team is the cornerstone of our success.
            Backed by extensive experience and deep industry knowledge, they are
            dedicated to building meaningful client relationships and
            consistently delivering exceptional results.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <div className="max-w-7xl mx-auto px-5 my-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {loading ? (
          <p className="col-span-full text-center text-gray-600">
            Loading team...
          </p>
        ) : teamMembers.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">
            No team members found.
          </p>
        ) : (
          teamMembers.map((member, index) => (
            <div
              key={member._id || index}
              className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col items-center text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 object-cover rounded-full mb-4 border-3 border-blue-100"
              />
              <h3 className="font-semibold text-gray-800">{member.name}</h3>
              <p className="text-sm text-[#2f5fa7]">{member.title}</p>
              <p className="text-xs text-gray-500 mt-1">{member.languages}</p>

              <div className="flex gap-4 mt-4 text-[#2f5fa7]">
                {member.phone && (
                  <a href={`tel:${member.phone}`} title="Phone">
                    <Phone className="w-5 h-5 hover:text-[#2f5fa7] cursor-pointer" />
                  </a>
                )}
                {member.email && (
                  <a href={`mailto:${member.email}`} title="Email">
                    <Mail className="w-5 h-5 hover:text-[#2f5fa7] cursor-pointer" />
                  </a>
                )}
                {member.whatsapp && (
                  <a
                    href={`https://wa.me/${member.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                  >
                    <FaWhatsapp className="w-5 h-5 hover:text-[#2f5fa7] cursor-pointer" />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default TeamPage;
