import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import type { User } from "../data";
import * as usersApi from "../services/api/users";

interface DecodedToken {
  sub?: string;
  userId?: number;
  email?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  exp?: string;
}

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
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem("rms_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!localStorage.getItem("rms_token"));

  useEffect(() => {
  const token = localStorage.getItem("rms_token");
  if (token && !user) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const mapped: User = {
        UserId: Number(decoded.userId || decoded.sub),
        Email: decoded.email || "",
        Role: decoded.role || "",
        FirstName: decoded.firstName || "",
        LastName: decoded.lastName || "",
        session_token: token,
      };
      setUser(mapped);
      setIsAuthenticated(true);
    } catch (err) {
      localStorage.removeItem("rms_token");
      localStorage.removeItem("rms_user");
      setUser(null);
      setIsAuthenticated(false);
    }
  }
}, []);

  useEffect(() => {
    if (user) localStorage.setItem("rms_user", JSON.stringify(user));
    else localStorage.removeItem("rms_user");
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await usersApi.loginUser(email, password);
      if (res.token) {
        localStorage.setItem("rms_token", res.token);
        const mapped: User = {
          UserId: res.userId,
          Email: res.email,
          Role: res.role,
          FirstName: "", // optional
          LastName: "",
          session_token: res.token,
        };
        setUser(mapped);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (err: any) {
      console.error("Login error", err);
      return false;
    }
  };

  const signup = async (userData: Partial<User>): Promise<boolean> => {
    try {
      const res = await usersApi.createUser(userData);
      if (res.token) {
        localStorage.setItem("rms_token", res.token);
        const mapped: User = {
          UserId: res.userId,
          Email: res.email,
          Role: res.role,
          FirstName: userData.FirstName || "",
          LastName: userData.LastName || "",
          session_token: res.token,
        };
        setUser(mapped);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (err: any) {
      console.error("Signup error", err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("rms_token");
    localStorage.removeItem("rms_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};