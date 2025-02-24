
import React, { createContext, useContext, useEffect, useState } from "react";
import { User, AuthError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, captchaToken: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("Checking session...");
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Session check result:", session ? "Session found" : "No session");
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session ? "Session exists" : "No session");
      setUser(session?.user ?? null);
      setLoading(false);

      // Only redirect if we're on a protected route and there's no session
      if (!session && location.pathname.startsWith('/dashboard')) {
        navigate('/auth/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.pathname]);

  const handleAuthError = (error: AuthError) => {
    console.error('Auth error details:', {
      message: error.message,
      status: error.status,
      name: error.name
    });
    
    switch (true) {
      case error.message.includes('Email not confirmed'):
        toast.error('Please verify your email before logging in.');
        break;
      case error.message.includes('Invalid login credentials'):
        toast.error('Email or password is incorrect.');
        break;
      case error.message.includes('Rate limit'):
        toast.error('Too many attempts. Please try again later.');
        break;
      case error.message.includes('User not found'):
        toast.error('No account found with this email.');
        break;
      default:
        toast.error(`Authentication error: ${error.message}`);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in with email:", email);
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error);
        handleAuthError(error);
        return;
      }

      if (data?.user) {
        console.log("Sign in successful:", data.user.email);
        toast.success('Welcome back!');
        navigate('/');
      }
    } catch (error) {
      console.error('Unexpected login error:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const signUp = async (email: string, password: string, captchaToken: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/login`,
          data: {
            email,
          }
        }
      });

      if (error) {
        console.error("Sign up error:", error);
        handleAuthError(error);
        return;
      }

      toast.success('Please check your email to confirm your account!');
      navigate('/auth/login');
    } catch (error) {
      console.error('Unexpected signup error:', error);
      toast.error('An unexpected error occurred during signup');
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign out error:", error);
        handleAuthError(error);
        return;
      }
      
      toast.success('Successfully signed out!');
      navigate('/auth/login');
    } catch (error) {
      console.error('Unexpected signout error:', error);
      toast.error('An unexpected error occurred during sign out');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
