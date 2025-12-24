import { api } from "@/api/axios";
import { getUserId } from "@/utils/auth";

export const orderService = {
  /**
   * CREATE ORDER
   * POST /api/orders
   */
  createOrder: (items: {
    productId: string;
    productUnitId: string;
    quantity: number;
  }[]) => {
    const userId = getUserId();
    if (!userId) return Promise.reject("NOT_LOGIN");

    return api.post("/orders", {
      userId, // ✅ giống cartService
      items,
    });
  },
};
