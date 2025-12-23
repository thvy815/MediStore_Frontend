import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";

import AdminLayout from "../storage/AdminLayout";
import InventoryStats from "@/components/ui/InventoryStats";
import InventoryTable from "@/components/Inventory/InventoryTable";
import { inventoryService } from "@/services/inventoryService";
import type { InventoryBatchResponse } from "@/types/inventory";

const InventoryPage: React.FC = () => {
  const [active, setActive] = useState<"IN_STOCK" | "EXPIRING" | "LOW">("EXPIRING");
  const [inStock, setInStock] = useState<InventoryBatchResponse[]>([]);
  const [expiring, setExpiring] = useState<InventoryBatchResponse[]>([]);
  const [lowStock, setLowStock] = useState<InventoryBatchResponse[]>([]);

  const fetchData = async () => {
    try {
      const [instock, exp, low] = await Promise.all([
        inventoryService.getInStock(),
        inventoryService.getExpiringSoon(),
        inventoryService.getLowStock(),
      ]);
      setInStock(instock.data);
      setExpiring(exp.data);
      setLowStock(low.data);

    } catch (err) {
      console.error("Fetch inventory error", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data =
    active === "IN_STOCK"
      ? inStock
      : active === "EXPIRING"
      ? expiring
      : lowStock;

  return (
    <AdminLayout>
      <div className="w-full bg-gray-50 min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6 py-6">

          {/* HEADER */}
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Track Inventory</h2>
              <p className="text-gray-500">
                Monitor inventory imports, exports, and alerts
              </p>
            </div>

            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {lowStock.length + expiring.length}
              </span>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-6">
            <InventoryStats
              active={active}
              inStock={inStock.length}
              expiring={expiring.length}
              lowStock={lowStock.length}
              onChange={setActive}
            />
          </div>

          {/* TABLE */}
          <div className="mt-6 bg-white rounded-xl shadow-sm">
            <InventoryTable data={data} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default InventoryPage;
