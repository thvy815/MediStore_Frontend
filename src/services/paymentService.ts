import { api } from "@/api/axios";
import type { Payment } from "@/types/payment";

export const paymentService = {
  getAll: async (): Promise<Payment[]> => {
    const res = await api.get<Payment[]>("/payments/all-history");

    return res.data;
  },

  createPayment: async (orderId: string) => {
    const res = await api.post("/payments/create", {
      orderId,
    });

    return res.data;
  },

    createZaloPayPayment: async (orderId: string) => {

    const res = await api.post(
      `/payments/zalopay/create/${orderId}`
    );

    return res.data;
  },

  manualSuccess: async (txnRef: string) => {
  const res = await api.post(
    `/payments/manual-success/${txnRef}`
  );

  return res.data;
},
};