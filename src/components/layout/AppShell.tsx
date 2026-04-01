import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Home, Shield, Bell } from "lucide-react";
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
    navigate("/");
  };

  const isAdminRoute = location.pathname === "/admin";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container flex h-14 md:h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link to="/program" className="flex items-center">
            <img
              src={smAdvisorsLogo}
              alt="SM Advisors"
              className="h-7 md:h-9 w-auto object-contain"
            />
          </Link>

          {/* Nav + Actions */}
          <div className="flex items-center gap-2">
            {/* Program link */}
            <Link to="/program">
              <Button
                variant={location.pathname.startsWith("/program") || location.pathname.startsWith("/session") ? "default" : "ghost"}
                size="sm"
                className={`gap-2 ${
                  location.pathname.startsWith("/program") || location.pathname.startsWith("/session")
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "text-slate-600"
                }`}
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Program</span>
              </Button>
            </Link>

            {/* Admin Panel toggle */}
            {isTrainer && (
              <Link to={isAdminRoute ? "/program" : "/admin"}>
                <Button
                  variant={isAdminRoute ? "default" : "outline"}
                  size="sm"
                  className={`gap-2 ${
                    isAdminRoute
                      ? "bg-slate-800 hover:bg-slate-900 text-white"
                      : "border-slate-300 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">{isAdminRoute ? "Exit Admin" : "Admin Panel"}</span>
                </Button>
              </Link>
            )}

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-600 hover:bg-slate-100">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {profile?.full_name || user?.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AppShell;
