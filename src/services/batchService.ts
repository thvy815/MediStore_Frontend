import { api } from "@/api/axios";
import type { CreateBatchRequest, BatchResponse, UpdateBatchRequest } from "@/types/batch";

export const batchService = {
  create: (data: CreateBatchRequest) => api.post<void>("/batches", data),
  update: (id: string, data: UpdateBatchRequest) =>
    api.put(`/batches/${id}`, data),
  recall: (id: string) => api.delete(`/batches/${id}`),
  getAll: (productId?: string, status?: string) =>
    api.get<BatchResponse[]>("/batches", { params: { productId, status } }),
  getById: (id: string) => api.get<BatchResponse>(`/batches/${id}`),
};
