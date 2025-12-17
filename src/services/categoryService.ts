import { api } from "@/api/axios";
import type { Category, CategoryCreateRequest } from "@/types/category";

export const categoryService = {
  getAll: () => api.get<Category[]>("/categories"),

  getById: (id: string) => api.get<Category>(`/categories/${id}`),

  create: (data: CategoryCreateRequest) =>
    api.post<Category>("/categories", data),

  update: (id: string, data: CategoryCreateRequest) =>
    api.put<Category>(`/categories/${id}`, data),

  delete: (id: string) =>
    api.delete(`/categories/${id}`),
};
