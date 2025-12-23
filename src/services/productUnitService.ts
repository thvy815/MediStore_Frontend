import { api } from "@/api/axios";
import type { ProductUnitResponse } from "@/types/productUnit";

export const productUnitService = {
  getByProduct: (productId: string) =>
    api.get<ProductUnitResponse[]>(
      `/admin/products/${productId}/units`
    ),
};
