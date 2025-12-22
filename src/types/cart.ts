export interface CartItem {
  id: string;
  productId: string;
  productUnitId: string;
  name: string;
  imageUrl: string;
  unit: string;
  unitPrice: number;
  quantity: number;
  isSelected: boolean;
}

export interface CartResponse {
  items: CartItem[];
}
