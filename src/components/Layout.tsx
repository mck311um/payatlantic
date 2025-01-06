import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main>{children || <Outlet />}</main>
    </div>
  );
};

export default Layout;
