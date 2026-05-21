import { api } from "@/api/axios";
import type { ProductRequest } from "@/types/product";

export const productService = {
  // ===== ADMIN =====
  getAllAdmin: () => api.get("/admin/products"),

  create: (data: ProductRequest) =>
    api.post("/admin/products", data),

  update: (id: string, data: ProductRequest) =>
    api.put(`/admin/products/${id}`, data),

  updateActive: (id: string, isActive: boolean) =>
    api.patch(`/admin/products/${id}/active`, { isActive }),

  delete: (id: string) =>
    api.delete(`/admin/products/${id}`),

  // ===== CUSTOMER =====
  searchMedicine: (keyword: string) =>
    api.get(`/customer/products/search?keyword=${keyword}`),

  getActiveProducts: () =>
    api.get("/customer/products/active"),

  // Lấy danh sách unit đang active của 1 product
  getActiveUnitsByProduct: (productId: string) =>
    api.get(`/products/${productId}/units`),

  // ===== ADD: ADMIN / KHO PRODUCT UNIT APIs =====

  /**
   * ADMIN
   * Lấy toàn bộ unit của 1 product
   * BE: GET /api/admin/products/{productId}/units
   */
  getAllUnitsByProduct: (productId: string) =>
    api.get(`/admin/products/${productId}/units`),
};
