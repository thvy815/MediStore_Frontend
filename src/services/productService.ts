import { api } from "@/api/axios";
import type { ProductRequest } from "@/types/product";

export const productService = {
  // ADMIN
  getAllAdmin: () => api.get("/products/admin"),

  // ===== EXISTING (GIỮ NGUYÊN) =====
  getAll: () => api.get("/products"),

  search: (keyword: string) =>
    api.get(`/products/search?keyword=${keyword}`),

  create: (data: ProductRequest) =>
    api.post("/products", data),

  update: (id: string, data: ProductRequest) =>
    api.put(`/products/${id}`, data),

  updateActive: (id: string, isActive: boolean) =>
    api.patch(`/products/${id}/active`, { isActive }),

  delete: (id: string) =>
    api.delete(`/products/${id}`),

  // ===== ADD: CUSTOMER PRODUCT APIs =====

  /**
   * CUSTOMER
   * Lấy danh sách sản phẩm đang active
   * BE: GET /api/products/customer/active
   */
  getActiveProducts: () =>
    api.get("/products/customer/active"),

  /**
   * CUSTOMER
   * Lấy danh sách unit đang active của 1 product
   * BE: GET /api/products/{productId}/units
   */
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
