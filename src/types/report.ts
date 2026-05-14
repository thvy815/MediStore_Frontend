export interface RevenueReport {
  period: string;
  revenue: number;
}

export interface ProductRevenue {
  productName: string;
  totalSold: number;
  revenue: number;
}

export interface BestSellingProduct {
  productName: string;
  quantitySold: number;
}

export interface InventoryReport {
  productName: string;
  remainingQuantity: number;
}

export interface LowStockProduct {
  productName: string;
  remainingQuantity: number;
}

export interface InventorySalesRatio {
  productName: string;
  ratio: number;
}