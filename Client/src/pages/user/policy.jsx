import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white text-black min-h-screen p-4 flex flex-col items-center">
      <div className="max-w-7xl w-full text-center">
        <h1 className="heading text-[#2f5fa7] mb-6">
          Privacy Policy - DNS Real Estate
        </h1>
        <p className="  leading-relaxed mb-6 md:px-20">
          At DNS Real Estate, we are committed to protecting your privacy and
          ensuring that your personal information is handled securely. This
          Privacy Policy outlines how we collect, use, disclose, and safeguard
          your information when you interact with our website (
          <a href="https://www.dnsdxb.com" className="text-[#2f5fa7] underline">
            www.dnsdxb.com
          </a>
          ) and our services.
        </p>
      </div>
      <div className="max-w-7xl w-full">
        <h2 className="subheading font-semibold text-[#2f5fa7] mt-6">
          1. Information We Collect
        </h2>
        <ul className="list-disc pl-6 mt-2">
          <li>
            <strong>Personal Information:</strong> Name, email address, phone
            number, and any other information you provide through forms or
            inquiries.
          </li>
          <li>
            <strong>Property Preferences:</strong> Details about your property
            interests, including location preferences and budget.
          </li>
          <li>
            <strong>Device and Usage Information:</strong> IP address, browser
            type, and browsing behavior on our website.
          </li>
        </ul>

        <h2 className="subheading font-semibold text-[#2f5fa7] mt-6">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc pl-6 mt-2">
          <li>
            To provide real estate services, including property buying, selling,
            renting, and property management.
          </li>
          <li>
            To communicate with you regarding inquiries, property updates, and
            promotional offers.
          </li>
          <li>To improve our website experience and customize our services.</li>
          <li>To comply with legal obligations and protect against fraud.</li>
        </ul>

        <h2 className="subheading font-semibold text-[#2f5fa7] mt-6">
          3. How We Share Your Information
        </h2>
        <ul className="list-disc pl-6 mt-2">
          <li>
            With authorized agents, brokers, and service providers who assist in
            delivering our services.
          </li>
          <li>With legal authorities when required by law.</li>
          <li>
            With third-party platforms for marketing and analytical purposes.
          </li>
        </ul>

        <h2 className="subheading font-semibold text-[#2f5fa7] mt-6">
          4. Data Security
        </h2>
        <p className="mt-2">
          We implement appropriate technical and organizational measures to
          safeguard your personal information from unauthorized access, use, or
          disclosure.
        </p>

        <h2 className="subheading font-semibold text-[#2f5fa7] mt-6">
          5. Your Rights
        </h2>
        <ul className="list-disc pl-6 mt-2">
          <li>
            You can request access, correction, or deletion of your personal
            data.
          </li>
          <li>You can opt-out of marketing communications at any time.</li>
        </ul>

        <h2 className="subheading font-semibold text-[#2f5fa7] mt-6">
          6. Cookies and Tracking Technologies
        </h2>
        <p className="mt-2">
          We may use cookies and similar technologies to enhance your browsing
          experience. You can manage your cookie preferences through your
          browser settings.
        </p>

        <h2 className="subheading font-semibold text-[#2f5fa7] mt-6">
          7. Third-Party Links
        </h2>
        <p className="mt-2">
          Our website may contain links to external websites. We are not
          responsible for the privacy practices of those websites.
        </p>

        <h2 className="subheading font-semibold text-[#2f5fa7] mt-6">
          8. Contact Us
        </h2>
        <p className="mt-2">
          For any questions regarding this Privacy Policy or your data, please
          contact us:
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

export default PrivacyPolicy;
