// src/services/storageService.ts
import { api as axios } from "@/api/axios";
import type { StorageResponse } from "@/types/storage";

export const storageService = {
  // GET ALL
  getAll: () => axios.get<StorageResponse[]>("/api/storage"),

  // SEARCH
  search: (keyword: string) =>
    axios.get<StorageResponse[]>(`/api/storage/search`, {
      params: { keyword },
    }),

  // CREATE
  create: (data: Partial<StorageResponse>) =>
    axios.post("/api/storage", data),

  // UPDATE
  update: (id: string, data: Partial<StorageResponse>) =>
    axios.put(`/api/storage/${id}`, data),

  // DELETE
  delete: (id: string) =>
    axios.delete(`/api/storage/${id}`),
};
