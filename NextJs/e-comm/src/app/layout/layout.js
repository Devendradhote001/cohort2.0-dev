import Navbar from "@/components/Navbar";
import React from "react";

const layout = ({ children }) => {
  return (
    <html suppressHydrationWarning lang="en" className={`h-full antialiased`}>
      <body className="h-screen gap-5 flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default layout;
