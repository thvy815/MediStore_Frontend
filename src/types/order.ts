export interface CreateOrderItem {
  productId: string;
  productUnitId: string;
  quantity: number;
}

export interface CreateOrderRequest {
  userId: string;
  items: CreateOrderItem[];
}

export interface OrderItem {
  productId: string;
  unitId: string;
  productName: string;
  unitName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  orderId: string;
  status: string;
  totalAmount: number;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  deliveryMethodId: string;
  deliveryMethodName: string;
  shippingFee: number;
  items: OrderItem[];
}
