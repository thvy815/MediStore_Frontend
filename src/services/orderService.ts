import { api } from "@/api/axios";
import { getUserId } from "@/utils/auth";

export const orderService = {
  /**
   * CREATE ORDER
   * POST /api/orders
   */
  createOrder: (data: {
    items: {
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
};
