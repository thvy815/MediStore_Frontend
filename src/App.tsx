import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import MedicinesPage from "@/pages/admin/medicine/MedicinesPage";
import StoragePage from "./pages/admin/storage/StoragePage";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Redirect mặc định */}
      <Route path="/" element={<Navigate to="/admin/medicines" replace />} />
      
      {/* Route chung với Layout */}
      <Route element={<Layout />}>
        <Route path="/admin/medicines" element={<MedicinesPage />} />
        <Route path="/admin/storage" element={<StoragePage />} />
      </Route>
    </Routes>
  );
};

export default App;
