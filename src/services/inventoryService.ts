import { api } from "@/api/axios";
import type { InventoryBatchResponse } from "@/types/inventory";

export const inventoryService = {
  // Gần hết hạn
  getExpiringSoon: () =>
    api.get<InventoryBatchResponse[]>("/batches/expiring-soon"),

  // Sắp hết hàng
  getLowStock: () =>
    api.get<InventoryBatchResponse[]>("/batches/low-stock"),
  // Còn hàng trong kho
  getInStock: () =>
    api.get<InventoryBatchResponse[]>("/batches/in-stock"),
};
