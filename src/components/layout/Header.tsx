import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { UserMenu } from "@/components/ui/user-menu";

import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-6">
          <a href="/" className="text-xl font-bold text-primary">
            EventHub
          </a>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              About
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <Button size="sm" onClick={() => loginWithRedirect()}>
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          ) : (
            <UserMenu
              user={{
                name: user?.name,
                email: user?.email,
                picture: user?.picture,
              }}
              onLogout={() =>
                logout({
                  logoutParams: {
                    returnTo: window.location.origin,
                  },
                })
              }
            />
          )}
        </div>
      </div>
    </header>
  );
}
