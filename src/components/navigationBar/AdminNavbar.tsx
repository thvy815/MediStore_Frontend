import React from "react";
import { NavLink } from "react-router-dom";

const menu = [
  { label: "Medicine", path: "admin/medicines" },
  { label: "Voucher", path: "admin/voucher" },
  { label: "Storage", path: "admin/storage" },
  { label: "Report", path: "admin/report" },
  { label: "Access", path: "admin/access" },
  { label: "Customer", path: "admin/customer" },
  { label: "Profile Setting", path: "admin/profile" },
];

const TopNavbar: React.FC = () => {
  return (
    <div className="w-full bg-white border-b shadow-sm">
      <div className="max-w-[1400px] mx-auto flex items-center justify-evenly h-[60px] px-6">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `text-base font-medium ${
                isActive ? "text-green-600 border-b-2 border-green-500 pb-1" : "text-gray-700"
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

export default TopNavbar;
