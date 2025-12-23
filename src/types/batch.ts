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
  batchNumber: string;
  manufactureDate?: string;
  expiryDate: string;
  quantity: number;
  smallestUnitName: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}


export interface CreateBatchRequest {
  productId: string;
  supplierId: string;
  productUnitId: string;
  batchNumber: string;
  manufactureDate?: string;
  expiryDate: string;
  quantity: number;
}

export interface UpdateBatchRequest {
  batchNumber?: string;
  manufactureDate?: string;
  expiryDate?: string;
  quantity?: number;
  productUnitId?: string;
  supplierId?: string;
  status?: string;
}
