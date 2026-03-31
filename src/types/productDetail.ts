export interface ProductDetail {
  id: string;
  code: string;
  name: string;
  brandName: string;
  categoryName: string;
  description: string;
  ingredients: string;
  imageUrl: string;
  prescriptionRequired: boolean;
  isActive: boolean;
  units: {
    id: string;
    unitId: string | null;
    unitName: string;
    conversionFactor: number;
    price: number;
    isDefault: boolean;
    isActive: boolean;
    availableQuantity: number;
  }[];
}