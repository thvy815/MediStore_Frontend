export interface Brand {
  id: string;
  name: string;
  country?: string | null;
  description?: string | null;
}

export interface BrandCreateRequest {
  name: string;
  country?: string;
  description?: string;
}

export interface BrandView {
  id: string;
  name: string;
  country?: string;
  description?: string;
  products?: unknown[];
}
