import { NavLink } from "react-router-dom";

const menu = [
  { label: "Functional foods", path: "/category/functional-foods" },
  { label: "Cosmetic medicine", path: "/category/cosmetic-medicine" },
  { label: "Medicine", path: "/category/medicine" },
  { label: "Personal care", path: "/category/personal-care" },
  { label: "Medical equipment", path: "/category/medical-equipment" },
];

const CustomerNavbar = () => {
  return (
    <div className="w-full bg-white border-b shadow-sm">
      <div className="max-w-[1400px] mx-auto flex items-center justify-evenly h-[56px] px-6">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `text-sm font-medium ${
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

export default CustomerNavbar;
