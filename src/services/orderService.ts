import { api } from "@/api/axios";

// 🔧 DEV USER ID (tạm thời – chờ login thật)
const DEV_USER_ID = "ee38ca3d-ec15-47bd-833d-5cc21d974df1";

export const orderService = {
  /**
   * CREATE ORDER
   * POST /api/orders
   */
  createOrder: (items: {
    productId: string;
    productUnitId: string;
    quantity: number;
  }[]) =>
    api.post("/orders", {
      userId: DEV_USER_ID, // ✅ giống cartService
      items,
    }),
};
