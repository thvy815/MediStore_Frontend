export interface ProductUnitRequest {
  unitId: string;  
  conversionFactor: number | "";
  price: number | "";
  isDefault: boolean;
}

export interface ProductRequest {
  code: string;
  name: string;
  brandId: string;
  categoryId: string;
  description: string;
  ingredients: string;
  imageUrl: string;
  prescriptionRequired: boolean;
  isActive: boolean;
  units: ProductUnitRequest[];
}

export interface ProductUnitResponse {
  id: string;
  unitName: string;
  conversionFactor: number;
  price: number;
  isDefault: boolean;
}

export interface ProductResponse {
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
  units: ProductUnitResponse[];
}
