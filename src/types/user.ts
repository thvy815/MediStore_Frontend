export interface UserRole {
  id: string;
  name: string;
}

export interface UserProfile {
  id: string;
  role: UserRole;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  birthDate: string | null;
  gender: string | null;
  address: string | null;
  createdAt: string;
  updatedAt: string;
  resetPasswordToken: string | null;
  resetPasswordTokenExpiry: string | null;
}