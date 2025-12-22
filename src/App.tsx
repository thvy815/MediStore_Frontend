import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import CustomerLayout from "@/components/layout/CustomerLayout"
import MedicinesPage from "@/pages/admin/medicine/MedicinesPage";
import CustomerHome from "@/pages/customer/CustomerHome";
import CartPage from "./pages/customer/Cart";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Redirect mặc định */}
      <Route path="/" element={<Navigate to="/customer/home" replace />} />

      {/* CUSTOMER */}
      <Route element={<CustomerLayout />}>
        <Route path="/customer/home" element={<CustomerHome />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
      
      {/* Route chung với Layout */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/medicines" element={<MedicinesPage />} />
      </Route>
    </Routes>
  );
};

export default App;
