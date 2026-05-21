import { api } from "@/api/axios";
import type { LoginRequest, RegisterRequest, AuthResponse, ForgotPasswordRequest, ResetPasswordRequest } from "@/types/auth";

export const authService = {
  register: (data: RegisterRequest) =>
    api.post<string>("/auth/register", data),

  login: (data: LoginRequest) =>
    api.post<AuthResponse>("/auth/login", data),

  forgotPassword: (data: ForgotPasswordRequest) =>
    api.post<string>("/auth/forgot-password", data),

  resetPassword: (data: ResetPasswordRequest) =>
    api.post<string>("/auth/reset-password", data),

  refreshToken: (refreshToken: string) =>
    api.post<AuthResponse>(
      `/auth/refresh?refreshToken=${refreshToken}`
    ),
};
