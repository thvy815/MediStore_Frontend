import { api } from "@/api/axios";
import type { Supplier } from "@/types/supplier";

export const supplierService = {
  // GET /api/suppliers
  getAll: () => api.get<Supplier[]>("/suppliers"),

  // GET /api/suppliers/{id}
  getById: (id: string) =>
    api.get<Supplier>(`/suppliers/${id}`),

  // POST /api/suppliers
  create: (data: Omit<Supplier, "id">) =>
    api.post<Supplier>("/suppliers", data),

  // PUT /api/suppliers/{id}
  update: (id: string, data: Omit<Supplier, "id">) =>
    api.put<Supplier>(`/suppliers/${id}`, data),

  // DELETE /api/suppliers/{id}
  delete: (id: string) =>
    api.delete<void>(`/suppliers/${id}`),
};
