import axios from "axios";
import type {
  Voucher,
  VoucherHistory,
  VoucherRequest,
} from "@/types/voucher";

const API = "http://localhost:8080/api/vouchers";

export const voucherService = {
  getAll: () => axios.get<Voucher[]>(API),

  getById: (id: string) => axios.get<Voucher>(`${API}/${id}`),

  create: (data: VoucherRequest) =>
    axios.post<Voucher>(API, data),

  update: (id: string, data: VoucherRequest) =>
    axios.put<Voucher>(`${API}/${id}`, data),

  delete: (id: string) => axios.delete(`${API}/${id}`),

  getHistory: (voucherId: string) =>
    axios.get<VoucherHistory[]>(`${API}/${voucherId}/history`),
};