import { api } from "@/api/axios";
import type { Payment } from "@/types/payment";

export const paymentService = {
  getAll: async (): Promise<Payment[]> => {
    const res = await api.get<Payment[]>("/payments/all-history");
    return res.data;
  },
};