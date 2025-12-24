import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";

const RequireAdmin = ({ children }: { children: React.JSX.Element }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/customer/home" replace />;
  if (user.roleName !== "Admin") return <Navigate to="/customer/home" replace />;

  return children;
};

export default RequireAdmin;
