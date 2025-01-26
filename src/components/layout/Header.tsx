import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export default function Header() {
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
          <Button variant="ghost" size="sm">
            Sign up
          </Button>
          <Button size="sm">
            <LogIn className="h-4 w-4 mr-2" />
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}
