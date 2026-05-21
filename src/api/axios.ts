import { authService } from "@/services/authService";
import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// INTERCEPTOR
api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken =
          localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");

        if (!refreshToken) {
          return Promise.reject(error);
        }

        const res = await authService.refreshToken(refreshToken);

        localStorage.setItem(
          "accessToken",
          res.data.accessToken
        );

        localStorage.setItem(
          "refreshToken",
          res.data.refreshToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${res.data.accessToken}`;

        return api(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.href = "/customer/home";
      }
    }

    return Promise.reject(error);
  }
);