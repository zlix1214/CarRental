import React from "react";
import NavbarOwner from "../../components/owner/NavbarOwner";
import SideBar from "../../components/owner/SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className=" border-b border-white/20">
      <div className="flex">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
