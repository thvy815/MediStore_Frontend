import { api } from "@/api/axios";
import { getUserId } from "@/utils/auth";
import type { Order } from "@/types/order";

export const orderService = {
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

  getUserOrders: (userId: string) => api.get<Order[]>(`/orders/user/${userId}`),

  getUserOrdersByDateRange: (
    userId: string,
    startDate: string,
    endDate: string
  ) => {
    return api.get<Order[]>(`/orders/user/${userId}/filter`, {
      params: {
        startDate,
        endDate,
      },
    });
  },

  getAll: () => {
    return api.get<Order[]>("/orders");
  },

  getAllByDateRange: (startDate: string, endDate: string) => {
    return api.get<Order[]>("/orders/filter", {
      params: {
        startDate,
        endDate,
      },
    });
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
