import { Outlet } from "react-router-dom";
import Navbar from "@/components/navigationBar/CustomerNavBar"; // navbar customer
import Footer from "./Footer";

const CustomerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Customer Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default CustomerLayout;
