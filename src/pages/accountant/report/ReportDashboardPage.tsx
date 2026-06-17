import { useEffect, useMemo, useState } from "react";

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
  const [revenue, setRevenue] =
    useState<RevenueReport[]>([]);

  const [bestSelling, setBestSelling] =
    useState<BestSellingProduct[]>([]);

  const [inventory, setInventory] =
    useState<InventoryReport[]>([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // DATE RANGE
  // =========================

  const [startDate, setStartDate] =
    useState(() => {
      const d = new Date();
      d.setDate(d.getDate() - 30);

      return d
        .toISOString()
        .split("T")[0];
    });

  const [endDate, setEndDate] =
    useState(() =>
      new Date()
        .toISOString()
        .split("T")[0]
    );

  // =========================
  // DATE LOGIC
  // =========================

  const totalDays = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diff =
      end.getTime() -
      start.getTime();

    return Math.ceil(
      diff /
        (1000 * 60 * 60 * 24)
    );
  }, [startDate, endDate]);

  const isDailyMode =
    totalDays <= 31;

  // =========================
  // LOAD REPORTS
  // =========================

  useEffect(() => {
    const loadReports =
      async () => {
        setLoading(true);

        try {
          const revenueRequest =
            isDailyMode
              ? reportService.getRevenueByDay(
                  startDate,
                  endDate
                )
              : reportService.getRevenueByMonth(
                  startDate,
                  endDate
                );

          const [
            revenueRes,
            bestSellingRes,
            inventoryRes,
          ] = await Promise.all([
            revenueRequest,

            reportService.getBestSellingProducts(
              startDate,
              endDate
            ),

            reportService.getInventoryReport(),
          ]);

          setRevenue(
            Array.isArray(
              revenueRes
            )
              ? revenueRes
              : []
          );

          setBestSelling(
            Array.isArray(
              bestSellingRes
            )
              ? bestSellingRes
              : []
          );

          setInventory(
            Array.isArray(
              inventoryRes
            )
              ? inventoryRes
              : []
          );
        } catch (err) {
          console.error(
            "Failed to load reports",
            err
          );

          setRevenue([]);
          setBestSelling([]);
          setInventory([]);
        } finally {
          setLoading(false);
        }
      };

    loadReports();
  }, [
    startDate,
    endDate,
    isDailyMode,
  ]);

  // =========================
  // CALCULATIONS
  // =========================

  const totalRevenue =
    revenue.reduce(
      (sum, item) =>
        sum +
        Number(
          item.revenue || 0
        ),
      0
    );

  const totalSold =
    bestSelling.reduce(
      (sum, item) =>
        sum +
        Number(
          item.quantitySold ||
            0
        ),
      0
    );

  const totalStock =
    inventory.reduce(
      (sum, item) =>
        sum +
        Number(
          item.remainingQuantity ||
            0
        ),
      0
    );

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-72 bg-gray-200 rounded" />

          <div className="grid md:grid-cols-3 gap-6">
            <div className="h-32 bg-gray-200 rounded-2xl" />
            <div className="h-32 bg-gray-200 rounded-2xl" />
            <div className="h-32 bg-gray-200 rounded-2xl" />
          </div>

          <div className="h-[400px] bg-gray-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Report Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Revenue,
            inventory and
            product analytics
          </p>
        </div>

        {/* DATE FILTER */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border flex gap-4">
          <div>
            <label className="text-sm text-slate-500 block mb-1">
              Start Date
            </label>

            <input
              type="date"
              value={
                startDate
              }
              onChange={(e) =>
                setStartDate(
                  e.target.value
                )
              }
              className="border rounded-xl px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm text-slate-500 block mb-1">
              End Date
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(e) =>
                setEndDate(
                  e.target.value
                )
              }
              className="border rounded-xl px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Revenue"
          value={`${totalRevenue.toLocaleString(
            "vi-VN"
          )}đ`}
        />

        <StatsCard
          title="Products Sold"
          value={totalSold.toString()}
        />

        <StatsCard
          title="Inventory"
          value={totalStock.toString()}
        />
      </div>

      {/* REVENUE CARD */}
      <div className="bg-white rounded-3xl shadow-sm border p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-800">
              Revenue Trend
            </h2>

            <p className="text-slate-500 text-sm mt-1">
              {isDailyMode
                ? "Daily Revenue"
                : "Monthly Revenue"}{" "}
              • {startDate} →{" "}
              {endDate}
            </p>
          </div>
        </div>

        <RevenueChart
          data={revenue}
        />
      </div>

      {/* TABLES */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl shadow-sm border p-4">
          <BestSellingTable
            products={
              bestSelling
            }
          />
        </div>

        <div className="bg-white rounded-3xl shadow-sm border p-4">
          <InventoryTable
            products={
              inventory
            }
          />
        </div>
      </div>
    </div>
  );
}