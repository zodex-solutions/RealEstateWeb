import React from "react";
import { Navigate } from "react-router-dom";

const CheckAuth = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default CheckAuth;
