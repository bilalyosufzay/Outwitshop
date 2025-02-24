
import { createContext, useContext, useEffect, useState } from "react";
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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user && location.pathname.startsWith('/auth/')) {
        navigate('/');
      }
    });

    // Listen for changes on auth state (signed in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user && location.pathname.startsWith('/auth/')) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location]);

  const handleAuthError = (error: AuthError) => {
    console.error('Auth error:', error);
    
    // Handle specific error cases
    switch (true) {
      case error.message.includes('Email not confirmed'):
        toast.error('Please verify your email before logging in');
        break;
      case error.message.includes('Invalid login credentials'):
        toast.error('Invalid email or password');
        break;
      case error.message.includes('Rate limit'):
        toast.error('Too many attempts. Please try again later');
        break;
      default:
        toast.error(error.message);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        handleAuthError(error);
        return;
      }

      if (data?.user) {
        toast.success('Welcome back!');
        navigate('/');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      console.error('Login error:', error);
    }
  };

  const signUp = async (email: string, password: string, captchaToken: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          captchaToken,
          emailRedirectTo: `${window.location.origin}/auth/login`,
          data: {
            email,
          }
        }
      });

      if (error) {
        handleAuthError(error);
        return;
      }

      toast.success('Please check your email to confirm your account!');
      navigate('/auth/login');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      console.error('Signup error:', error);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        handleAuthError(error);
        return;
      }
      
      toast.success('Successfully signed out!');
      navigate('/auth/login');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      console.error('Signout error:', error);
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
