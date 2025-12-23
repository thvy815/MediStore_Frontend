import { Search, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const categories = [
  "Functional foods",
  "Cosmetic medicine",
  "Medicine",
  "Personal care",
  "Medical equipment",
];

export default function Navbar() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (!keyword.trim()) return;
    navigate(`/search?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <header className="bg-[#e9f6ec] px-6 py-4">
      {/* Top row */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div
  className="flex items-center cursor-pointer"
  onClick={() => navigate("/")}
>
  <img
    src="/logo.png"
    alt="MediStore Logo"
    className="h-10 w-auto"
  />
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
