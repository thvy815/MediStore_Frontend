// src/types/storage.ts

export interface StorageResponse {
  id: string;
  productCode: string;
  productName: string;
  category: string;
  quantity: number;
  unitType: string;
  manufactureDate: string;
  expiryDate: string;
  supplier: string;
  description: string;
  status: "IN_STOCK" | "LOW_STOCK" | "EXPIRED";
}
