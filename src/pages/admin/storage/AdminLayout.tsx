import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
};
export default AdminLayout;
