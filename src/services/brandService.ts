import { api } from "@/api/axios";
import type { Brand, BrandCreateRequest } from "@/types/brand";

export const brandService = {
  getAll: () => api.get<Brand[]>("/brands"),

  getById: (id: string) => api.get<Brand>(`/brands/${id}`),

  create: (data: BrandCreateRequest) =>
    api.post<Brand>("/brands", data),

  update: (id: string, data: BrandCreateRequest) =>
    api.put<Brand>(`/brands/${id}`, data),

  delete: (id: string) =>
    api.delete(`/brands/${id}`),
};
