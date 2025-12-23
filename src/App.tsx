import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import MedicinesPage from "@/pages/admin/medicine/MedicinesPage";
import StoragePage from "@/pages/admin/storage/StoragePage";
import InventoryPage from "@/pages/admin/storage/TrackInventoryPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/medicines" replace />} />

      <Route element={<Layout />}>
        <Route path="/admin/medicines" element={<MedicinesPage />} />
        <Route path="/admin/storage" element={<StoragePage />} />
        <Route path="/admin/inventory" element={<InventoryPage />} />
      </Route>
    </Routes>
  );
};

export default App;
