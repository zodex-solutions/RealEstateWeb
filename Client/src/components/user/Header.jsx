import React, { useRef, useState } from "react";
import { FaChevronDown, FaFlag, FaSearch } from "react-icons/fa";
import Flags from "country-flag-icons/react/3x2";
import logo from "../../assets/flogo.png";
import { Menu, X } from "lucide-react";
import { AiOutlineSearch } from "react-icons/ai";
import { LuListFilter } from "react-icons/lu";
import smallLogo from "../../assets/smallLogo.png";
import { useLocation, useNavigate } from "react-router";
import { useCurrency } from "../common/currencyContext";
import NativeCurrencySelector from "../common/curencySelector";
import SellForm from "../../pages/user/LandingPage/sellForm";

const Header = ({ setSidebar, sidebar, setFilterBar, filterBar }) => {
  const MenuItems = [
    {
      id: "buy",
      label: "BUY",
      path: "/listing/BUY",
    },
    {
      id: "sell",
      label: "SELL",
      path: "/listing/SELL",
    },
    {
      id: "rent",
      label: "RENT",
      path: "/listing/RENT",
    },
    // {
    //   id: "offplan",
    //   label: "OFF-PLAN",
    //   path: "/off-Plan",
    // },
    // {
    //   id: "commercial",
    //   label: "COMMERCIAL",
    //   path: "/commercial",
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

  const location = useLocation();
  const { toCurrency, setToCurrency, currencyOptions } = useCurrency();
  const [isOpenSellModel, setIsOpenSellModel] = useState(false);

  const selectRef = useRef();

  const handleDivClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
      selectRef.current.click();
    }
  };

  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);

  const navigate = useNavigate();
  return (
    <div className="h- py-2.5 z-50 bg-white text-black w-full   lg:border-b-[2px] md:border-b-[2px] border-[#A9B9D6] fixed top-0 fle justify-between items-center pr-5">
      <div className="flex justify-between items-center overflow-hidden">
        <a href="/" className="lg:flex md:flex hidden ">
          <img src={logo} className="max-w-52 pl-5" />
        </a>
        <div className="pl-2 lg:hidden md:hidden flex">
          <a href="/">
            <img src={logo} className="h-10 max-w-40 pl-4" />
          </a>
        </div>

        <div className="">
          <div className="flex justify-between items-center space-x-3">
            <div className="xl:flex lg:flex hidden flex-row items-center xl:space-x-3 lg:space-x-3 ">
              {MenuItems.map((menuItem, index) => (
                <a
                  key={menuItem.id}
                  onClick={() => {
                    menuItem.id === "sell"
                      ? setIsOpenSellModel(true)
                      : navigate(menuItem.path);
                    goTop();
                  }}
                  className={`text-slate-700  flex cursor-pointer text-[15px] items-center gap- rounded-md px-2 py-2 text-muted-foreground hover:bg-muted hover:text-slate-700`}
                >
                  {menuItem.label}
                </a>
              ))}

              <div className="xl:flex lg:flex hidden justify-end  ">
                <NativeCurrencySelector />
              </div>
            </div>

            {sidebar ? (
              <X
                onClick={() => setSidebar(false)}
                size={40}
                color="#222"
                className="lg:h-12 md:h-12 h-10 xl:hidden lg:hidden lg:w-9 md:w-9 w-8 xl:absolute ml-4 rounded-md cursor-pointer"
              />
            ) : (
              <Menu
                onClick={() => setSidebar(true)}
                size={40}
                color="#222"
                className="lg:h-12 md:h-12 h-10 xl:hidden lg:hidden lg:w-9 md:w-9 w-8 xl:absolute ml-4 rounded-md cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default Header;
