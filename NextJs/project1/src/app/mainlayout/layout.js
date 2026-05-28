import Navbar from "@/components/AuthNav";
import MainNavs from "@/components/MainNavs";
import React from "react";

const layout = ({ children }) => {
  return (
    <html lang="en" className={` h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <MainNavs />
        {children}
      </body>
    </html>
  );
};

export default layout;
