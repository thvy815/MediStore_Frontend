export interface DeliveryMethod {
  id: string;
  name: string;
  description: string;
  baseFee: number;
  estimatedDays: number;
  isActive: boolean;
}

export interface PaymentMethod {
  id: string;
  code: string;
  name: string;
  isActive: boolean;
}