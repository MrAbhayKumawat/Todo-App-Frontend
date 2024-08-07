import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  if (!token) {
    return navigate("/login");
  }

  return children;
};

export default ProtectedRoute;
