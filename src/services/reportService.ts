import { api } from "@/api/axios";

export const reportService = {
  getRevenueByMonth: async () => {
    const res = await api.get("/reports/revenue/month");
    return res.data;
  },

  getRevenueByDay: async (startDate: string, endDate: string) => {
    const res = await api.get("/reports/revenue/day", {
      params: {
        startDate,
        endDate,
      },
    });
    return res.data;
  },

  getRevenueByProduct: async () => {
    const res = await api.get("/reports/revenue/product");
    return res.data;
  },

  getBestSellingProducts: async () => {
    const res = await api.get("/reports/best-selling");
    return res.data;
  },

  getInventoryReport: async () => {
    const res = await api.get("/reports/inventory");
    return res.data;
  },

  getLowStockProducts: async (threshold = 20) => {
    const res = await api.get("/reports/inventory/low-stock", {
      params: { threshold },
    });
    return res.data;
  },

  getInventorySalesRatio: async () => {
    const res = await api.get("/reports/inventory/sales-ratio");
    return res.data;
  },
};