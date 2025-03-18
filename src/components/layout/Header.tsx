
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Search, UserCircle, LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { isAuthenticated, getCurrentUser, logout } from '@/utils/auth';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const authenticated = isAuthenticated();

  return (
    <header className={cn('w-full px-6 py-3 bg-white/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-10 flex items-center justify-between', className)}>
      <div className="flex items-center">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-physio-400 to-physio-600 flex items-center justify-center text-white font-bold">
            GP
          </div>
          <span className="text-lg font-semibold text-foreground">Good Physio</span>
        </Link>
      </div>

      <div className="flex-1 max-w-lg mx-auto hidden sm:block">
        {authenticated && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Rechercher un patient, un rendez-vous..."
              className="w-full py-2 pl-10 pr-4 rounded-full bg-secondary/50 border-0 focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {authenticated ? (
          <>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-physio-500 rounded-full"></span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 flex items-center gap-2 px-2">
                  <UserCircle className="h-6 w-6" />
                  <span className="text-sm font-medium hidden md:inline-block">
                    {user?.name || 'Utilisateur'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 animate-zoom-in">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                {user?.role === 'admin' && (
                  <DropdownMenuItem onClick={() => navigate('/admin')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Admin</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button 
            className="bg-physio-500 hover:bg-physio-600"
            onClick={() => navigate('/login')}
          >
            Se connecter
          </Button>
        )}
      </div>
    </header>
  );
}
