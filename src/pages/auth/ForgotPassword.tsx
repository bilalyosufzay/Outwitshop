
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Puzzle, Mail, ArrowLeft } from "lucide-react";

const SITE_URL = "https://ad14e263-92fc-413c-a4ca-e1ae31f9b10f.lovableproject.com";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      console.log("Sending reset password email with redirect to:", `${SITE_URL}/auth/reset-password`);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${SITE_URL}/auth/reset-password`,
      });

      if (error) {
        console.error("Reset password error:", error);
        throw error;
      }
      
      setSubmitted(true);
      toast.success("Password reset instructions have been sent to your email");
      console.log("Password reset email sent successfully");
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("Failed to send reset instructions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      
      <Card className="w-full max-w-md relative border-0 shadow-xl bg-white/80 backdrop-blur">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto bg-primary/5 p-3 rounded-full">
            <Puzzle className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Reset Your Password
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {submitted 
              ? "Check your email for reset instructions"
              : "Enter your email to receive reset instructions"}
          </p>
        </CardHeader>
        <CardContent>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                disabled={loading}
              >
                {loading ? "Sending Instructions..." : "Send Reset Instructions"}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                If an account exists with this email, you'll receive password reset instructions shortly.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                variant="outline"
                className="w-full"
              >
                Try another email
              </Button>
            </div>
          )}
          
          <div className="mt-6">
            <Link 
              to="/auth/login"
              className="inline-flex items-center text-sm text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
