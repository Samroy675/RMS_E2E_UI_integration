import React, { createContext, useContext, useState, useEffect } from "react";
import * as jwt_decode from "jwt-decode";
import type { User } from "../data";
import * as usersApi from "../services/api/users";

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
        const decoded: any = (jwt_decode as any)(token);
        const mapped: any = {
          user_id: decoded.sub || decoded.userId || decoded.UserId,
          email: decoded.email || decoded.Email,
          role: decoded.role || decoded.Role,
          first_name: decoded.first_name || decoded.given_name || "",
          last_name: decoded.last_name || decoded.family_name || "",
          session_token: token,
        };
        setUser(mapped as User);
        setIsAuthenticated(true);
      } catch (err) {
        console.warn("Invalid token during init", err);
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

  const login = async (email: string, password: string) => {
    try {
      const res = await usersApi.loginUser(email, password);
      if (res.token) {
        localStorage.setItem("rms_token", res.token);
      }
      if (res.user) {
        setUser(res.user);
        setIsAuthenticated(true);
        return true;
      }
      if (res.token) {
        try {
          const decoded: any = (jwt_decode as any)(res.token);
          const mapped: any = {
            user_id: decoded.sub || decoded.userId || decoded.UserId,
            email: decoded.email || decoded.Email,
            role: decoded.role || decoded.Role,
            first_name: decoded.first_name || decoded.given_name || "",
            last_name: decoded.last_name || decoded.family_name || "",
            session_token: res.token,
          };
          setUser(mapped as User);
          setIsAuthenticated(true);
          return true;
        } catch (e) {
          return true;
        }
      }
      return false;
    } catch (err: any) {
      console.error("Login error", err);
      return false;
    }
  };

  const signup = async (userData: Partial<User>) => {
    try {
      const created = await usersApi.createUser(userData);
      if ((created as any).token) {
        localStorage.setItem("rms_token", (created as any).token);
      } else if ((created as any).session_token) {
        localStorage.setItem("rms_token", (created as any).session_token);
      }
      setUser(created as User);
      setIsAuthenticated(true);
      return true;
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

  return <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>{children}</AuthContext.Provider>;
};
