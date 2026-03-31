import { api } from "@/api/axios";
import type { DeliveryMethod, PaymentMethod } from "@/types/delivery";

export const deliveryService = {
  getDeliveryMethods: () => api.get<DeliveryMethod[]>("/delivery-methods"),

  getPaymentMethods: () => api.get<PaymentMethod[]>("/payment-methods"),
};