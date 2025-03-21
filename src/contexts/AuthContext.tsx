import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (password: string, token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log("Logging in with:", email, password);
      const mockUser = { id: "123", email };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      console.log("Signing up with:", email, password, name);
      const mockUser = { id: "123", email, name };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      console.log("Reset password for:", email);
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (password: string, token: string) => {
    try {
      setLoading(true);
      console.log("Setting new password with token:", token, "Password length:", password.length);
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    loading,
    forgotPassword,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
