import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "@/components/layout/AdminLayout";
import CustomerLayout from "@/components/layout/CustomerLayout";
import ChatBubble from "./components/chat/ChatBubble";
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

import { CheckoutProvider } from "@/contexts/CheckoutContext";
import RequireAdmin from "./components/auth/RequireAdmin";
import VoucherStep from "./pages/customer/checkout/VoucherStep";

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
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/orders" element={<OrdersPage />} />

        {/* Checkout pages */}
        <Route path="/checkout" element={<CheckoutPage />}>
          <Route index element={<Navigate to="shipping" replace />} />
          <Route path="shipping" element={<ShippingStep />} />
          <Route path="delivery" element={<DeliveryStep />} />
          <Route path="review" element={<ReviewStep />} />
          <Route path="payment" element={<PaymentStep />} />
          <Route path="voucher" element={<VoucherStep />} />
        </Route>
      </Route>

      {/* ================= ADMIN ================= */}
      <Route
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route path="/admin/medicines" element={<MedicinesPage />} />
        <Route path="/admin/storage" element={<StoragePage />} />
        <Route path="/admin/inventory" element={<InventoryPage />} />
        <Route path="/admin/delivery-methods" element={<DeliveryMethodsPage />} />
        <Route path="/admin/payment-methods" element={<PaymentMethodsPage />} />
      </Route>
    </Routes>
    <ChatBubble />
    </>
  );
};

export default App;
