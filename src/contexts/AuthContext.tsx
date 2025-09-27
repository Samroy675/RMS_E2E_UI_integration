import React, { createContext, useContext, useState, useEffect } from "react";
import * as jwt_decode from "jwt-decode";
import type { User } from "../data";
import { loginUser, createUser } from "../services/api/users";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Partial<User>) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("rms_token");
    if (token) {
      try {
        const decoded = (jwt_decode as any)(token);
        setUser({
          user_id: decoded.sub,
          role: decoded.role,
          email: decoded.email,
          first_name: decoded.firstName,
          last_name: decoded.lastName,
          password: "",
          phone: "",
          session_token: token,
          last_login: "",
          created_at: "",
          updated_at: "",
          is_active: true,
        });
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Invalid token, logging out", err);
        localStorage.removeItem("rms_token");
        setUser(null);
        setIsAuthenticated(false);
      }
    }
  }, []);
  
  

  const login = async (email: string, password: string) => {
    try {
      const res = await loginUser(email, password);
      if (res.token) {
        localStorage.setItem("rms_token", res.token);
      }
      if (res.user) {
        setUser(res.user);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Login failed", err);
      return false;
    }
  };

  const signup = async (userData: Partial<User>) => {
    try {
      const created = await createUser(userData);
      if ((created as any).session_token) {
        localStorage.setItem("rms_token", (created as any).session_token);
      }
      setUser(created);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error("Signup failed", err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("rms_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
