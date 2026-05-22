import { Search, ShoppingCart, ChevronDown, User, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";

const AppHeader = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [keyword, setKeyword] = useState("");
  const [openAuth, setOpenAuth] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = () => {
    if (!keyword.trim()) return;
    navigate(`/search?q=${encodeURIComponent(keyword)}`);
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      logout();
      setShowUserMenu(false);
    }
  };

  const isCustomer = user?.roles?.includes("CUSTOMER") || !user;

  return (
    <>
      <header className="bg-[#E8F5E9] shadow-md">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate(isCustomer ? "/customer/home" 
                                               : "/dashboard/medicines")}
          >
            <img src="/logo.png" alt="MediStore Logo" className="h-14 w-auto" />
          </div>

          {/* Search chỉ customer */}
          {isCustomer && (
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
          )}

          {/* Right actions */}
          <div className="flex items-center gap-4">

            {/* Cart chỉ customer */}
            {isCustomer && (
                <ShoppingCart
                    className="cursor-pointer text-green-900"
                    onClick={() => navigate("/customer/cart")}
                />
            )}

            {user ? (
              <div
                className="relative"
                onMouseEnter={() => setShowUserMenu(true)}
                onMouseLeave={() => setShowUserMenu(false)}
              >
                <div className="flex items-center gap-2 cursor-pointer hover:text-green-700">
                  <span className="text-green-900 font-medium">
                    {user.fullName}
                  </span>
                  <ChevronDown size={16} className="text-green-900" />
                </div>

                {showUserMenu && (
                  <div className="absolute right-0 top-full pt-2 w-52 z-50">
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      
                      {/* Profile */}
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          navigate("/customer/profile");
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                      >
                        <User size={16} className="text-gray-600" />
                        <span className="text-gray-700">My Profile</span>
                      </button>

                    {isCustomer && (
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          navigate("/customer/orders");
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                      >
                        <Package size={16} className="text-gray-600" />
                        <span className="text-gray-700">My Orders</span>
                      </button>
                    )}

                      <hr className="my-2 border-gray-200" />

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 transition-colors"
                      >
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setOpenAuth(true)}
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      {openAuth && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <AuthModal onClose={() => setOpenAuth(false)} />
        </div>
      )}
    </>
  );
};

export default AppHeader;