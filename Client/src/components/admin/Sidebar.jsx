import {
  BadgeCheck,
  Bike,
  ChartNoAxesCombined,
  ChevronLeftIcon,
  Contact,
  LayoutDashboard,
  LogOut,
  ScaleIcon,
  User,
  Users,
} from "lucide-react";
import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

import {
  FaTachometerAlt,
  FaImage,
  FaHeart,
  FaInfoCircle,
  FaCheckCircle,
  FaListAlt,
  FaBlog,
  FaQuestionCircle,
  FaQuoteLeft,
  FaBuilding,
  FaUserTie,
  FaCity,
  FaShapes,
  FaClipboardCheck,
  FaStream,
  FaBriefcase,
  FaUsers,
} from "react-icons/fa";

// Add Property ,
const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin",
    icon: <FaTachometerAlt />,
  },
  {
    id: "valuation",
    label: "Valuation",
    path: "/admin/valuation",
    icon: <ScaleIcon />,
  },
  {
    id: "interests",
    label: "Interests",
    path: "/admin/add-interest",
    icon: <FaHeart />,
  },

  {
    id: "blog-category",
    label: "Blog Category",
    path: "/admin/add-blog-category",
    icon: <FaListAlt />,
  },
  {
    id: "add-blog",
    label: "Blog",
    path: "/admin/add-blog",
    icon: <FaBlog />,
  },
  {
    id: "add-job",
    label: "Job",
    path: "/admin/add-job",
    icon: <FaBriefcase />,
  },
  {
    id: "add-team",
    label: "Team",
    path: "/admin/add-team-member",
    icon: <FaUsers />,
  },
  {
    id: "add-faqs",
    label: "Faqs",
    path: "/admin/add-faq",
    icon: <FaQuestionCircle />,
  },
  {
    id: "add-service",
    label: "Footer Services",
    path: "/admin/add-service",
    icon: <FaStream />,
  },
  {
    id: "add-services",
    label: "Services",
    path: "/admin/add-services",
    icon: <FaStream />,
  },
  {
    id: "testimonial",
    label: "Testimonial",
    path: "/admin/add-testimonial",
    icon: <FaQuoteLeft />,
  },
  {
    id: "property",
    label: "Property",
    path: "/admin/add-property",
    icon: <FaBuilding />,
  },
  {
    id: "add-consultant",
    label: "Consultant",
    path: "/admin/add-consultant",
    icon: <FaUserTie />,
  },
  {
    id: "add-developer",
    label: "Developer",
    path: "/admin/add-developer",
    icon: <FaCity />,
  },
  {
    id: "add-community",
    label: "Community",
    path: "/admin/add-community",
    icon: <FaCity />,
  },
  {
    id: "add-property-type",
    label: "Property Type",
    path: "/admin/add-property-type",
    icon: <FaShapes />,
  },
  {
    id: "add-property-status",
    label: "Property Status",
    path: "/admin/add-property-status",
    icon: <FaClipboardCheck />,
  },
];
const handleLogout = () => {
  localStorage.removeItem("isAuthenticated");
  navigate("/admin/login");
};

function MenuItems({ setSidebar, handleClose }) {
  const navigate = useNavigate();

  return (
    <nav className="flex flex-col  pt-10   h-full  border- border-gray">
      {adminSidebarMenuItems.map((menuItem) => (
        <a
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            handleClose();
          }}
          className="flex overflow-hidden hover:bg-[#2f5fa71d] hover:scale-[107%] transition-all duration-500 text-xl cursor-pointer gap-4 hover:!text-[#2f5fa7]  items-center px-5 py-3"
        >
          <span>{menuItem.icon}</span>
          <span>{menuItem.label}</span>
        </a>
      ))}
    </nav>
  );
}

const Sidebar = ({ setSidebar, sidebar }) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1024px)" });
  const islargeScreen = useMediaQuery({ query: "(max-width: 1023px)" });
  function handleClose() {
    {
      isSmallScreen
        ? setSidebar(false)
        : islargeScreen
        ? setSidebar(true)
        : null;
    }
  }
  useEffect(() => {
    {
      isSmallScreen
        ? setSidebar(false)
        : islargeScreen
        ? setSidebar(true)
        : null;
    }
  }, [isSmallScreen, islargeScreen]);

  const navigate = useNavigate();
  return (
    <div
      className={` h-full z-0 w-60 overflow-y-auto scrollbar-hide bg-[#fff] text-white  fixed duration-500 transition-all  
      ${sidebar ? "" : "-translate-x-60"}`}
    >
      <aside className="flex flex-col bg-transparent w-full scrollbar-hide overflow-y-scroll pt-4">
        <div className="flex border-[#d0d0d0] border-b justify-center  cursor-pointer gap-2 items-center lg:pb-[19px] pb-[9px] px-4">
          <div className="flex bg-[#2f5fa7] border-b border-gray-300  justify-center w-60 fixed items-center leading-3 line-clamp-1 py-[7px] top-0 z-30">
            {/* DNS */}
            {sidebar ? (
              <div
                onClick={() => setSidebar(false)}
                variant="outline"
                className="flex bg-white border h-8 justify-center rounded shadow w-9 absolute cursor-pointer items-center lg:hidden  left-3 top-[19px] "
              >
                <ChevronLeftIcon className="h-6 w-6" color="#222" />
              </div>
            ) : null}
            <img src={logo} alt="logo" className="h-14 z-0 " />
          </div>
        </div>

        <div className="mt-3 overflow-y-scroll scrollbar-hide  h-full pb-20  shadow-2x border-r border-gray-300">
          <MenuItems setSidebar={setSidebar} handleClose={handleClose} />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
