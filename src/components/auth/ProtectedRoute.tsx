// src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { getUser } from "../../services/authService";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      const user = await getUser();
      setIsAuthenticated(!!user);
    };
    checkUser();
  }, []);

  if (isAuthenticated === null) return null; // Or add a loading spinner

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/signup" replace state={{ from: location }} />
  );
}
