import React, { use } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const Public = () => {
  let { user, isLoading } = useSelector((store) => store.auth);

  if (isLoading) return <h1>Loading...</h1>;

  if (user) return <Navigate to={"/home"} />;

  return <Outlet />;
};

export default Public;
