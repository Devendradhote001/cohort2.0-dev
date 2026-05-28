import Link from "next/link";
import React from "react";

const MainNavs = () => {
  return (
    <div className="flex gap-5">
      <Link href={"/mainlayout/home"}>Home</Link>
      <Link href={"/mainlayout/about"}>About</Link>
      <Link href={"/mainlayout/contact"}>Contact</Link>
      <Link href={"/mainlayout/products"}>Products</Link>
    </div>
  );
};

export default MainNavs;
