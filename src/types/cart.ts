export interface CartItem {
  id: string;
  productId: string;
  productUnitId: string;
  productName: string;
  imageUrl: string;
  unitName: string;
  unitPrice: number;
  quantity: number;
  selected: boolean;
}

export interface CartResponse {
  items: CartItem[];
}
