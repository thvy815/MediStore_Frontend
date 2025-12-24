import { Outlet } from "react-router-dom";
import CustomerHeader from "@/components/layout/CustomerHeader";
import CustomerNavbar from "@/components/navigationBar/CustomerNavbar";
import Footer from "./Footer";

const CustomerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f6faf7]">      
      {/* Header */}
      <CustomerHeader />

      {/* Navbar */}
      <CustomerNavbar />

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CustomerLayout;
