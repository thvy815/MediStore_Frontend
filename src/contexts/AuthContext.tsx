import { createContext, useContext, useEffect, useState } from "react";

import { authService } from "@/services/authService";

import type { LoginRequest, UserInfo } from "@/types/auth";

interface AuthContextType {
  user: UserInfo | null;

  login: (
    data: LoginRequest,
    remember: boolean
  ) => Promise<UserInfo>;

  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const savedUser =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (data: LoginRequest, remember: boolean) => {
    const res = await authService.login(data);

    const storage = remember
      ? localStorage
      : sessionStorage;

    storage.setItem(
      "accessToken",
      res.data.accessToken
    );

    storage.setItem(
      "refreshToken",
      res.data.refreshToken
    );

    storage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    setUser(res.data.user);

    return res.data.user;
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);