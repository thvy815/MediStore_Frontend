export interface InventoryBatchResponse {
  id: string;
  batchNumber: string;
  productName: string;
  supplierName: string;
  unitType: string;
  quantity: number;
  expiryDate: string; // yyyy-MM-dd
}