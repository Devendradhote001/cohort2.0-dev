import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex gap-6">
      <Link href={"/authlayout/login"}>Login</Link>
      <Link href={"/authlayout/login"}>Register</Link>
    </div>
  );
};

export default Navbar;
