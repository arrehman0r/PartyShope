import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts";

const RequiresAuth = () => {
  return <Outlet />;
};

export default RequiresAuth;
