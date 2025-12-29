import {
  BadgeCheck,
  Eye,
  Heart,
  Lightbulb,
  Rocket,
  Smile,
  ThumbsUp,
  TrendingUp,
  Trophy,
} from "lucide-react";
import React from "react";
import Teamwork from "../../assets/teamwork.webp";
import Culture from "../../assets/culture.webp";
import Workspace from "../../assets/workspace.jpg";
import Celebration from "../../assets/celebration.webp";
const JoinUsSection = () => {
  return (
    <section className="bg-white">
      {/* Header Section */}
      <div className="text-center px-6 py-16 max-w-6xl mx-auto">
        <h2 className="subheading text-[#2f5fa7] mb-4">
          Build Your Future with{" "}
          <span className="text-[#2f5fa7]">DNS Real Estates</span>
        </h2>
        <p className="text-base leading-relaxed max-w-3xl mx-auto">
          At DNS, we believe that people are our biggest asset. Join a dynamic
          and inspiring workplace where your ideas matter and your growth is our
          priority.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto px-6 mb-16">
        <img
          src={Teamwork}
          alt="Teamwork"
          className="rounded-lg h-48 w-full object-cover shadow-sm"
        />
        <img
          src={Culture}
          alt="Culture"
          className="rounded-lg h-48 w-full object-cover shadow-sm"
        />
        <img
          src={Workspace}
          alt="Workspace"
          className="rounded-lg h-48 w-full object-cover shadow-sm"
        />
        <img
          src={Celebration}
          alt="Celebration"
          className="rounded-lg h-48 w-full object-cover shadow-sm"
        />
      </div>

      {/* Video Introduction */}
      {/* <div className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="aspect-video bg-gray-300 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
            <video controls className="w-full h-full object-cover">
              <source src="/dns-career-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div> */}

      {/* Why Join DNS */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h3 className="subheading font-bold text-[#2f5fa7]">
            Why Choose <span className="text-[#2f5fa7]">DNS Real Estates</span>?
          </h3>
          <p className=" mt-3 ">
            Discover what makes DNS an exceptional place to work, grow, and
            lead.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Reason 1 */}
          <div className="flex gap-5 items-start">
            <Rocket className="h-24 w-auto text-[#2f5fa7]" />
            <div>
              <h4 className="font-semibold text-[#2f5fa7]">
                Visionary Leadership
              </h4>
              <p className="text-sm text-gray-700 mt-1">
                Led by industry pioneers, DNS fosters a forward-thinking,
                inclusive leadership style that drives real change.
              </p>
            </div>
          </div>

          {/* Reason 2 */}
          <div className="flex gap-5 items-start">
            <ThumbsUp className="h-24 w-auto text-[#2f5fa7]" />
            <div>
              <h4 className="font-semibold text-[#2f5fa7]">
                Positive Work Culture
              </h4>
              <p className="text-sm text-gray-700 mt-1">
                Our collaborative culture encourages creativity, respect, and
                transparency across all teams.
              </p>
            </div>
          </div>

          {/* Reason 3 */}
          <div className="flex gap-5 items-start">
            <Trophy className="h-24 w-auto text-[#2f5fa7]" />
            <div>
              <h4 className="font-semibold text-[#2f5fa7]">
                Performance-Based Rewards
              </h4>
              <p className="text-sm text-gray-700 mt-1">
                DNS appreciates talent with competitive compensation, career
                advancement, and regular recognition.
              </p>
            </div>
          </div>

          {/* Reason 4 */}
          <div className="flex gap-5 items-start">
            <TrendingUp className="h-24 w-auto text-[#2f5fa7]" />

            <div>
              <h4 className="font-semibold text-[#2f5fa7]">
                Continuous Growth
              </h4>
              <p className="text-sm text-gray-700 mt-1">
                We invest in your personal and professional growth with
                world-class training and mentorship programs.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Stats Section */}
      {/* <div className="bg-gray-100 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-6xl mx-auto px-4">
          <div>
            <p className="text-3xl font-bold text-[#2f5fa7]">15+</p>
            <p className="text-sm text-gray-600 mt-1">Years of Excellence</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[#2f5fa7]">10+</p>
            <p className="text-sm text-gray-600 mt-1">Global Locations</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[#2f5fa7]">1200+</p>
            <p className="text-sm text-gray-600 mt-1">Professional Experts</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[#2f5fa7]">6M+</p>
            <p className="text-sm text-gray-600 mt-1">Sq. Ft. Sold Annually</p>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default JoinUsSection;
