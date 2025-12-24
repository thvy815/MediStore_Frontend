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
  roleId: string;
  roleName: string;
}

export interface AuthResponse {
  token: string;
  user: UserInfo;
}
