import { useNavigate, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r min-h-screen px-4 py-6">
      <h2 className="text-xl font-bold mb-8 text-green-600">MediStore</h2>

      <nav className="space-y-2 text-sm">
        <SidebarItem
          label="Storage"
          onClick={() => navigate("/admin/storage")}
        />

        <SidebarItem
          label="Track Inventory"
          onClick={() => navigate("/admin/inventory")}
        />
      </nav>
    </aside>
  );
};

const SidebarItem = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className={`px-3 py-2 rounded-lg cursor-pointer ${
      active
        ? "bg-green-50 text-green-600 font-medium"
        : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    {label}
  </div>
);

export default AdminSidebar;
