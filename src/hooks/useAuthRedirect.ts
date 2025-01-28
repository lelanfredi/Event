import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useNavigate } from "react-router-dom";
import { authConfig } from "@/lib/auth-config";

export function useAuthRedirect() {
  const { isAuthenticated, isLoading } = useAuth0();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    const isProtectedRoute = authConfig.protectedRoutes.some((route) =>
      pathname.startsWith(route),
    );
    const isPublicOnlyRoute = authConfig.publicOnlyRoutes.some((route) =>
      pathname.startsWith(route),
    );

    if (isAuthenticated && isPublicOnlyRoute) {
      navigate(authConfig.defaultProtectedRoute);
    } else if (!isAuthenticated && isProtectedRoute) {
      navigate(authConfig.defaultPublicRoute);
    }
  }, [isAuthenticated, isLoading, pathname, navigate]);
}
