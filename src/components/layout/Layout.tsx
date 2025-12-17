import React, { useState } from "react";
import { Outlet } from "react-router-dom"; // thêm Outlet
import Header from "./Header";
import Footer from "./Footer";
import TopNavbar from "../navigationBar/AdminNavbar";

// Không cần interface LayoutProps nữa, vì Outlet sẽ render children
const Layout: React.FC = () => {
  const [user, setUser] = useState<{ name: string } | undefined>(undefined);

  const handleLogin = () => {
    setUser({ name: "Nguyen Van A" }); // demo login
  };

  const handleLogout = () => setUser(undefined);

  return (
    <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header user={user} onLogout={handleLogout} />

        {/* Navbar */}
        <TopNavbar />

        {/* Main content area */}
        <main className="flex-1 p-6 bg-gray-50">
            <Outlet /> {/* route con sẽ render ở đây */}
        </main>

        {/* Footer */}
        <Footer />
    </div>
  );
};

export default Layout;
