import { Search, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  "Functional foods",
  "Cosmetic medicine",
  "Medicine",
  "Personal care",
  "Medical equipment",
];

export default function Navbar() {
  const navigate = useNavigate(); // ✅ thêm dòng này

  return (
    <header className="bg-[#e9f6ec] px-6 py-4">
      {/* Top row */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <h1
          className="text-2xl font-bold text-gray-800 cursor-pointer"
          onClick={() => navigate("/")}   // (optional) bấm logo về home
        >
          Medi<span className="text-green-600">Store</span>
        </h1>

        {/* Search */}
        <div className="flex-1 mx-8 relative">
          <input
            type="text"
            placeholder="Search medicine..."
            className="w-full rounded-full border px-5 py-2 pr-10 focus:outline-none"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* 🛒 CART ICON – CHỈ THÊM ONCLICK */}
          <ShoppingCart
            className="cursor-pointer"
            onClick={() => navigate("/cart")}
          />

          <button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm">
            Sign In
          </button>
        </div>
      </div>

      {/* Categories */}
      <nav className="mt-4 flex gap-6 text-sm text-gray-700">
        {categories.map((cat) => (
          <span
            key={cat}
            className="cursor-pointer hover:text-green-600"
          >
            {cat}
          </span>
        ))}
      </nav>
    </header>
  );
}
