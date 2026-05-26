import React from "react";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <div>navbar</div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
