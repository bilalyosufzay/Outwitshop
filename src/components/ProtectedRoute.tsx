<<<<<<< HEAD

import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
=======
﻿import React from "react";
import { Navigate } from "react-router-dom";
interface ProtectedRouteProps {
  children: JSX.Element;
}
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Placeholder authentication logic; adjust as needed.
  const isAuthenticated = true;
  return isAuthenticated ? children : <Navigate to="/auth/login" />;
}
>>>>>>> 38fd4b7 (Add placeholder Toaster component and update project files)
