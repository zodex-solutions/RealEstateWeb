import {
  BadgeCheck,
  Bike,
  ChartNoAxesCombined,
  ChartNoAxesCombinedIcon,
  ChevronLeftCircleIcon,
  ChevronLeftIcon,
  Contact,
  LayoutDashboard,
  User,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import NativeCurrencySelector from "../common/curencySelector";
import SellForm from "../../pages/user/LandingPage/sellForm";

// Add Property ,
const adminSidebarMenuItems = [
  {
    id: "home",
    label: "HOME",
    path: "/",
    // icon: <LayoutDashboard className="text-slate-700" />,
  },
  {
    id: "buy",
    label: "BUY",
    path: "/listing/BUY",
    // icon: <LayoutDashboard className="text-slate-700" />,
  },
  {
    id: "rent",
    label: "RENT",
    path: "/listing/RENT",
    // icon: <BadgeCheck className="text-slate-700" />,
  },
  // {
  //   id: "sell",
  //   label: "SELL",
  //   path: "/listing/SELL",
  // },
  // {
  //   id: "offplan",
  //   label: "OFF-PLAN",
  //   path: "/off-Plan",
  // },
  // {
  //   id: "commercial",
  //   label: "COMMERCIAL",
  //   path: "/commercial",
  //   // icon: <ReviewsOutlined className="text-slate-700" />,
  // },
  // {
  //   id: "communities",
  //   label: "COMMUNITIES",
  //   path: "/communities",
  // },
  {
    id: "careers",
    label: "CAREERS",
    path: "/careers",
  },
  {
    id: "blogs",
    label: "BLOGS",
    path: "/blogs",
  },
  {
    id: "developers",
    label: "DEVELOPERS",
    path: "/developers",
  },
  {
    id: "contact",
    label: "CONTACT",
    path: "/contact-us",
  },
  {
    id: "about",
    label: "ABOUT",
    path: "/about",
  },
];

function MenuItems({ setSidebar, handleClose }) {
  const navigate = useNavigate();
  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const [isOpenSellModel, setIsOpenSellModel] = useState(false);

  return (
    <nav className="mt-4 flex-col flex gap-1 ">
      {adminSidebarMenuItems.map((menuItem, index) => (
        <a
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            // index === 3 ? setIsOpenSellModel(true) : navigate(menuItem.path);
            handleClose();
            goTop();
          }}
          className="text-slate-700  flex cursor-pointer text-[16px] items-center gap-4 rounded-md px-3 py-2 text-muted-foregroun hover:bg-muted hover:text-slate-700"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </a>
      ))}

      {isOpenSellModel && (
        <div className="fixed inset-0  !z-40 flex  justify-center items-center ">
          <div className="flex absolute top-[20px] right-0 left-0 bottom-0 gap-2 !z-50">
            <SellForm setIsOpenSellModel={setIsOpenSellModel} />
            <div
              className="absolute !z-50 bg-[rgba(255,255,255,0.7)] top-14 right-2  cursor-pointer hover:scale-115 transition-all duration-300   !text-gray-700 rounded-md !hover:bg-gray-400"
              onClick={() => setIsOpenSellModel(false)}
            >
              <X />
            </div>
          </div>
        </div>
      )}
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
        ? setSidebar(false)
        : null;
    }
  }, [isSmallScreen, islargeScreen]);

  const navigate = useNavigate();
  return (
    <div
      className={`h-full w-60 z-50 bg-[rgb(255,255,255)] fixed duration-500 transition-all 
      ${sidebar ? "translate-x-0 shadow-2xl " : "translate-x-full "}`}
      style={{ right: 0 }}
    >
      {sidebar ? (
        <div
          onClick={() => setSidebar(false)}
          variant="outline"
          className="lg:hidden cursor-pointer flex h-8 w-9 absolute  items-center justify-center rounded  top-3 -right-6 bg-white shadow border"
        >
          <ChevronLeftCircleIcon className="h-6 w-6 " color="#222" />
        </div>
      ) : null}

      <aside className=" w-full flex-col bg-transparent pt-20  flex ">
        <div className="px-4 md:mt-2 -mt-3">
          <div className="flex justify-start ">
            <NativeCurrencySelector />
          </div>
          <MenuItems setSidebar={setSidebar} handleClose={handleClose} />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
