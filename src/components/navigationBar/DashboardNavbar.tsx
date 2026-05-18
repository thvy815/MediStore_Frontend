import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type MenuItem = {
  label: string;
  path: string;
};

const menuByRole: Record<string, MenuItem[]> = {
  ADMIN: [
    { label: "Medicine", path: "/dashboard/medicines" },
    { label: "Voucher", path: "/dashboard/voucher" },
    { label: "Chat", path: "/dashboard/chat-sessions" },
    { label: "Storage", path: "/dashboard/storage" },
    { label: "Inventory", path: "/dashboard/inventory" },
    { label: "Delivery Methods", path: "/dashboard/delivery-methods" },
    { label: "Payment Methods", path: "/dashboard/payment-methods" },
    { label: "Report", path: "/dashboard/report" },
    { label: "Customer", path: "/dashboard/customer" },
    { label: "Profile Setting", path: "/dashboard/profile" },
  ],

  PHARMACIST: [
    { label: "Medicine", path: "/dashboard/medicines" },
    { label: "Chat", path: "/dashboard/chat-sessions" },
  ],

  ACCOUNTANT: [
    { label: "Report", path: "/dashboard/report" },
    { label: "Customer", path: "/dashboard/customer" },
  ],

  WAREHOUSE: [
    { label: "Storage", path: "/dashboard/storage" },
    { label: "Inventory", path: "/dashboard/inventory" },
  ],

  CUSTOMER_SERVICE: [
    { label: "Chat", path: "/dashboard/chat-sessions" },
    { label: "Customer", path: "/dashboard/customer" },
  ],
};


const DashboardNavbar: React.FC = () => {
  const { user } = useAuth();

  /**
   * lấy role đầu tiên
   * ví dụ:
   * ["ADMIN"]
   */
  const role = user?.roles?.[0];

  /**
   * menu theo role
   */
  const menus = role ? menuByRole[role] || [] : [];

  return (
    <div className="w-full bg-white border-b shadow-sm">
      <div className="max-w-[1400px] mx-auto flex items-center justify-evenly h-[60px] px-6">
        
        {menus.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `text-base font-medium transition-colors ${
                isActive
                  ? "text-green-600 border-b-2 border-green-500 pb-1"
                  : "text-gray-700 hover:text-green-600"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}

      </div>
    </div>
  );
};

export default DashboardNavbar;
