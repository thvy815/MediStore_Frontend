export interface InventoryBatchResponse {
  id: string;

  productId: string;
  productName: string;

  supplierId: string;
  supplierName: string;

  lawCode?: string;
  lawTitle?: string;

  batchNumber: string;
  manufactureDate: string;
  expiryDate: string;

  quantityImported: number;
  quantityRemaining: number;
  smallestUnitName: string;
  importPrice: number;

  status: string;

  createdAt: string;
  updatedAt: string;
}
