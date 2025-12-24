import { api } from "@/api/axios";
import type { LoginRequest, RegisterRequest, AuthResponse } from "@/types/auth";

export const authService = {
  register: (data: RegisterRequest) =>
    api.post<string>("/auth/register", data),

  login: (data: LoginRequest) =>
    api.post<AuthResponse>("/auth/login", data),
};
