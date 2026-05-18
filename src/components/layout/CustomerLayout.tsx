import { Outlet } from "react-router-dom";
import AppHeader from "@/components/layout/AppHeader";
import Footer from "./Footer";
import ChatBubble from "@/components/chat/ChatBubble";

const CustomerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f6faf7]">
      {/* Header */}
      <AppHeader />

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Chat bubble (chỉ customer mới có) */}
      <ChatBubble />
    </div>
  );
};

export default CustomerLayout;