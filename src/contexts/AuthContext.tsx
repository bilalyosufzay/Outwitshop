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
    console.log("Checking session...");
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Session check result:", session ? "Session found" : "No session");
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user && location.pathname.startsWith('/auth/')) {
        navigate('/');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session ? "Session exists" : "No session");
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user && location.pathname.startsWith('/auth/')) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location]);

  const handleAuthError = (error: AuthError) => {
    console.error('Auth error details:', {
      message: error.message,
      status: error.status,
      name: error.name
    });
    
    switch (true) {
      case error.message.includes('Email not confirmed'):
        toast.error('Please verify your email before logging in. Check your inbox for the verification link.');
        break;
      case error.message.includes('Invalid login credentials'):
        toast.error('Email or password is incorrect. Please try again.');
        break;
      case error.message.includes('Rate limit'):
        toast.error('Too many attempts. Please try again in a few minutes.');
        break;
      case error.message.includes('User not found'):
        toast.error('No account found with this email. Please sign up first.');
        break;
      default:
        toast.error(`Authentication error: ${error.message}`);
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log("Attempting to sign in with email:", email);
    try {
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
      } else {
        console.error("No user data returned after successful sign in");
        toast.error('Unable to complete sign in. Please try again.');
      }
    } catch (error) {
      console.error('Unexpected login error:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const signUp = async (email: string, password: string, captchaToken: string) => {
    console.log("Attempting to sign up with email:", email);
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

      console.log("Sign up successful, verification email sent");
      toast.success('Please check your email to confirm your account!');
      navigate('/auth/login');
    } catch (error) {
      console.error('Unexpected signup error:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred during signup');
      }
    }
  };

  const signOut = async () => {
    console.log("Attempting to sign out");
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign out error:", error);
        handleAuthError(error);
        return;
      }
      
      console.log("Sign out successful");
      toast.success('Successfully signed out!');
      navigate('/auth/login');
    } catch (error) {
      console.error('Unexpected signout error:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred during sign out');
      }
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
