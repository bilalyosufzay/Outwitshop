
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, Mail, Lock, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'fa', name: 'فارسی' }
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn } = useAuth();
  const { t, i18n } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('preferred-language', lng);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-accent/10 to-background p-4 relative">
      <div className="absolute top-4 left-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-10 h-10">
              <Languages className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {LANGUAGES.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className="cursor-pointer"
              >
                {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-6 text-center">
          <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
            <LogIn className="w-8 h-8 text-accent" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("auth.welcome_back")}
            </CardTitle>
            <p className="text-muted-foreground">
              {t("auth.please_sign_in")}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-2.5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder={t("auth.email_address")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-2.5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder={t("auth.password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("auth.remember_me")}
                </label>
              </div>
              <Link
                to="/auth/forgot-password"
                className="text-sm font-medium text-accent hover:text-accent/80"
              >
                {t("auth.forgot_password")}
              </Link>
            </div>

            <Button type="submit" size="lg" className="w-full gap-2 h-12">
              <LogIn className="w-5 h-5" />
              {t("auth.sign_in_button")}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {t("auth.dont_have_account")}{" "}
              <Link to="/auth/signup" className="font-medium text-accent hover:text-accent/80">
                {t("auth.sign_up")}
              </Link>
            </p>
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground block"
            >
              {t("navigation.home")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
