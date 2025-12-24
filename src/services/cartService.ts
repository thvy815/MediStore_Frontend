import { api } from "@/api/axios";
import type { CartItem } from "@/types/cart";
import { getUserId } from "@/utils/auth";

export const cartService = {
  /**
   * GET giỏ hàng
   * GET /api/cart
   */
  getCart: () => {
    const userId = getUserId();
    if (!userId) return Promise.reject("NOT_LOGIN");

    return api.get<CartItem[]>("/cart", {
      params: { userId },
    });
  },

  /**
   * ADD TO CART
   * POST /api/cart/add
   */
  addToCart: (data: {
    productId: string;
    productUnitId: string;
    quantity: number;
  }) => {
    const userId = getUserId();
    if (!userId) return Promise.reject("NOT_LOGIN");

    return api.post("/cart/add", data, {
      params: { userId }, 
    });
  },

  /**
   * UPDATE item trong cart
   * PUT /api/cart/item/{id}
   */
  updateItem: (
    id: string,
    data: {
      quantity?: number;
      productUnitId?: string;
      selected?: boolean;
    }
  ) => {
    const userId = getUserId();
    if (!userId) return Promise.reject("NOT_LOGIN");

    return api.put(`/cart/item/${id}`, {
      ...data,
      userId,
    });
  },
    
  /**
   * DELETE item
   * DELETE /api/cart/item/{id}
   */
  deleteItem: (id: string) => {
    const userId = getUserId();
    if (!userId) return Promise.reject("NOT_LOGIN");

    return api.delete(`/cart/item/${id}`, {
      data: { userId },
    });
  },
};
