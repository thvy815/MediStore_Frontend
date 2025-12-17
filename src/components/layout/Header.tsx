import React from "react";

interface HeaderProps {
  user?: { name: string };
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-[#E8F5E9] shadow-md">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
            <img
                src="/logo.png"
                alt="MediStore Logo"
                className="h-14 w-auto"
            />
        </div>

        {/* User / Login */}
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-green-900 font-medium">{user.name}</span>
              <button
                onClick={onLogout}
                className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition">
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
