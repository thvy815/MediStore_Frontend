import { Search, ShoppingCart, ChevronDown, User, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "@/components/auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";

const CustomerHeader = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { user, logout } = useAuth();

  const handleSearch = () => {
    if (!keyword.trim()) return;
    navigate(`/search?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <>
      <header className="bg-[#E8F5E9] shadow-md">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/customer/home")}
          >
            <img src="/logo.png" alt="MediStore Logo" className="h-14 w-auto" />
          </div>

          {/* Search */}
          <div className="flex-1 mx-8 relative">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search medicine..."
              className="w-full rounded-full border px-5 py-2 pr-10 focus:outline-none"
            />
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={handleSearch}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <ShoppingCart
              className="cursor-pointer"
              onClick={() => navigate("/cart")}
            />

            {user ? (
              <div className="relative"
                   onMouseEnter={() => setShowUserMenu(true)}
                   onMouseLeave={() => setShowUserMenu(false)}>
                <div
                  className="flex items-center gap-2 cursor-pointer hover:text-green-700">
                  <span className="text-green-900 font-medium">
                    {user.fullName}
                  </span>
                  <ChevronDown size={16} className="text-green-900" />
                </div>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div
                    className="absolute right-0 top-full pt-2 w-48"
                  >
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate("/profile");
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      <User size={16} className="text-gray-600" />
                      <span className="text-gray-700">Thông tin cá nhân</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate("/orders");
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      <Package size={16} className="text-gray-600" />
                      <span className="text-gray-700">Đơn hàng của tôi</span>
                    </button>
                    <hr className="my-2 border-gray-200" />
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        const confirmed = window.confirm("Are you sure you want to logout?");
                        if (confirmed) logout();
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 transition-colors"
                    >
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setOpenLogin(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700"
              >
                Login
              </button>
            )}
          </div>
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

export default CustomerHeader;
