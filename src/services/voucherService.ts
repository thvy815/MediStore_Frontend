import { api } from "@/api/axios";
import type {
  Voucher,
  VoucherHistory,
  VoucherRequest,
} from "@/types/voucher";

export const voucherService = {
  getAll: async (): Promise<Voucher[]> => {
    const res = await api.get<Voucher[]>("/vouchers");
    return res.data;
  },

  getById: async (id: string): Promise<Voucher> => {
    const res = await api.get<Voucher>(`/vouchers/${id}`);
    return res.data;
  },

  create: async (data: VoucherRequest): Promise<Voucher> => {
    const res = await api.post<Voucher>("/vouchers", data);
    return res.data;
  },

  update: async (
    id: string,
    data: VoucherRequest
  ): Promise<Voucher> => {
    const res = await api.put<Voucher>(`/vouchers/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/vouchers/${id}`);
  },

  getHistory: async (
    voucherId: string
  ): Promise<VoucherHistory[]> => {
    const res = await api.get<VoucherHistory[]>(
      `/vouchers/${voucherId}/history`
    );
    return res.data;
  },
};