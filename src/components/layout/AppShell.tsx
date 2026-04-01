import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Home, BookOpen, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import bankMiamiLogo from "@/assets/bankmiami-logo.png";
import smAdvisorsLogo from "@/assets/sm-advisors-logo-new.webp";

interface AppShellProps {
  children: ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  const { user, profile, isTrainer, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const navItems = [
    { path: "/", label: "Overview", icon: Home },
    { path: "/curriculum", label: "Curriculum", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-muted text-foreground">
        <div className="container flex h-14 md:h-16 items-center justify-between px-4">
          {/* Logos and App Name */}
          <div className="flex items-center gap-3">
            <img
              src={bankMiamiLogo}
              alt="BankMiami Logo"
              className="h-8 md:h-10 w-auto object-contain rounded"
            />
            <span className="text-muted-foreground mx-2">|</span>
            <img
              src={smAdvisorsLogo}
              alt="SM Advisors"
              className="hidden sm:block h-6 md:h-8 w-auto object-contain"
            />
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-2">
            {isTrainer && (
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Trainer
              </Badge>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-accent/50"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">
                      {profile?.full_name || user?.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {profile?.role === 'trainer' ? 'Trainer' : 'Client'} • {profile?.org_name}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isTrainer && (
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center justify-center gap-1 px-4 pb-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-accent/50"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AppShell;
