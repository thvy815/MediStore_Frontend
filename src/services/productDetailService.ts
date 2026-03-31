import { api } from "@/api/axios";
import type { ProductDetail } from "@/types/productDetail";

export const productDetailService = {
  getProductDetail: (id: string) => api.get<ProductDetail>(`/products/${id}`),
};