import axios from "axios";

const API_URL = "http://localhost:8080/api/reports";

export const reportService = {
  getRevenueByMonth: async () => {
    return axios.get(`${API_URL}/revenue/month`);
  },

  getRevenueByDay: async (startDate: string, endDate: string) => {
    return axios.get(`${API_URL}/revenue/day`, {
      params: {
        startDate,
        endDate,
      },
    });
  },

  getRevenueByProduct: async () => {
    return axios.get(`${API_URL}/revenue/product`);
  },

  getBestSellingProducts: async () => {
    return axios.get(`${API_URL}/best-selling`);
  },

  getInventoryReport: async () => {
    return axios.get(`${API_URL}/inventory`);
  },

  getLowStockProducts: async (threshold = 20) => {
    return axios.get(`${API_URL}/inventory/low-stock`, {
      params: { threshold },
    });
  },

  getInventorySalesRatio: async () => {
    return axios.get(`${API_URL}/inventory/sales-ratio`);
  },
};