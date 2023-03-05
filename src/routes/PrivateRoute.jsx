import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { APP_ROUTES } from "./index";
import { useLoggedIn } from "../auth";
import { AuthContextProvider } from "../context/app";

const PrivateRoute = ({ children }) => {
  const isLogged = useLoggedIn();
  const location = useLocation();

  if (isLogged) {
    return <AuthContextProvider>{children}</AuthContextProvider>;
  }
  return <Navigate to={APP_ROUTES.root} state={{ from: location }} replace />;
};

export default PrivateRoute;
