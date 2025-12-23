export interface ProductInfo {
  id: string;
  code: string;
  name: string;
}

export interface ProductUnitInfo {
  id: string;
  unitName: string;
}

export interface BatchResponse {
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


export interface CreateBatchRequest {
  productId: string;
  supplierId: string;
  productUnitId: string;

  batchNumber: string;

  manufactureDate?: string;
  expiryDate: string;

  quantity: number;        // số lượng theo unit nhập
  importPrice: number;     // GIÁ NHẬP theo unit nhập

  lawCode?: string;        // optional, dùng sau
}


export interface UpdateBatchRequest {
  batchNumber?: string;
  manufactureDate?: string;
  expiryDate?: string;
  lawCode?: string;
}
