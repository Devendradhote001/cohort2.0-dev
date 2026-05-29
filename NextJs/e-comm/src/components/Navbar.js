import Link from "next/link";
import React from "react";
import { ModeToggle } from "./toggleTheme";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-8 py-4">
      <h1 className="text-xl font-bold">E-comm</h1>
      <div className="flex gap-4 font-semibold">
        <Link href="/layout/home">Home</Link>
        <Link href="/layout/products">Products</Link>
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
