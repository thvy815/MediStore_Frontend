import { api } from "@/api/axios";

const getDefaultDateRange = () => {
  const endDate = new Date();

  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 30);

  return {
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
  };
};

export const reportService = {
  // =========================
  // REVENUE
  // =========================

  getRevenueByMonth: async (
    startDate?: string,
    endDate?: string
  ) => {
    const defaultRange = getDefaultDateRange();

    const res = await api.get(
      "/reports/revenue/month",
      {
        params: {
          startDate:
            startDate ??
            defaultRange.startDate,

          endDate:
            endDate ??
            defaultRange.endDate,
        },
      }
    );

    return res.data;
  },

  getRevenueByDay: async (
    startDate: string,
    endDate: string
  ) => {
    const res = await api.get(
      "/reports/revenue/day",
      {
        params: {
          startDate,
          endDate,
        },
      }
    );

    return res.data;
  },

  getRevenueByProduct: async (
    startDate?: string,
    endDate?: string
  ) => {
    const defaultRange = getDefaultDateRange();

    const res = await api.get(
      "/reports/revenue/product",
      {
        params: {
          startDate:
            startDate ??
            defaultRange.startDate,

          endDate:
            endDate ??
            defaultRange.endDate,
        },
      }
    );

    return res.data;
  },

  // =========================
  // BEST SELLING
  // =========================

  getBestSellingProducts: async (
    startDate?: string,
    endDate?: string
  ) => {
    const defaultRange = getDefaultDateRange();

    const res = await api.get(
      "/reports/best-selling",
      {
        params: {
          startDate:
            startDate ??
            defaultRange.startDate,

          endDate:
            endDate ??
            defaultRange.endDate,
        },
      }
    );

    return res.data;
  },

  // =========================
  // INVENTORY
  // =========================

  getInventoryReport: async () => {
    const res = await api.get(
      "/reports/inventory"
    );

    return res.data;
  },

  getLowStockProducts: async (
    threshold = 20
  ) => {
    const res = await api.get(
      "/reports/inventory/low-stock",
      {
        params: {
          threshold,
        },
      }
    );

    return res.data;
  },

  getInventorySalesRatio: async () => {
    const res = await api.get(
      "/reports/inventory/sales-ratio"
    );

    return res.data;
  },
};