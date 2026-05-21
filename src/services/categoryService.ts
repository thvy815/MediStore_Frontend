import { api } from "@/api/axios";
import type { Category, CategoryCreateRequest } from "@/types/category";

export const categoryService = {
  // ===== CUSTOMER / PUBLIC =====
  getAll: () => api.get<Category[]>("/customer/categories"),

  getById: (id: string) => api.get<Category>(`/customer/categories/${id}`),

  // ===== ADMIN =====
  create: (data: CategoryCreateRequest) =>
    api.post<Category>("/admin/categories", data),

  update: (id: string, data: CategoryCreateRequest) =>
    api.put<Category>(`/admin/categories/${id}`, data),

  delete: (id: string) =>
    api.delete(`/admin/categories/${id}`),
};
