import { api } from "@/api/axios";
import { getUserId } from "@/utils/auth";
import type { Order } from "@/types/order";

export const orderService = {
  /**
   * CREATE ORDER
   * POST /api/orders
   */
  createOrder: (data: {
    items: {
      cartItemId: string;
      productId: string;
      productUnitId: string;
      quantity: number;
    }[];
    shippingName: string;
    shippingPhone: string;
    shippingAddress: string;
    deliveryMethodId: string;
    paymentMethodId: string;
  }) => {
    const userId = getUserId();
    if (!userId) return Promise.reject("NOT_LOGIN");

    return api.post("/orders", {
      userId,
      ...data,
    });
  },

  /**
   * GET USER ORDERS
   * GET /api/orders/user/{userId}
   */
  getUserOrders: (userId: string) => api.get<Order[]>(`/orders/user/${userId}`),

  getAll: () => {
    return api.get("/orders");
  },

  markDelivered: (orderId: string) => {
    return api.put(`/orders/${orderId}/delivered`);
  },

  completeOrder: (orderId: string, userId: string) => {
    return api.put(`/orders/${orderId}/complete`, null, {
      params: { userId },
    });
  },

  cancelOrder: (orderId: string, userId: string) => {
    return api.put(`/orders/${orderId}/cancel`, null, {
      params: { userId },
    });
  },
};
