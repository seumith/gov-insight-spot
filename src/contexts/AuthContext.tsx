import { createContext, useContext, useEffect, useState } from "react";

export type User = {
  email: string;
  role: "guest" | "admin";
};

type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const AUTH_KEY = "gov-auth-user";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (user) localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      else localStorage.removeItem(AUTH_KEY);
    } catch {}
  }, [user]);

  const login = async (email: string, password: string) => {
    // Simple demo logic: admin credentials
    // admin@example.com / admin123 => admin role
    // anything else => guest role
    if (email === "admin@example.com" && password === "admin123") {
      setUser({ email, role: "admin" });
      return true;
    }
    setUser({ email, role: "guest" });
    return true;
  };

  const logout = () => setUser(null);

  const value: AuthContextValue = {
    user,
    login,
    logout,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
