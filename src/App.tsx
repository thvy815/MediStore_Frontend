import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "@/components/layout/DashboardLayout";
import CustomerLayout from "@/components/layout/CustomerLayout";
import MedicinesPage from "@/pages/admin/medicine/MedicinesPage";
import StoragePage from "@/pages/admin/storage/StoragePage";
import InventoryPage from "@/pages/admin/storage/TrackInventoryPage";
import DeliveryMethodsPage from "@/pages/admin/delivery/DeliveryMethodsPage";
import PaymentMethodsPage from "@/pages/admin/payment/PaymentMethodsPage";
import CustomerHome from "@/pages/customer/HomePage";
import CartPage from "@/pages/customer/cart/CartPage";
import SearchPage from "./pages/customer/SearchPage";
import ProductDetailPage from "@/pages/customer/product/ProductDetailPage";
import CheckoutPage from "@/pages/customer/checkout/CheckoutPage";
import ShippingStep from "@/pages/customer/checkout/ShippingStep";
import DeliveryStep from "@/pages/customer/checkout/DeliveryStep";
import ReviewStep from "./pages/customer/checkout/ReviewStep";
import PaymentStep from "./pages/customer/checkout/PaymentStep";
import ProfilePage from "@/pages/customer/profile/ProfilePage";
import OrdersPage from "@/pages/customer/orders/OrdersPage";
import ChatSessionManagement from "./pages/admin/chat/ChatSessionManagement";

import { CheckoutProvider } from "@/contexts/CheckoutContext";
import RequireStaff from "./components/auth/RequireStaff";
import VoucherStep from "./pages/customer/checkout/VoucherStep";
import PaymentResult from "./pages/customer/PaymentResultPage";
import ReportDashboardPage from "./pages/accountant/report/ReportDashboardPage";
import SuperviseVoucherPage from "./pages/admin/voucher/SuperviseVoucherPage";
import VoucherPage from "./pages/admin/voucher/VoucherPage";
import TransactionHistoryPage from "./pages/admin/customer/TransactionHistoryPage";

const App = () => {
  return (
    <>
    <Routes>
      {/* Redirect mặc định */}
      <Route path="/" element={<Navigate to="/customer/home" replace />} />

      {/* ================= CUSTOMER ================= */}
      <Route
        element={
          <CheckoutProvider>
            <CustomerLayout />
          </CheckoutProvider>
        }
      >
        <Route path="/search" element={<SearchPage />} />
        <Route path="/customer/home" element={<CustomerHome />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/customer/cart" element={<CartPage />} />
        <Route path="/customer/profile" element={<ProfilePage />} />
        <Route path="/customer/orders" element={<OrdersPage />} />

        {/* Checkout pages */}
        <Route path="/checkout" 
          element={<CheckoutPage />}>
            <Route index element={<Navigate to="shipping" replace />} />
            <Route path="shipping" element={<ShippingStep />} />
            <Route path="delivery" element={<DeliveryStep />} />
            <Route path="review" element={<ReviewStep />} />
            <Route path="payment" element={<PaymentStep />} />
            <Route path="voucher" element={<VoucherStep />} />
            <Route path="payment-result" element={<PaymentResult />} />
        </Route>
      </Route>

      {/* ================= ADMIN ================= */}
      <Route
        path="/dashboard"
        element={
          <RequireStaff>
            <DashboardLayout />
          </RequireStaff>
        }
      >
        <Route path="medicines" element={<MedicinesPage />} />
        <Route path="storage" element={<StoragePage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="delivery-methods" element={<DeliveryMethodsPage />} />
        <Route path="payment-methods" element={<PaymentMethodsPage />} />
        <Route path="report" element={<ReportDashboardPage />} />
        <Route path="chat-sessions" element={<ChatSessionManagement />} />
        <Route path="voucher" element={<VoucherPage />}/>
        <Route path="voucher/supervise" element={<SuperviseVoucherPage />}/>
        <Route path="customer" element={<TransactionHistoryPage />}/>
      </Route>
    </Routes>
    </>
  );
};

export default App;
