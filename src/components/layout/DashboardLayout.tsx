import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./AdminHeader";
import Footer from "./Footer";
import DashboardNavbar from "../navigationBar/DashboardNavbar";

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Header tự lấy auth */}
      <Header />

      {/* Navbar */}
      <DashboardNavbar />

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
