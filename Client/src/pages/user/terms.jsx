import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="bg-white text-black min-h-screen p-4 flex flex-col items-center">
      <div className="max-w-7xl w-full text-center">
        <h1 className="heading text-[#2f5fa7] mb-6">
          Terms and Conditions - DNS Real Estate
        </h1>
        <p className=" leading-relaxed mb-6 md:px-20">
          Welcome to <strong>DNS Real Estate</strong>. By accessing or using our
          website (
          <a href="https://www.dnsdxb.com" className="text-[#2f5fa7] underline">
            www.dnsdxb.com
          </a>
          ) and our services, you agree to comply with the following terms and
          conditions. Please read them carefully.
        </p>
      </div>
      <div className="max-w-7xl w-full">
        <h2 className="subheading font-semibold text-[#2f5fa7] mt-6">
          1. Acceptance of Terms
        </h2>
        <p className="mt-2">
          By using our website and services, you confirm that you accept these
          Terms and Conditions and agree to abide by them. If you do not agree,
          please do not use our website.
        </p>

        <h2 className="subheading font-semibold text-[#2f5fa7] mt-6">
          2. Services Overview
        </h2>
        <p className="mt-2">
          DNS Real Estate provides real estate services, including property
          buying, selling, renting, and property management in Dubai and
          internationally.
        </p>

        <h2 className="subheading font-semibold text-[#2f5fa7] mt-6">
          3. User Responsibilities
        </h2>
        <ul className="list-disc pl-6 mt-2">
          <li>
            You must provide accurate and complete information when using our
            services.
          </li>
          <li>
            You agree not to misuse our website, engage in unlawful activities,
            or compromise the security of the website.
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your
            account information.
          </li>
        </ul>

        <h2 className="subheading font-semibold text-[#2f5fa7] mt-6">
          4. Property Listings and Information
        </h2>
        <p className="mt-2">
          While we strive to provide accurate property information, we do not
          guarantee the accuracy, completeness, or reliability of listings.
          Property details are subject to change without notice.
        </p>

        <h2 className="subheading font-semibold text-[#2f5fa7] mt-6">
          5. Intellectual Property
        </h2>
        <p className="mt-2">
          All content on our website, including text, images, logos, and
          designs, is the property of DNS Real Estate and is protected by
          copyright laws. Unauthorized use of our content is prohibited.
        </p>

        <h2 className="subheading font-semibold text-[#2f5fa7] mt-6">
          6. Limitation of Liability
        </h2>
        <p className="mt-2">
          DNS Real Estate shall not be liable for any direct, indirect,
          incidental, or consequential damages arising from your use of our
          website or services.
        </p>

        <h2 className="subheading font-semibold text-[#2f5fa7] mt-6">
          7. Third-Party Links
        </h2>
        <p className="mt-2">
          Our website may contain links to third-party websites. We are not
          responsible for the content, policies, or practices of these external
          sites.
        </p>

        <h2 className="subheading font-semibold text-[#2f5fa7] mt-6">
          8. Termination
        </h2>
        <p className="mt-2">
          We reserve the right to suspend or terminate your access to our
          website and services if you violate these Terms and Conditions.
        </p>

        <h2 className="subheading font-semibold text-[#2f5fa7] mt-6">
          9. Governing Law
        </h2>
        <p className="mt-2">
          These Terms and Conditions are governed by the laws of the{" "}
          <strong>United Arab Emirates</strong>. Any disputes shall be subject
          to the exclusive jurisdiction of the Dubai courts.
        </p>

        <h2 className="subheading font-semibold text-[#2f5fa7] mt-6">
          10. Contact Us
        </h2>
        <p className="mt-2">
          For any questions or concerns regarding these Terms and Conditions,
          please contact us:
        </p>
        <ul className="list-none mt-2">
          <li>
            <strong>📧 Email:</strong>{" "}
            <a
              href="mailto:inquiry@dnsdxb.com"
              className="text-[#2f5fa7] underline"
            >
              inquiry@dnsdxb.com
            </a>
          </li>
          <li>
            <strong>📞 Phone:</strong> +971-527186972
          </li>
          <li>
            <strong>📍 Address:</strong> 2503-022, 25th Floor, IRIS Bay,
            Business Bay, Dubai, United Arab Emirates
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TermsAndConditions;
