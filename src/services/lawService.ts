import { api } from "@/api/axios";
import type { Law } from "@/types/law";

export const lawService = {
  getAll: () => api.get<Law[]>("/laws"),
};
