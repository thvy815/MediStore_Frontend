import { api } from "@/api/axios";
import type { Unit, UnitCreateRequest } from "@/types/unit";

export const unitService = {
  getAll: () => api.get<Unit[]>("/units"),

  getById: (id: string) => api.get<Unit>(`/units/${id}`),

  create: (data: UnitCreateRequest) =>
    api.post<Unit>("/units", data),

  update: (id: string, data: UnitCreateRequest) =>
    api.put<Unit>(`/units/${id}`, data),

  delete: (id: string) =>
    api.delete(`/units/${id}`),
};
