import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Logged in but not authorized → redirect to unauthorized
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Authorized → render children
  return children;
};

export default ProtectedRoute;
