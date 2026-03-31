import { api } from "@/api/axios";
import type { UserProfile } from "@/types/user";

export const userService = {
  getProfile: (userId: string) => api.get<UserProfile>(`/users/${userId}`),
};