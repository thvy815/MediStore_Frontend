export interface CreateOrderItem {
  productId: string;
  productUnitId: string;
  quantity: number;
}

export interface CreateOrderRequest {
  userId: string;
  items: CreateOrderItem[];
}
