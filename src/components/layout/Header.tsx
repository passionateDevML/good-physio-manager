
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bell, Search, UserCircle, LogOut, Settings, X, Check } from 'lucide-react';
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
import { isAuthenticated, getCurrentUser, logout, isAdmin } from '@/utils/auth';

interface HeaderProps {
  className?: string;
}

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export function Header({ className }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();
  const authenticated = isAuthenticated();
  const admin = isAdmin();
  
  // Mock notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Nouveau rendez-vous',
      description: 'Sophie Martin a pris rendez-vous pour le 15 juillet',
      time: '1h',
      read: false
    },
    {
      id: '2',
      title: 'Rappel de rendez-vous',
      description: 'Rendez-vous avec Thomas Dubois demain à 14h',
      time: '3h',
      read: false
    },
    {
      id: '3',
      title: 'Annulation de rendez-vous',
      description: 'Emma Petit a annulé son rendez-vous du 20 juillet',
      time: '5h',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-physio-500 rounded-full"></span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 animate-zoom-in">
                <div className="flex items-center justify-between p-2">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs" 
                      onClick={markAllAsRead}
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Tout marquer comme lu
                    </Button>
                  )}
                </div>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-muted-foreground">
                    <p>Aucune notification</p>
                  </div>
                ) : (
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={cn(
                          "px-3 py-2 hover:bg-muted transition-colors flex items-start gap-2", 
                          !notification.read ? "bg-muted/50" : ""
                        )}
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">{notification.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">Il y a {notification.time}</p>
                        </div>
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={() => markAsRead(notification.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="justify-center text-center text-xs text-muted-foreground"
                  onClick={() => navigate('/settings')}
                >
                  Gérer les notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
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
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                {admin && (
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
