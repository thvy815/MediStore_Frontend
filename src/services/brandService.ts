import { api } from "@/api/axios";
import type { Brand, BrandCreateRequest } from "@/types/brand";

export const brandService = {
  // ===== CUSTOMER / PUBLIC =====
  getAll: () => api.get<Brand[]>("/customer/brands"),

  getById: (id: string) => api.get<Brand>(`/customer/brands/${id}`),

  // ===== ADMIN =====
  create: (data: BrandCreateRequest) =>
    api.post<Brand>("/admin/brands", data),

  update: (id: string, data: BrandCreateRequest) =>
    api.put<Brand>(`/admin/brands/${id}`, data),

  delete: (id: string) =>
    api.delete(`/admin/brands/${id}`),
};
