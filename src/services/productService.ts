import { api } from "@/api/axios";
import type { ProductRequest } from "@/types/product";

export const productService = {
  getAll: () => api.get("/products"),

  search: (keyword: string) =>
    api.get(`/products/search?keyword=${keyword}`),

  create: (data: ProductRequest) =>
    api.post("/products", data),

  update: (id: string, data: ProductRequest) =>
    api.put(`/products/${id}`, data),

  delete: (id: string) =>
    api.delete(`/products/${id}`),
};
