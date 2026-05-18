export interface CreateOrderItem {
  cartItemId: string;
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
  orderItemId: string;
  unitId: string;
  productName: string;
  unitName: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateOrderItem {
  cartItemId: string;
  productId: string;
  productUnitId: string;
  quantity: number;
}

export interface CreateOrderRequest {
  userId: string;
  items: CreateOrderItem[];

  shippingName?: string;
  shippingPhone?: string;
  shippingAddress?: string;
  deliveryMethodId?: string;
  paymentMethodId?: string;
  voucherCode?: string;
}

export interface OrderItem {
  productId: string;
  orderItemId: string;
  unitId: string;
  productName: string;
  unitName: string;
  quantity: number;
  unitPrice: number;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "delivered"
  | "completed"
  | "cancelled"
  | "canceled";

export interface Order {
  orderId: string;
  status: OrderStatus;
  totalAmount: number;

  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;

  deliveryMethodId: string;
  deliveryMethodName: string;
  shippingFee: number;

  createdAt?: string;

  items: OrderItem[];
}