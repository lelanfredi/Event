import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode } from "react";
import AuthDialog from "./AuthDialog";

type AuthGuardProps = {
  children: ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <AuthDialog
        open={true}
        onOpenChange={() => {}}
        onComplete={() => loginWithRedirect()}
      />
    );
  }

  return <>{children}</>;
}
