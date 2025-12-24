import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "@/components/auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <>
      <header className="bg-[#E8F5E9] shadow-md">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <img src="/logo.png" alt="MediStore Logo" className="h-14" />

          {/* User */}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-green-900 font-medium">
                {user.fullName}
              </span>
              <button
                onClick={logout}
                className="bg-green-700 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setOpenLogin(true)}
              className="bg-green-700 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* Login Modal */}
      {openLogin && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <LoginModal onClose={() => setOpenLogin(false)}
            onOpenRegister={() => {
              setOpenLogin(false);
              setOpenRegister(true);
            }}
          />
        </div>
      )}

      {/* Register Modal */}
      {openRegister && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <RegisterModal onClose={() => setOpenRegister(false)} 
          onOpenLogin={() => {
            setOpenRegister(false);
            setOpenLogin(true);
          }} />
        </div>
      )}
    </>
  );
};

export default Header;
