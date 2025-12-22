import { api } from "@/api/axios";
import type { CartItem } from "@/types/cart";

// 🔧 DEV USER ID (tạm thời – chờ login thật)
const DEV_USER_ID = "ee38ca3d-ec15-47bd-833d-5cc21d974df1";

export const cartService = {
  /**
   * GET giỏ hàng
   * GET /api/cart
   */
  getCart: () =>
    api.get<CartItem[]>("/cart", {
      params: {
        userId: DEV_USER_ID,
      },
    }),

  /**
   * ADD TO CART
   * POST /api/cart/add
   */
  addToCart: (data: {
    productId: string;
    productUnitId: string;
    quantity: number;
  }) =>
    api.post("/cart/add", data, {
      params: { userId: DEV_USER_ID }, // ✅ query param
    }),

  /**
   * UPDATE item trong cart
   * PUT /api/cart/item/{id}
   */
  updateItem: (
    id: string,
    data: {
      quantity?: number;
      productUnitId?: string;
      isSelected?: boolean;
    }
  ) =>
    api.put(`/cart/item/${id}`, {
      ...data,
      userId: DEV_USER_ID,
    }),

  /**
   * DELETE item
   * DELETE /api/cart/item/{id}
   */
  deleteItem: (id: string) =>
    api.delete(`/cart/item/${id}`, {
      data: {
        userId: DEV_USER_ID,
      },
    }),
};
