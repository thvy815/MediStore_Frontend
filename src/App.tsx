import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import MedicinesPage from "@/pages/medicine/admin/MedicinesPage";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Redirect mặc định */}
      <Route path="/" element={<Navigate to="/admin/medicines" replace />} />
      
      {/* Route chung với Layout */}
      <Route element={<Layout />}>
        <Route path="/admin/medicines" element={<MedicinesPage />} />
      </Route>
    </Routes>
  );
};

export default App;
