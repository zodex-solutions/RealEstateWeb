import { LogOut, Menu, Plus } from "lucide-react";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const AdminHeader = ({ setSidebar, sidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    "/admin": "Admin Dashboard",
    "/admin/add-banner": "Banner Images",
    "/admin/add-property": "Add Property",
    "/admin/all-properties": "All Properties",
    "/admin/add-property-status": "Add Property Status",
    "/admin/all-property-status": "All Property Status",
    "/admin/add-consultant": "Add Consultant",
    "/admin/all-consultant": "All Consultant",
    "/admin/add-developer": "Add Developer",
    "/admin/all-developers": "All Developer",
    "/admin/add-community": "Add Community",
    "/admin/all-communities": "All Community",
    "/admin/add-blog": "Add Blogs",
    "/admin/all-sell-inquiries": "Sell Inquiries",
    "/admin/all-job-inquiries": "All Job Inquiries",
    "/admin/brochureInquiries": "Brochure Inquiries",
    "/admin/add-team-member": "Add Team Member",
    "/admin/all-team-members": "All Team Members",

    "/admin/add-service": "Add Service",
    "/admin/add-job": "Add Job",
    "/admin/all-jobs": "All Jobs",
    "/admin/all-services": "All Services",

    "/admin/all-blogs": "All Blogs",
    "/admin/add-blog-category": "Add Blog Category",
    "/admin/all-blog-categories": "All Blog Categories",
    "/admin/add-testimonial": "Add Testimonial",
    "/admin/all-testimonials": "All Testimonial",
    "/admin/about-us": "About Us",
    "/admin/why-choose-us": "Why Choose Us",
    "/admin/add-interest": "Interest Options",
    "/admin/all-interests": "All Interest Options",
    "/admin/add-property-type": "Add Property Type",
    "/admin/all-property-types": "All Property Types",
    "/admin/add-faq": "Add FAQ`S",
    "/admin/all-faqs": "All FAQ`S",
    "/admin/all-queries": "All Queries",
    "/admin/add-contact-details": "Contact Details",
    "/admin/all-pre-book": "All Pre Booking",
    "/admin/add-services": "Add Services",
    "/admin/services": "All Services",
    "/admin/all-contact-queries": "Contact Queries",
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/admin/login");
  };

  // Function to get the correct route name
  const getRouteName = (pathname) => {
    if (routeMap[pathname]) return routeMap[pathname]; // Exact match

    // Handle dynamic routes
    for (const route in routeMap) {
      if (route.includes(":")) {
        const routeRegex = new RegExp(`^${route.replace(":id", "\\d+")}$`); // Match dynamic route
        if (routeRegex.test(pathname)) return routeMap[route];
      }
    }
    return "Edit";
  };

  const routeName = getRouteName(location.pathname);

  return (
    <header
      className={`flex z-50  items-center justify-between px-4 py-3 bg-[#fff bg-[#2f5fa7]  lg:h-[70px] h-[70px]   shadow-md`}
    >
      <div className="flex items-center gap-4">
        <Menu
          onClick={() => setSidebar(!sidebar)}
          size={34}
          color="#fff"
          className="h-9  w-10 border rounded-md border-white p-1 cursor-pointer"
        />
        <label
          className={`lg:text-2xl md:text-2xl text-md lg:pl-[190px] text-white font-bold`}
        >
          {routeName}
        </label>
      </div>
      <div className="flex gap-3 items-center">
        <button
          onClick={handleLogout}
          className=" w-full !p-0 !text- !font-semibold  !bg-  !rounded-[5px] hover:scale-[102%] transition"
        >
          <LogOut />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
