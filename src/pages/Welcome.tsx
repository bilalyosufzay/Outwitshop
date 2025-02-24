
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Welcome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const checkUserAndRedirect = () => {
      if (user) {
        toast.success("Welcome back! You've been successfully signed in.");
        navigate("/");
      } else {
        toast.error("Unable to verify your login. Please try again.");
        navigate("/auth/login");
      }
    };

    // Small delay to ensure auth state is properly initialized
    const timer = setTimeout(checkUserAndRedirect, 1000);
    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Verifying your login...</p>
      </div>
    </div>
  );
};

export default Welcome;
