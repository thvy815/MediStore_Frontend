export interface Unit {
  id: string;
  name: string;
  description?: string | null;
}

export interface UnitCreateRequest {
  name: string;
  description?: string;
}
