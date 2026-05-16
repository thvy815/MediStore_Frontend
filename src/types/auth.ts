export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phone: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// response
export interface UserInfo {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
  isVerified: boolean;
  isActive: boolean;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
}
