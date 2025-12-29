import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./sidebar";
import Filter from "./filterBar";
import { Outlet } from "react-router";

const UserLayout = () => {
  const [sidebar, setSidebar] = useState(false);
  const [filterBar, setFilterBar] = useState(false);

  return (
    <div className="h-screen flex-1 flex min-h-screen w-full ">
      {/* <div className="h-screen flex-1 flex flex-col min-h-screen w-full"> */}
      <Header
        sidebar={sidebar}
        setSidebar={setSidebar}
        filterBar={filterBar}
        setFilterBar={setFilterBar}
      />
      <div className="z-40">
        <div
          onClick={() => setSidebar(false)}
          className={` ${
            sidebar ? "flex" : "hidden"
          }  fixed top-0 right-0 left-0 bottom-0   z-50 h-screen`}
        ></div>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      </div>

      <main className="absolute z-10 top-10 right-0 left-0 pt-[40px] overflow-hidden">
        <div className="h-full w-[100vw]">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default UserLayout;
