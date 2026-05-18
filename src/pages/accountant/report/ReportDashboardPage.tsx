import { useEffect, useState } from "react";

import { reportService } from "@/services/reportService";

import type {
  RevenueReport,
  BestSellingProduct,
  InventoryReport,
} from "@/types/report";

import RevenueChart from "@/components/report/RevenueChart";
import BestSellingTable from "@/components/report/BestSellingTable";
import InventoryTable from "@/components/report/InventoryTable";
import StatsCard from "@/components/report/StatsCard";

export default function ReportDashboardPage() {
  const [revenue, setRevenue] = useState<RevenueReport[]>([]);
  const [bestSelling, setBestSelling] = useState<BestSellingProduct[]>([]);
  const [inventory, setInventory] = useState<InventoryReport[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const [revenueRes, bestSellingRes, inventoryRes] = await Promise.all([
          reportService.getRevenueByMonth(),
          reportService.getBestSellingProducts(),
          reportService.getInventoryReport(),
        ]);

        setRevenue(Array.isArray(revenueRes) ? revenueRes : []);
        setBestSelling(Array.isArray(bestSellingRes) ? bestSellingRes : []);
        setInventory(Array.isArray(inventoryRes) ? inventoryRes : []);
      } catch (err) {
        console.error("Failed to load reports", err);
        setRevenue([]);
        setBestSelling([]);
        setInventory([]);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  if (loading) {
    return <div className="p-6 text-lg font-semibold">Loading reports...</div>;
  }

  const totalRevenue = revenue.reduce(
    (sum, item) => sum + Number(item.revenue || 0),
    0
  );

  const totalSold = bestSelling.reduce(
    (sum, item) => sum + Number(item.quantitySold || 0),
    0
  );

  const totalStock = inventory.reduce(
    (sum, item) => sum + Number(item.remainingQuantity || 0),
    0
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Report Dashboard</h1>

        <p className="text-gray-500 mt-2">
          Revenue, inventory and product analytics
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Revenue"
          value={`${totalRevenue.toLocaleString("vi-VN")}đ`}
        />

        <StatsCard title="Products Sold" value={totalSold.toString()} />

        <StatsCard title="Inventory Stock" value={totalStock.toString()} />
      </div>

      <div className="mb-8">
        <RevenueChart data={revenue} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <BestSellingTable products={bestSelling} />

        <InventoryTable products={inventory} />
      </div>
    </div>
  );
}