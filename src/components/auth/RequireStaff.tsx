import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";

const staffRoles = [
  "ADMIN",
  "PHARMACIST",
  "ACCOUNTANT",
  "WAREHOUSE",
  "CUSTOMER_SERVICE",
];

const RequireStaff = ({ children }: { children: React.JSX.Element }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/customer/home" replace />;

  const isStaff = user.roles?.some(role =>
    staffRoles.includes(role)
  );

  if (!isStaff) {
    return <Navigate to="/customer/home" replace />;
  }

  return children;
};

export default RequireStaff;
